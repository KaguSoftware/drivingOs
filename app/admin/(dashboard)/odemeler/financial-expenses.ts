// Combines all expense sources (damage repairs, periodic maintenance,
// instructor wages, ad-hoc expenses) into one monthly series.
//
// Known simplification: instructor monthly_wage has no hire/end date, so
// every currently-active instructor's wage is counted in every month of the
// window, regardless of when they actually joined.

import type { Instructor } from "../egitmenler/instructor.model";
import type { VehicleDamageRecord } from "../araclar/vehicle-damage-record.model";
import type { VehiclePeriodicCheck } from "../araclar/bakim/vehicle-periodic-check.model";
import type { Expense } from "./expense.model";
import { addToMonth, emptyMonthMap } from "./financial-summary";

export function buildExpenseSeries(
  {
    damageRecords,
    maintenanceChecks,
    instructors,
    expenses,
  }: {
    damageRecords: VehicleDamageRecord[];
    maintenanceChecks: VehiclePeriodicCheck[];
    instructors: Instructor[];
    expenses: Expense[];
  },
  monthKeys: string[]
): Record<string, number> {
  const series = emptyMonthMap(monthKeys);

  for (const record of damageRecords) {
    addToMonth(series, record.createdAt(), record.cost ?? 0);
  }

  for (const check of maintenanceChecks) {
    addToMonth(series, check.dueDate(), check.cost ?? 0);
  }

  const totalMonthlyWage = instructors.reduce((sum, instructor) => sum + instructor.monthlyWage, 0);
  for (const key of monthKeys) {
    series[key] += totalMonthlyWage;
  }

  for (const expense of expenses) {
    addToMonth(series, expense.expenseDate(), expense.cost);
  }

  return series;
}
