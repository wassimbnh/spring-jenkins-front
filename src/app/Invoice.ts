import { Supplier } from "./Supplier";


export interface Invoice {
    idInvoice: any;
    amountDiscount: number;
    amountInvoice: number;
    dateCreationInvoice: Date;
    dateLastModificationInvoice: Date;
    archived: boolean;
    supplier: Supplier;
}