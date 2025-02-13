-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Employees table
create table employees (
    id uuid primary key default uuid_generate_v4(),
    first_name text not null,
    last_name text not null,
    email text unique not null,
    phone text,
    department text,
    position text,
    hire_date date,
    status text default 'active',
    manager_id uuid references employees(id),
    salary numeric(10,2),
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Job Positions table
create table job_positions (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    department text not null,
    description text,
    requirements text,
    status text default 'open',
    salary_range text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Job Applications table
create table job_applications (
    id uuid primary key default uuid_generate_v4(),
    position_id uuid references job_positions(id),
    applicant_name text not null,
    email text not null,
    resume_url text,
    status text default 'received',
    application_date timestamp with time zone default timezone('utc'::text, now()),
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Performance Reviews table
create table performance_reviews (
    id uuid primary key default uuid_generate_v4(),
    employee_id uuid references employees(id),
    reviewer_id uuid references employees(id),
    review_period_start date not null,
    review_period_end date not null,
    status text default 'pending',
    overall_rating numeric(3,2),
    comments text,
    goals text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Training Programs table
create table training_programs (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    duration text,
    status text default 'active',
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Employee Training table
create table employee_training (
    id uuid primary key default uuid_generate_v4(),
    employee_id uuid references employees(id),
    program_id uuid references training_programs(id),
    start_date date,
    completion_date date,
    status text default 'in_progress',
    score numeric(5,2),
    certificate_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Documents table
create table documents (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    type text,
    category text,
    file_url text not null,
    file_size integer,
    uploaded_by uuid references employees(id),
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Notifications table
create table notifications (
    id uuid primary key default uuid_generate_v4(),
    type text not null,
    title text not null,
    message text,
    recipient_id uuid references employees(id),
    read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    read_at timestamp with time zone
);

-- Enable Row Level Security (RLS)
alter table employees enable row level security;
alter table job_positions enable row level security;
alter table job_applications enable row level security;
alter table performance_reviews enable row level security;
alter table training_programs enable row level security;
alter table employee_training enable row level security;
alter table documents enable row level security;
alter table notifications enable row level security;

-- Create policies
create policy "Enable read access for authenticated users" on employees
    for select using (auth.role() = 'authenticated');

create policy "Enable read access for authenticated users" on job_positions
    for select using (auth.role() = 'authenticated');

create policy "Enable read access for authenticated users" on notifications
    for select using (auth.uid() = recipient_id::text);

-- Create indexes for better performance
create index idx_employees_department on employees(department);
create index idx_job_positions_status on job_positions(status);
create index idx_notifications_recipient on notifications(recipient_id);
create index idx_documents_category on documents(category);const getEmployeeDetails = async (employeeId) => {
  const { data, error } = await supabase
    .rpc('get_employee_details', { employee_id: employeeId });
  
  if (error) throw error;
  return data;
};