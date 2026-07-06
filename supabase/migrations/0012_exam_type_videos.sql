-- Each exam session has a type (theory vs practice), and each exam type
-- has an explainer video (YouTube) shown to students on the public welcome
-- screen. Admin UI to manage exam_type_videos is a follow-up; for now rows
-- are inserted directly.

create type exam_type as enum ('theory', 'practice');

alter table exam_sessions
  add column exam_type exam_type not null default 'practice';

create table exam_type_videos (
  exam_type exam_type primary key,
  youtube_url text not null,
  updated_at timestamptz not null default now()
);

alter table exam_type_videos enable row level security;
create policy "authenticated full access" on exam_type_videos for all to authenticated using (true) with check (true);

-- Recreate lookup_upcoming_exam to also return the session's exam type and
-- its video URL (drop first: return-table shape is changing).
drop function if exists lookup_upcoming_exam(text);

create function lookup_upcoming_exam(p_national_id text)
returns table (
  student_full_name text,
  exam_place_name text,
  exam_place_address text,
  exam_place_notes text,
  starts_at timestamptz,
  ends_at timestamptz,
  exam_type exam_type,
  youtube_url text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    s.full_name,
    ep.name,
    ep.address,
    ep.notes,
    es.starts_at,
    es.ends_at,
    es.exam_type,
    etv.youtube_url
  from students s
  join exam_enrollments ee on ee.student_id = s.id
  join exam_sessions es on es.id = ee.exam_session_id
  join exam_places ep on ep.id = es.exam_place_id
  left join exam_type_videos etv on etv.exam_type = es.exam_type
  where s.national_id = p_national_id
    and es.starts_at > now()
  order by es.starts_at asc;
$$;

revoke all on function lookup_upcoming_exam(text) from public;
grant execute on function lookup_upcoming_exam(text) to anon;
