export enum SupplierCategory {
    ORDINAIRE = 'ORDINAIRE',
    CONVENTIONNE = 'CONVENTIONNE',
  }
  
  export interface Supplier {
    idSupplier: number;
    code: string;
    label: string;
    supplierCategory: SupplierCategory;
  }
  