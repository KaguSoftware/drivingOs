-- TEMPORARY: allow the anon role full access until the auth flow exists.
-- TODO(team): drop these policies in the same migration that ships login.

create policy "temp anon full access" on students for all to anon using (true) with check (true);
create policy "temp anon full access" on instructors for all to anon using (true) with check (true);
create policy "temp anon full access" on vehicles for all to anon using (true) with check (true);
