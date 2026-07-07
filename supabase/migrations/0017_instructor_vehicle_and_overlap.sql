-- Each instructor teaches with one primary vehicle. DB-level no-overlap
-- constraints replace the racy app-side concurrency check in
-- LessonRepository (see 0005 comment).

alter table instructors
  add column assigned_vehicle_id uuid references vehicles(id) on delete set null;

create extension if not exists btree_gist;

-- Preflight before applying: find overlapping lessons that would violate
-- these constraints and clean them up first:
--   select a.id, b.id from lessons a join lessons b
--     on a.id < b.id
--    and (a.instructor_id = b.instructor_id or a.vehicle_id = b.vehicle_id)
--    and tstzrange(a.starts_at, a.ends_at) && tstzrange(b.starts_at, b.ends_at);

alter table lessons add constraint lessons_no_instructor_overlap
  exclude using gist (instructor_id with =, tstzrange(starts_at, ends_at) with &&);

alter table lessons add constraint lessons_no_vehicle_overlap
  exclude using gist (vehicle_id with =, tstzrange(starts_at, ends_at) with &&);
