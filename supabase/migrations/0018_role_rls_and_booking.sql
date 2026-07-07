-- Replace the blanket "authenticated full access" policies with role-aware
-- ones, and add security-definer RPCs for student self-service booking.

-- Admin-only tables: swap blanket policy for is_admin().
do $$
declare t text;
begin
  foreach t in array array[
    'students', 'instructors', 'vehicles',
    'vehicle_damage_records', 'vehicle_violations', 'vehicle_periodic_checks',
    'lessons', 'exam_results', 'payment_installments',
    'exam_places', 'exam_sessions', 'exam_enrollments'
  ] loop
    execute format('drop policy if exists "authenticated full access" on %I', t);
    execute format(
      'create policy "admin full access" on %I for all to authenticated using (is_admin()) with check (is_admin())', t
    );
  end loop;
end $$;

-- Teachers: read their own lessons.
create policy "teacher own lessons" on lessons
  for select to authenticated using (instructor_id = current_instructor_id());

-- Students: read their own data.
create policy "student own row" on students
  for select to authenticated using (id = current_student_id());
create policy "student own lessons" on lessons
  for select to authenticated using (student_id = current_student_id());
create policy "student own installments" on payment_installments
  for select to authenticated using (student_id = current_student_id());
create policy "student own enrollments" on exam_enrollments
  for select to authenticated using (student_id = current_student_id());

-- Everyone signed in may read instructors/vehicles/exam places & sessions
-- (needed to render bookings, calendars and exam details; non-sensitive).
create policy "authenticated read" on instructors
  for select to authenticated using (true);
create policy "authenticated read" on vehicles
  for select to authenticated using (true);
create policy "authenticated read" on exam_places
  for select to authenticated using (true);
create policy "authenticated read" on exam_sessions
  for select to authenticated using (true);
