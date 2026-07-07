import { recordPayment } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";

export function RecordPaymentForm({ installmentId }: { installmentId: string }) {
  return (
    <form action={recordPayment} className="flex items-center gap-2">
      <input type="hidden" name="installment_id" value={installmentId} />
      <input
        name="amount_paid"
        type="number"
        step="0.01"
        required
        className="w-24 rounded-md border border-border bg-surface px-2 py-1 text-sm"
      />
      <SubmitButton className="px-3 py-1">Öde</SubmitButton>
    </form>
  );
}
