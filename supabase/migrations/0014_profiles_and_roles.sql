-- Roles: profiles table links auth.users to a role and (for teachers/
-- students) their domain record. Helper functions are used by RLS policies.

create type user_role as enum ('admin', 'teacher', 'student');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'admin',
  instructor_id uuid unique references instructors(id) on delete cascade,
  student_id uuid unique references students(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint role_link check (
    (role = 'teacher' and instructor_id is not null and student_id is null) or
    (role = 'student' and student_id is not null and instructor_id is null) or
    (role = 'admin' and instructor_id is null and student_id is null)
  )
);

alter table profiles enable row level security;

create policy "read own profile" on profiles
  for select to authenticated using (id = auth.uid());

-- Stable security-definer helpers so RLS policies can check the caller's
-- role without recursing into profiles' own policies.
create or replace function current_user_role()
returns user_role
language sql stable security definer set search_path = public as
$$ select role from profiles where id = auth.uid() $$;

create or replace function current_instructor_id()
returns uuid
language sql stable security definer set search_path = public as
$$ select instructor_id from profiles where id = auth.uid() $$;

create or replace function current_student_id()
returns uuid
language sql stable security definer set search_path = public as
$$ select student_id from profiles where id = auth.uid() $$;

create or replace function is_admin()
returns boolean
language sql stable security definer set search_path = public as
$$ select coalesce((select role from profiles where id = auth.uid()) = 'admin', false) $$;

-- Admins manage profiles (needed to create teacher/student accounts).
create policy "admin full access" on profiles
  for all to authenticated using (is_admin()) with check (is_admin());

-- Every existing auth user predates roles and is an admin.
insert into profiles (id, role)
select id, 'admin' from auth.users
on conflict (id) do nothing;
