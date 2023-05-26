import { Component, OnInit } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  selector: 'app-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  standalone: true
})
export class AppForm implements OnInit {
  form = new FormGroup({
    sheetId: new FormControl(''),
    name: new FormControl(''),
    quantity: new FormControl('')
  });  
  quantitySubscription: Subscription | undefined;

  constructor() { }
  
  ngOnInit() {
    this.onChanges();
  }


  onChanges(): void {
    this.quantitySubscription =  this.form.controls.quantity.valueChanges.subscribe((val=>{
      this.removeBadCharacters(val);
    }))
  }

  removeBadCharacters(value: string | null): void {
    if (Number.isInteger(value) == false){
      this.form.patchValue({quantity: value != null ? value.replace(/^[0-9]|[a-zA-Z]$/, ""): ""}, {emitEvent: false});
    }
  }

  ngOnDestroy() {
    if (this.quantitySubscription){
      this.quantitySubscription.unsubscribe();
    }
  }
};