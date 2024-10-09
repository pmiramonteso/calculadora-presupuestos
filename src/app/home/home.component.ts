import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';

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
  webCost: number | null = 0;

  prices = {
    seo: 300,
    ads: 400,
    web: 500
};
constructor(private fb: FormBuilder) {

  this.form = this.fb.group({
    seo: [false], 
    ads: [false], 
    web: [false] 
  });

  this.form.valueChanges.subscribe(values => {
    this.calculateTotal(values);
  });
}

calculateTotal(values: any) {
  this.total = 0;
  if (values.seo) {
      this.total += this.prices.seo;
  }
  if (values.ads) {
      this.total += this.prices.ads;
  }
  if (values.web) {
      this.total += this.prices.web + (this.webCost ?? 0);
  }
}

onWebCostChange(cost: number) {
  this.webCost = cost;
  this.calculateTotal(this.form.value);
}

}
