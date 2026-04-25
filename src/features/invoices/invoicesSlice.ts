import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InvoiceData, InvoicesData,} from "../appData/appDataTypes";

type InvoicesState = {
    invoices: InvoicesData
}

const initialState: InvoicesState = {
    invoices: []
}

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setInvoices(state, action: PayloadAction<InvoicesData>) {
            state.invoices = action.payload;
        },
        addInvoice(state, action: PayloadAction<InvoiceData>) {
            state.invoices.unshift(action.payload)
        },
        updateInvoice(state, action: PayloadAction<InvoiceData>) {
            const index = state.invoices.findIndex(
                invoice => invoice.id === action.payload.id
            )
            if(index !== -1) {
                state.invoices[index] = action.payload
            }
        },
        deleteInvocie(state, action: PayloadAction<number>) {
           state.invoices = state.invoices.filter(
            invoice => invoice.id !== action.payload
           )
        },
        markInvoiceAsPaid(state, action: PayloadAction<number>) {
            const invocie = state.invoices.find(
                invoice => invoice.id === action.payload
            )
            if(invocie) {
                invocie.status = 'paid'
            }
        },
        saveInvoiceAsDraft(state, action: PayloadAction<InvoiceData>) {
            state.invoices.unshift({
                ...action.payload,
                status: 'draft',
            })
        },
        clearInvocies(state) {
            state.invoices = []
        }
    }
});

export const {
    setInvoices,
    addInvoice,
    updateInvoice,
    deleteInvocie,
    markInvoiceAsPaid,
    saveInvoiceAsDraft,
    clearInvocies
} = invoicesSlice.actions;

export default invoicesSlice.reducer