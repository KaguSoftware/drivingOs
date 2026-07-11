-- Recurring monthly wage per instructor, used by the financial dashboard.

alter table instructors add column monthly_wage numeric(10, 2) not null default 0;
