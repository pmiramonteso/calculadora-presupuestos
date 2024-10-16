import { Component, effect, Input } from '@angular/core';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../service/budget.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public budgetService: BudgetService) {

    this.form = this.fb.group({
      NombreCliente: ['', Validators.required],
      Telefono: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      total: [0] 
    });

    this.form.get('total')?.setValue(this.budgetService.getBudgets().length > 0 ? this.budgetService.getBudgets()[this.budgetService.getBudgets().length - 1].totalCost : 0);
  }

  solicitarPresupuesto() {
    if (this.form.valid) {
      const budget: Budget = {
        NombreCliente: this.form.value.NombreCliente,
        Telefono: this.form.value.Telefono,
        Email: this.form.value.Email,
        totalCost: this.form.value.total,
        servicios: [],
        numeroDePaginas: this.form.value.numeroDePaginas || 0,
        numeroDeIdiomas: this.form.value.numeroDeIdiomas || 0,
      };
 
      if (this.budgetService.getBudgets().length > 0) {
        const lastBudget = this.budgetService.getBudgets()[this.budgetService.getBudgets().length - 1];
        budget.servicios = lastBudget.servicios;
        budget.numeroDePaginas = lastBudget.numeroDePaginas;
        budget.numeroDeIdiomas = lastBudget.numeroDeIdiomas; 
      }
  
      this.budgetService.addBudget(budget);
      this.form.reset();
    }
  }

  ngOnInit() {
    effect(() => {
      console.log(this.budgetService.getBudgets());
    });
  }
}

