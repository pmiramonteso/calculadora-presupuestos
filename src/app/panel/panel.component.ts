import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../service/budget.model';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Output() totalWebCost = new EventEmitter<number>();
  
  form: FormGroup;
  modalTitle: string = '';
  modalBody: string = '';

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      clientPhone: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      numeroDePaginas: [0, Validators.min(0)],
      numeroDeIdiomas: [0, Validators.min(0)],
      service: ['Basic']
    });

    this.form.valueChanges.subscribe(values => {
      const total = this.calcularTotal(values);
      this.totalWebCost.emit(total);
    });
  }

  setModalContent(title: string, body: string) {
    this.modalTitle = title;
    this.modalBody = body;
  }

  calcularTotal(values: any): number {
    return (values.numeroDePaginas * 30) + (values.numeroDeIdiomas * 30);
  }

  addBudget() {
    if (this.form.valid) {
      const totalCost = this.calcularTotal(this.form.value);
      
      const budget: Budget = {
        clientName: this.form.value.clientName,
        clientPhone: this.form.value.clientPhone,
        clientEmail: this.form.value.clientEmail,
        service: this.form.value.service,
        totalCost: totalCost,
        numeroDePaginas: this.form.value.numeroDePaginas,
        numeroDeIdiomas: this.form.value.numeroDeIdiomas
      };

      this.budgetService.addBudget(budget);
      this.resetForm();
    }
  }

  resetForm() {
    this.form.reset({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      numeroDePaginas: 0,
      numeroDeIdiomas: 0,
      service: 'Basic'
    });
  }

  incrementoPaginas() {
    this.form.patchValue({
      numeroDePaginas: this.form.value.numeroDePaginas + 1
    });
  }

  decrementoPaginas() {
    if (this.form.value.numeroDePaginas > 0) {
      this.form.patchValue({
        numeroDePaginas: this.form.value.numeroDePaginas - 1
      });
    }
  }

  incrementoIdiomas() {
    this.form.patchValue({
      numeroDeIdiomas: this.form.value.numeroDeIdiomas + 1
    });
  }

  decrementoIdiomas() {
    if (this.form.value.numeroDeIdiomas > 0) {
      this.form.patchValue({
        numeroDeIdiomas: this.form.value.numeroDeIdiomas - 1
      });
    }
  }
}
