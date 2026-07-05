import { recordPayment } from "../actions";

export function RecordPaymentForm({ installmentId }: { installmentId: string }) {
  return (
    <form action={recordPayment} className="flex items-center gap-2">
      <input type="hidden" name="installment_id" value={installmentId} />
      <input
        name="amount_paid"
        type="number"
        step="0.01"
        required
        className="w-24 rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-800 px-3 py-1 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-300"
      >
        Pay
      </button>
    </form>
  );
}
