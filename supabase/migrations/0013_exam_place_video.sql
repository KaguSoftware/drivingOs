-- Move the explainer video from a separate per-exam-type table to a direct
-- attribute of exam_places (simpler: one video per place, managed on the
-- exam place admin form).

alter table exam_places add column youtube_url text;

drop function if exists lookup_upcoming_exam(text);
drop table if exists exam_type_videos;
alter table exam_sessions drop column if exists exam_type;
drop type if exists exam_type;

create function lookup_upcoming_exam(p_national_id text)
returns table (
  student_full_name text,
  exam_place_name text,
  exam_place_address text,
  exam_place_notes text,
  starts_at timestamptz,
  ends_at timestamptz,
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
    ep.youtube_url
  from students s
  join exam_enrollments ee on ee.student_id = s.id
  join exam_sessions es on es.id = ee.exam_session_id
  join exam_places ep on ep.id = es.exam_place_id
  where s.national_id = p_national_id
    and es.starts_at > now()
  order by es.starts_at asc;
$$;

revoke all on function lookup_upcoming_exam(text) from public;
grant execute on function lookup_upcoming_exam(text) to anon;
