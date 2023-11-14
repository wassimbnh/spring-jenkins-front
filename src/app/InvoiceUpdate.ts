import { Supplier } from "./Supplier";


export interface InvoiceUpdate {
    amountDiscount: number;
    amountInvoice: number;
    dateCreationInvoice: Date;
    dateLastModificationInvoice: Date;
    archived: boolean;
    supplier: Supplier
}