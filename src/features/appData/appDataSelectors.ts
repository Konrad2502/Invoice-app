import type { RootState } from "../../store/store";
import type { InvoicesData } from "./appDataTypes";


export const selectAppData = (state:RootState): InvoicesData | null => state.appData.data;

export const selectAppDataStatus = (state: RootState) => state.appData.status;
 
export const selectInvoiceById = (state: RootState, id: number) => state.appData.data?.find(inv => inv.id === id) ?? null;
