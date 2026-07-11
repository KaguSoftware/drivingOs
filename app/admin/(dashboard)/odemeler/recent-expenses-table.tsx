import { tableWrapperClass, theadClass, tbodyClass, emptyStateClass } from "@/components/ui/table-classes";
import type { Expense } from "./expense.model";

export function RecentExpensesTable({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return <p className={emptyStateClass}>Henüz gider eklenmedi.</p>;
  }

  return (
    <div className={tableWrapperClass}>
      <table className="w-full text-left text-sm">
        <thead className={theadClass}>
          <tr>
            <th className="px-4 py-3 font-medium">Gider</th>
            <th className="px-4 py-3 font-medium">Tutar</th>
            <th className="px-4 py-3 font-medium">Tarih</th>
          </tr>
        </thead>
        <tbody className={tbodyClass}>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-3 font-medium">{expense.name}</td>
              <td className="px-4 py-3">₺{expense.cost.toFixed(2)}</td>
              <td className="px-4 py-3">{expense.expenseDate().toLocaleDateString("tr-TR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
