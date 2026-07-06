-- Public lookup ("login") condition is just: this TC belongs to a student.
-- Add a security-definer RPC returning the student's name so the welcome
-- screen can greet them even when they have no upcoming exam yet.

create or replace function lookup_student_by_national_id(p_national_id text)
returns table (
  full_name text
)
language sql
security definer
set search_path = public
stable
as $$
  select s.full_name
  from students s
  where s.national_id = p_national_id;
$$;

revoke all on function lookup_student_by_national_id(text) from public;
grant execute on function lookup_student_by_national_id(text) to anon;
