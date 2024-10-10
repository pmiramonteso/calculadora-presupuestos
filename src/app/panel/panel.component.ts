import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../service/budget.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Output() totalWebCost = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.form = this.fb.group({
      numeroDePaginas: [0],
      numeroDeIdiomas: [0]
    });

    this.form.valueChanges.subscribe(values => {
      const total = this.budgetService.calcularTotal(values.numeroDePaginas, values.numeroDeIdiomas);
      this.totalWebCost.emit(total);
      this.budgetService.actualizarPresupuesto(total);
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

