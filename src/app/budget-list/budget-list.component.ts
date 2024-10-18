import { Component, signal } from '@angular/core';
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
  presupuestos = signal<Budget[]>([]);
  totalWebCost = 0;

  constructor(private fb: FormBuilder, public budgetService: BudgetService) {

    this.form = this.fb.group({
      NombreCliente: ['', Validators.required],
      Telefono: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      total: [0] 
    });
  }
  
  solicitarPresupuesto() {
    if (this.form.valid) {
      this.budgetService.seo = this.form.value.seo;
      this.budgetService.ads = this.form.value.ads;
      this.budgetService.web = this.form.value.web; 
      this.budgetService.numeroDePaginas = this.form.value.numeroDePaginas || 0; 
      this.budgetService.numeroDeIdiomas = this.form.value.numeroDeIdiomas || 0; 
      this.budgetService.webCost = this.form.value.total;

      const totalCost = this.budgetService.calcularTotal(
        this.budgetService.seo,
        this.budgetService.ads, 
        this.budgetService.web, 
        this.budgetService.numeroDePaginas, 
        this.budgetService.numeroDeIdiomas, 
        this.totalWebCost);
      this.form.get('total')?.setValue(totalCost);

      const budget: Budget = {
        NombreCliente: this.form.value.NombreCliente,
        Telefono: this.form.value.Telefono,
        Email: this.form.value.Email,
        totalCost: this.form.value.total,
        servicios: [this.budgetService.seo, this.budgetService.ads, this.budgetService.web],
        numeroDePaginas: this.budgetService.numeroDePaginas,
        numeroDeIdiomas: this.budgetService.numeroDeIdiomas,
      };
  
      this.budgetService.addBudget(budget);
      this.form.reset();
    }
  }
}

