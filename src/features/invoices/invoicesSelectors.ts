import type { RootState } from "../../store/store";

export const selectInvoices = (state: RootState) => state.invoices.invoices;

export const selectInvoiceById = (state: RootState, id: number) =>
    state.invoices.invoices.find(invocie => invocie.id === id) ?? null;