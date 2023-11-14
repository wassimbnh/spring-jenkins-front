import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'src/app/Invoice';
import { Supplier } from 'src/app/Supplier';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{

  displayForm: boolean = false;
  invoiceForm: FormGroup;
  submitted : boolean = false;
  isUpdate : boolean = false;
  isDetails : boolean = false;

  invoices : Invoice[] = [];
  suppliers : Supplier[] = [];


  constructor(private fb: FormBuilder,
            private invoiceService: InvoiceService,
            private supplierService: SupplierService){

    this.invoiceForm = this.fb.group({
      idInvoice: [],
      amountDiscount: ['', Validators.required],
      amountInvoice: ['', [Validators.required]],
      dateCreationInvoice: ['', [Validators.required]],
      dateLastModificationInvoice: ['', [Validators.required]],
      archived: ['', [Validators.required]],
      supplier: [{
        idSupplier: '' ,
        code: '',
        label: '',
        supplierCategory:''}, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe(
      (data) =>{
        this.invoices = data
        console.log(data)
    })

    this.supplierService.getAllSuppliers().subscribe(
      (data) =>{
        this.suppliers = data;
        console.log(this.suppliers)
      }
    );
  }


  showForm(){
    this.displayForm = true;
    this.isDetails = true;
  }

  hideForm(){
    this.displayForm = false;
    this.invoiceForm.reset();
    this.isUpdate=! this.isUpdate
  }

  onSubmitInvoice(){
    this.submitted = true;
    
      if (this.isUpdate && this.invoiceForm.valid){

        const newInvoice = {
          amountDiscount: this.invoiceForm.value.amountDiscount,
          amountInvoice: this.invoiceForm.value.amountInvoice,
          dateCreationInvoice: this.invoiceForm.value.dateCreationInvoice,
          dateLastModificationInvoice: this.invoiceForm.value.dateLastModificationInvoice,
          archived: this.invoiceForm.value.archived,
          supplier: {
            idSupplier: this.invoiceForm.value.supplier.idSupplier ,
            code: this.invoiceForm.value.supplier.code,
            label: this.invoiceForm.value.supplier.label,
            supplierCategory: this.invoiceForm.value.supplier.supplierCategory
        }
        }
        console.log(newInvoice)
        this.invoiceService.updateInvoice(newInvoice,this.invoiceForm.value.idInvoice).subscribe({
          next: () =>{
            this.isUpdate = false; 
            this.invoiceService.getAllInvoices().subscribe(
              (data) =>{
                this.invoices = data;
              }
            );
          }
        })
        this.invoiceForm.reset()
        this.submitted = false;
      }
      else {
        if(this.invoiceForm.valid){

        const newInv = {
          idInvoice:null, 
          amountDiscount: this.invoiceForm.value.amountDiscount,
          amountInvoice: this.invoiceForm.value.amountInvoice,
          dateCreationInvoice: this.invoiceForm.value.dateCreationInvoice,
          dateLastModificationInvoice: this.invoiceForm.value.dateLastModificationInvoice,
          archived: this.invoiceForm.value.archived,
          supplier: {
            idSupplier: this.invoiceForm.value.supplier.idSupplier ,
            code: this.invoiceForm.value.supplier.code,
            label: this.invoiceForm.value.supplier.label,
            supplierCategory: this.invoiceForm.value.supplier.supplierCategory
        }}

          console.log(newInv)
        this.invoiceService.addInvoice(newInv).subscribe({
        next :(data: Invoice) =>{
          this.invoices.push(data);
        },
        error: ()=>{          
        }
      })
    }
    }
    this.invoiceForm.reset()
    this.submitted = false;
    this.displayForm = false;


  }

  onUpdateInvoiceShow(invoice: Invoice) {
    this.isUpdate = true;
    this.showForm();
  
    this.invoiceForm.setValue({
      idInvoice: invoice.idInvoice,
      amountDiscount: invoice.amountDiscount,
      amountInvoice: invoice.amountInvoice,
      dateCreationInvoice: invoice.dateCreationInvoice,
      dateLastModificationInvoice: invoice.dateLastModificationInvoice,
      archived: invoice.archived,
      supplier: {
        idSupplier: invoice.supplier.idSupplier
      }
    });
  }

  onDeleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe({
      next: () =>{
        this.invoices = this.invoices.filter((inv) => inv.idInvoice !== id)
      }
    })
  }


  onDetailInvoice(id: number){
    this.showForm();
    this.isDetails = false;
    this.invoiceService.detailInvoice(id).subscribe({
      next: (invoice) =>{
        this.invoiceForm.setValue({
          idInvoice: invoice.idInvoice,
          amountDiscount: invoice.amountDiscount,
          amountInvoice: invoice.amountInvoice,
          dateCreationInvoice: invoice.dateCreationInvoice,
          dateLastModificationInvoice: invoice.dateLastModificationInvoice,
          archived: invoice.archived,
          supplier: {
            idSupplier: invoice.supplier.code
          }
        });

      }
    })
  }
}
