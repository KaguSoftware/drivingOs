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
        className="rounded-md bg-zinc-900 px-3 py-1 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Pay
      </button>
    </form>
  );
}
