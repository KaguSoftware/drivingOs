-- The public "check your exam location by TC Kimlik No" page has been
-- replaced by a real (phone-based) student sign-in at "/". Close off the
-- anon-callable lookup RPCs; the functions stay defined (never drop, only
-- revoke) in case they're needed for a data migration later.

revoke execute on function national_id_exists(text) from anon;
revoke execute on function lookup_upcoming_exam(text) from anon;
revoke execute on function lookup_student_by_national_id(text) from anon;
