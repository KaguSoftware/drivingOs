-- Repair/fixing cost for a damaged-vehicle record, used by the financial
-- dashboard. Nullable: historical records predate this column.

alter table vehicle_damage_records add column cost numeric(10, 2);
