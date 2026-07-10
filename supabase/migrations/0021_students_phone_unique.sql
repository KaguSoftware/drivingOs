-- Students now log in to the portal with their phone number (resolved
-- server-side to their stored email, see lib/student-login.ts), so phone
-- must uniquely identify a student.
--
-- WARNING: this will fail if duplicate phone numbers already exist in
-- production data. Run a dedup pass (manual ops step, out of scope here)
-- before applying this migration against a database with existing rows.
alter table students add constraint students_phone_key unique (phone);
