import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../service/budget.service';
import { BudgetListComponent } from '../budget-list/budget-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  form: FormGroup;
  total: number = 0;
  webCost: number = 0;
  numeroDePaginas: number = 0;
  numeroDeIdiomas: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.form = this.fb.group({
      seo: [false], 
      ads: [false], 
      web: [false],
      numeroDePaginas: [0],
      numeroDeIdiomas: [0]
    });

    this.form.valueChanges.subscribe(values => {
      this.calcularTotal(values);
    });
  }

  calcularTotal(values: any) {
    this.total = this.budgetService.calcularTotal(
      values.seo,
      values.ads,
      values.web,
      values.numeroDePaginas,
      values.numeroDeIdiomas,
      this.webCost
    );
    this.budgetService.actualizarPresupuesto(this.total);
  }

  onWebCostChange(cost: number) {
    this.webCost = cost;
    this.calcularTotal(this.form.value);
  }

}
