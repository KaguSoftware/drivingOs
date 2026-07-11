import type { ExpenseRow } from "./types";

export class Expense {
  constructor(private readonly row: ExpenseRow) {}

  get id() {
    return this.row.id;
  }

  get name() {
    return this.row.name;
  }

  get cost() {
    return this.row.cost;
  }

  expenseDate(): Date {
    return new Date(this.row.expense_date);
  }
}
