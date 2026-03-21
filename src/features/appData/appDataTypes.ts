export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type InvoiceStatus = "paid" | "pending" | "draft";

export type InvoiceData = {
  id: number;
  code: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
};

export type InvoicesData = InvoiceData[];

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export type AppDataState = {
  data: InvoicesData | null;
  status: AsyncStatus;
  error: string | null;
};
