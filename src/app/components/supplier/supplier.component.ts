import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit{


  displayForm = false;
  supplierForm : FormGroup;
  submitted : boolean = false;
  isUpdate : boolean = false;
  isDetails : boolean = false;

  suppliers : Supplier[] = [];

  constructor(private fb: FormBuilder,
              private supplierService: SupplierService) {
    this.supplierForm = this.fb.group({
      idSupplier: [],
      code: ['', Validators.required],
      label: ['', [Validators.required]],
      supplierCategory: ['', [Validators.required]],
    });

    this.suppliers = []; 
  }
  ngOnInit(): void {
    this.supplierService.getAllSuppliers().subscribe(
      (data) =>{
        this.suppliers = data;
      }
    );

    console.log(this.isDetails)
  }

  showForm() {
    this.displayForm = true;
    this.isDetails = true;
  }



  hideForm(){
    this.displayForm = false;
    this.isDetails = true;
    this.supplierForm.reset()
  }

  onSubmitSupplier(){
    this.submitted = true;
    console.log(this.isUpdate)
    
      if (this.isUpdate && this.supplierForm.valid){
        const newSupplier = {
          code: this.supplierForm.value.code,
          label: this.supplierForm.value.label,
          supplierCategory: this.supplierForm.value.supplierCategory,

        }
        this.supplierService.updateSupplier(newSupplier,this.supplierForm.value.idSupplier).subscribe({
          next: () =>{
            this.isUpdate = false; 
            this.supplierService.getAllSuppliers().subscribe(
              (data) =>{
                this.suppliers = data;
              }
            );
          }
        })
        this.supplierForm.reset()
        this.submitted = false;
        this.isUpdate = false;
      }
      else {

        this.supplierService.addSupplier(this.supplierForm.value).subscribe({
        next :(data: Supplier) =>{
          this.suppliers.push(data);
        },
        error: ()=>{          
        }
      })
    }
    
    this.supplierForm.reset();
    this.submitted = false;
    this.displayForm = false;
    
  }


  onDeleteSupplier(id: number){
    this.supplierService.deleteSupplier(id).subscribe({
      next: () =>{
        this.suppliers = this.suppliers.filter((sp) => sp.idSupplier !== id)
      }
    })
  }
  
  onUpdateSupplierShow(supplier: Supplier) {
    this.isUpdate = true;
    this.showForm();
  
    this.supplierForm.setValue({
      idSupplier: supplier.idSupplier,
      code: supplier.code,
      label: supplier.label,
      supplierCategory: supplier.supplierCategory,
    });
  }
  


  onDetailSupplier(id: number){
    this.showForm();
    this.isDetails = false;
    this.supplierService.detailSupplier(id).subscribe({
      next: (supplier) =>{
        this.supplierForm.setValue({
          idSupplier: supplier.idSupplier,
          code: supplier.code,
          label: supplier.label,
          supplierCategory: supplier.supplierCategory,
        })
      }
    })
  }
  
  }
  



