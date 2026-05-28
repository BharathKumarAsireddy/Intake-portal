-- ============================================================
-- IceCap Group / Simple Close Homebuyers
-- Full Database Migration
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";


-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('mlo', 'processor', 'admin');

create type loan_type as enum ('dscr', 'fix_flip', 'bridge');

create type loan_status as enum (
  'draft',
  'submitted',
  'processing',
  'in_underwriting',
  'conditional_approval',
  'clear_to_close',
  'closed_funded',
  'suspended',
  'withdrawn'
);

create type document_status as enum (
  'pending_review',
  'approved',
  'rejected',
  'needs_update'
);

create type document_category as enum (
  'purchase_contract',
  'property_photos',
  'title_commitment',
  'insurance_binder',
  'entity_docs',
  'bank_statements',
  'credit_authorization',
  'lease_agreement',
  'rent_roll',
  'appraisal',
  'scope_of_work',
  'contractor_bid',
  'arv_appraisal',
  'draw_schedule',
  'payoff_statement',
  'exit_strategy_letter'
);

create type condition_status as enum ('open', 'submitted', 'cleared', 'waived');

create type vesting_entity_type as enum ('individual', 'llc', 'trust', 'corp');

create type property_type_enum as enum (
  'sfr',
  'multi_family',
  'condo',
  'commercial',
  'mixed_use',
  'townhouse'
);

create type exit_strategy_type as enum (
  'sell',
  'refi_dscr',
  'refi_conventional',
  'refi_cashout'
);

create type bridge_purpose as enum ('purchase', 'refi_cashout', 'refi_rateterm');

create type activity_type as enum (
  'status_change',
  'document_uploaded',
  'document_reviewed',
  'condition_added',
  'condition_cleared',
  'note_added',
  'loan_created',
  'loan_submitted',
  'processor_assigned'
);


-- ============================================================
-- PROFILES  (extends auth.users — one row per user)
-- ============================================================

create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  full_name     text not null,
  role          user_role not null default 'mlo',
  nmls_id       text,
  phone         text,
  company_name  text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Profiles viewable by authenticated users"
  on profiles for select using (auth.role() = 'authenticated');

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'mlo')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();


-- ============================================================
-- REFERENCE NUMBER  (ICA-YYYY-XXXX)
-- ============================================================

create sequence loan_reference_seq start 1;

create or replace function generate_loan_reference()
returns text language plpgsql as $$
begin
  return 'ICA-' || to_char(now(), 'YYYY') || '-' ||
         lpad(nextval('loan_reference_seq')::text, 4, '0');
end;
$$;


-- ============================================================
-- LOANS  (main file record)
-- ============================================================

create table loans (
  id                      uuid primary key default uuid_generate_v4(),
  reference_number        text not null unique default generate_loan_reference(),
  loan_type               loan_type not null,
  status                  loan_status not null default 'draft',
  loan_amount             bigint not null,          -- cents

  -- Borrower
  borrower_first_name     text not null,
  borrower_last_name      text not null,
  borrower_email          text not null,
  borrower_phone          text,
  entity_name             text,                     -- LLC / trust name
  entity_ein              text,
  entity_type             vesting_entity_type,

  -- Property
  property_address        text not null,
  property_city           text,
  property_state          text,
  property_zip            text,
  property_type           property_type_enum,

  -- People
  mlo_id                  uuid not null references profiles(id),
  assigned_processor_id   uuid references profiles(id),

  -- GHL
  ghl_contact_id          text,
  ghl_opportunity_id      text,

  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

alter table loans enable row level security;

create policy "MLOs view own loans"
  on loans for select using (mlo_id = auth.uid());

create policy "Processors view assigned loans"
  on loans for select using (assigned_processor_id = auth.uid());

create policy "Admins view all loans"
  on loans for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "MLOs insert own loans"
  on loans for insert with check (mlo_id = auth.uid());

create policy "MLOs update own loans"
  on loans for update using (mlo_id = auth.uid());

create policy "Processors update assigned loans"
  on loans for update using (assigned_processor_id = auth.uid());

create policy "Admins update all loans"
  on loans for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create index idx_loans_mlo_id           on loans(mlo_id);
create index idx_loans_status           on loans(status);
create index idx_loans_loan_type        on loans(loan_type);
create index idx_loans_created_at       on loans(created_at desc);
create index idx_loans_processor        on loans(assigned_processor_id);


-- ============================================================
-- DSCR DETAILS
-- ============================================================

create table loan_dscr_details (
  id                uuid primary key default uuid_generate_v4(),
  loan_id           uuid not null unique references loans(id) on delete cascade,
  rental_income     bigint,          -- cents/month
  monthly_debt      bigint,          -- cents/month
  dscr_ratio        numeric(5,2),    -- app calculates: rental_income / monthly_debt
  property_type     property_type_enum,
  lease_in_place    boolean default false,
  vesting_entity    vesting_entity_type,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table loan_dscr_details enable row level security;

create policy "DSCR details follow loan access"
  on loan_dscr_details for all using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );


-- ============================================================
-- FIX & FLIP DETAILS
-- ============================================================

create table loan_fix_flip_details (
  id                uuid primary key default uuid_generate_v4(),
  loan_id           uuid not null unique references loans(id) on delete cascade,
  purchase_price    bigint,          -- cents
  arv_estimate      bigint,          -- cents (After Repair Value)
  rehab_budget      bigint,          -- cents
  ltarv             numeric(5,4),    -- app calculates: loan_amount / arv_estimate
  exit_strategy     exit_strategy_type,
  project_timeline  integer,         -- months
  contractor_name   text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table loan_fix_flip_details enable row level security;

create policy "Fix flip details follow loan access"
  on loan_fix_flip_details for all using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );


-- ============================================================
-- BRIDGE DETAILS
-- ============================================================

create table loan_bridge_details (
  id                    uuid primary key default uuid_generate_v4(),
  loan_id               uuid not null unique references loans(id) on delete cascade,
  purpose               bridge_purpose,
  exit_strategy         text,
  bridge_period         integer,     -- months
  source_of_repayment   text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

alter table loan_bridge_details enable row level security;

create policy "Bridge details follow loan access"
  on loan_bridge_details for all using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );


-- ============================================================
-- DOCUMENTS
-- ============================================================

create table documents (
  id              uuid primary key default uuid_generate_v4(),
  loan_id         uuid not null references loans(id) on delete cascade,
  category        document_category not null,
  file_name       text not null,
  file_url        text not null,
  file_size       bigint,                -- bytes
  uploaded_by     uuid not null references profiles(id),
  status          document_status not null default 'pending_review',
  review_notes    text,
  reviewed_by     uuid references profiles(id),
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table documents enable row level security;

create policy "Documents follow loan access"
  on documents for select using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );

create policy "Authenticated users can upload documents"
  on documents for insert with check (uploaded_by = auth.uid());

create policy "Processors and admins can review documents"
  on documents for update using (
    exists (select 1 from profiles where id = auth.uid() and role in ('processor', 'admin'))
  );

create index idx_documents_loan_id  on documents(loan_id);
create index idx_documents_category on documents(category);
create index idx_documents_status   on documents(status);


-- ============================================================
-- CONDITIONS
-- ============================================================

create table conditions (
  id              uuid primary key default uuid_generate_v4(),
  loan_id         uuid not null references loans(id) on delete cascade,
  title           text not null,
  description     text,
  status          condition_status not null default 'open',
  due_date        date,
  created_by      uuid not null references profiles(id),
  resolved_by     uuid references profiles(id),
  resolved_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table conditions enable row level security;

create policy "Conditions follow loan access"
  on conditions for select using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );

create policy "Processors and admins can add conditions"
  on conditions for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('processor', 'admin'))
  );

create policy "Processors and admins can update conditions"
  on conditions for update using (
    exists (select 1 from profiles where id = auth.uid() and role in ('processor', 'admin'))
  );

create index idx_conditions_loan_id on conditions(loan_id);
create index idx_conditions_status  on conditions(status);


-- ============================================================
-- MILESTONES  (status history log)
-- ============================================================

create table milestones (
  id              uuid primary key default uuid_generate_v4(),
  loan_id         uuid not null references loans(id) on delete cascade,
  status          loan_status not null,
  note            text,
  triggered_by    uuid references profiles(id),
  achieved_at     timestamptz not null default now()
);

alter table milestones enable row level security;

create policy "Milestones follow loan access"
  on milestones for select using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );

create policy "Authenticated users can insert milestones"
  on milestones for insert with check (auth.role() = 'authenticated');

create index idx_milestones_loan_id    on milestones(loan_id);
create index idx_milestones_achieved_at on milestones(achieved_at desc);


-- ============================================================
-- ACTIVITY FEED
-- ============================================================

create table activity (
  id          uuid primary key default uuid_generate_v4(),
  loan_id     uuid not null references loans(id) on delete cascade,
  user_id     uuid references profiles(id),
  type        activity_type not null,
  content     text not null,
  metadata    jsonb,       -- e.g. { old_status, new_status, document_id }
  created_at  timestamptz not null default now()
);

alter table activity enable row level security;

create policy "Activity follows loan access"
  on activity for select using (
    exists (
      select 1 from loans where loans.id = loan_id and (
        loans.mlo_id = auth.uid() or
        loans.assigned_processor_id = auth.uid() or
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
      )
    )
  );

create policy "Authenticated users can insert activity"
  on activity for insert with check (auth.role() = 'authenticated');

create index idx_activity_loan_id   on activity(loan_id);
create index idx_activity_created_at on activity(created_at desc);


-- ============================================================
-- BORROWER INQUIRIES  (public form — no auth required)
-- ============================================================

create table borrower_inquiries (
  id                uuid primary key default uuid_generate_v4(),
  first_name        text not null,
  last_name         text not null,
  email             text not null,
  phone             text,
  loan_type         loan_type,
  loan_amount       bigint,           -- cents
  property_address  text,
  message           text,
  source            text default 'website',
  ghl_contact_id    text,
  created_at        timestamptz not null default now()
);

alter table borrower_inquiries enable row level security;

-- Public can submit; only admins can read
create policy "Anyone can submit an inquiry"
  on borrower_inquiries for insert with check (true);

create policy "Admins can view all inquiries"
  on borrower_inquiries for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create index idx_inquiries_email      on borrower_inquiries(email);
create index idx_inquiries_created_at on borrower_inquiries(created_at desc);


-- ============================================================
-- updated_at TRIGGER  (shared by all mutable tables)
-- ============================================================

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on profiles
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on loans
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on loan_dscr_details
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on loan_fix_flip_details
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on loan_bridge_details
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on documents
  for each row execute procedure update_updated_at();
create trigger set_updated_at before update on conditions
  for each row execute procedure update_updated_at();


-- ============================================================
-- AUTO-LOG MILESTONE + ACTIVITY on status change
-- ============================================================

create or replace function log_loan_status_change()
returns trigger language plpgsql security definer as $$
begin
  if old.status is distinct from new.status then

    insert into milestones (loan_id, status, triggered_by)
    values (new.id, new.status, auth.uid());

    insert into activity (loan_id, user_id, type, content, metadata)
    values (
      new.id,
      auth.uid(),
      'status_change',
      'Status changed to ' || replace(new.status::text, '_', ' '),
      jsonb_build_object('old_status', old.status, 'new_status', new.status)
    );

  end if;
  return new;
end;
$$;

create trigger on_loan_status_change
  after update on loans
  for each row execute procedure log_loan_status_change();


-- ============================================================
-- AUTO-LOG ACTIVITY on document upload
-- ============================================================

create or replace function log_document_upload()
returns trigger language plpgsql security definer as $$
begin
  insert into activity (loan_id, user_id, type, content, metadata)
  values (
    new.loan_id,
    new.uploaded_by,
    'document_uploaded',
    'Document uploaded: ' || new.file_name,
    jsonb_build_object('document_id', new.id, 'category', new.category)
  );
  return new;
end;
$$;

create trigger on_document_upload
  after insert on documents
  for each row execute procedure log_document_upload();
