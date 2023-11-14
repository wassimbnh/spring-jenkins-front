import { Supplier } from "./Supplier";

export enum SupplierCategory {
    ORDINAIRE = 'ORDINAIRE',
    CONVENTIONNE = 'CONVENTIONNE',
  }
  
  export interface SupplierUpdate {
    code: string;
    label: string;
    supplierCategory: SupplierCategory;
    
  }
  