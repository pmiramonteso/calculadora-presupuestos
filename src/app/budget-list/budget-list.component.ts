import { Component, inject, Input, signal, OnInit } from '@angular/core';
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
export class BudgetListComponent implements OnInit {
  @Input() numeroDePaginas: number = 0;
  @Input() numeroDeIdiomas: number = 0;
  @Input() webCost: number = 0;
  form: FormGroup;
  _presupuestos = signal<Budget[]>([]);
  budgetService = inject(BudgetService);
  ErrorCheckbox: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      NombreCliente: ['', Validators.required],
      Telefono: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this._presupuestos.set(this.budgetService.getBudget());
  }

  solicitarPresupuesto() {
    const { NombreCliente, Telefono, Email } = this.form.value;
    const seo = this.form.get('seo')?.value;
    const ads = this.form.get('ads')?.value;
    const web = this.form.get('web')?.value;
    const totalWebCost = this.budgetService.calcularTotal(seo, ads, web, this.numeroDePaginas, this.numeroDeIdiomas, this.webCost);

    if (!seo && !ads && !web) {
      this.ErrorCheckbox = true;
      return;
    }
    this.ErrorCheckbox = false;

    if (this.form.valid) {
        const budget: Budget = {
        NombreCliente,
        Telefono,
        Email,
        totalCost: totalWebCost,
        servicios: {
          seo: seo,
          ads: ads,
          web: web,
        },
        numeroDePaginas: this.numeroDePaginas,
        numeroDeIdiomas: this.numeroDeIdiomas
      };

      this.budgetService.addBudget(budget);
      this.form.reset();
    }
  }
}
