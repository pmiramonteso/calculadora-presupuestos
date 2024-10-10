import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form: FormGroup;
  total: number = 0;
  webCost: number = 0;

  precios = {
    seo: 300,
    ads: 400,
    web: 500
};
constructor(private fb: FormBuilder, private budgetService: BudgetService) {

  this.form = this.fb.group({
    seo: [false], 
    ads: [false], 
    web: [false] 
  });

  this.form.valueChanges.subscribe(values => {
    this.calcularTotal(values);
  });
}

calcularTotal(values: any) {
  this.total = 0;
  if (values.seo) {
      this.total += this.precios.seo;
  }
  if (values.ads) {
      this.total += this.precios.ads;
  }
  if (values.web) {
      this.total += this.precios.web + (this.webCost ?? 0);
  }
  this.budgetService.actualizarPresupuesto(this.total);
}

onWebCostChange(cost: number) {
  this.webCost = cost;
  this.calcularTotal(this.form.value);
}

}
