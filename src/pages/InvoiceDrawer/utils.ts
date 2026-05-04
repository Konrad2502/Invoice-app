
 import type { InvoiceItem } from "../../features/appData/appDataTypes";

 type ItemRows = {
  id: string;
  name: string;
  quantity: string;
  price: string;
};
 
 export const makeItemId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

 export const makeInvoiceId = () => Date.now();

 export const getPaymentTermsDays = (value: string) => {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
};

  export const getPaymentTermsLabel = (days: number) => {
  if (days === 1) return "Net 1 Day";
  return `Net ${days} Days`;
};

 export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

 export const formatDateToISO = (date: Date) => {
  return date.toISOString().split("T")[0];
};

 export const makeInvoiceCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const first = letters[Math.floor(Math.random() * letters.length)];
  const second = letters[Math.floor(Math.random() * letters.length)];
  const number = Math.floor(1000 + Math.random() * 9000);

  return `${first}${second}${number}`;
};

 export const mapItems = (rows: ItemRows[]): InvoiceItem[] => {
  return rows.map((row) => {
    const quantity = Number(row.quantity);
    const price = Number(row.price);

    return {
      name: row.name.trim(),
      quantity,
      price,
      total: quantity * price,
    };
  });
};


/* Payload */
