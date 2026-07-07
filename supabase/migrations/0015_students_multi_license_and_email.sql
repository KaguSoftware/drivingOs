-- Students can pursue multiple license classes (like instructors already do).
-- Also add email to students and instructors for portal account creation.

alter table students add column license_classes license_class[] not null default '{}';
update students set license_classes = array[license_class];
alter table students drop column license_class;

alter table students add column email text unique;
alter table instructors add column email text unique;

-- lookup_student_by_national_id only returns full_name (no license column),
-- but recreate it here defensively so the public lookup keeps working and
-- future readers see its current definition alongside the schema change.
create or replace function lookup_student_by_national_id(p_national_id text)
returns table (full_name text)
language sql security definer set search_path = public stable as
$$
  select s.full_name from students s where s.national_id = p_national_id;
$$;
