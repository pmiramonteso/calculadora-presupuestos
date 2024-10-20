import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../service/budget.model';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  menuVisible = false;
  form: FormGroup;
  total: number = 0;
  webCost: number = 0;
  numeroDePaginas: number = 0;
  numeroDeIdiomas: number = 0;
  ErrorCheckbox: boolean = false;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.form = this.fb.group({
      seo: [false], 
      ads: [false], 
      web: [false],
      NombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      Telefono:['' , [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      Email:['', [Validators.required, Validators.email]],
    });

    this.form.valueChanges.subscribe(values => {
      this.calcularTotal(values);
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  onPaginasChange(paginas: number) {
    this.numeroDePaginas = paginas;
    this.calcularTotal(this.form.value);
  }

  onIdiomasChange(idiomas: number) {
    this.numeroDeIdiomas = idiomas;
    this.calcularTotal(this.form.value);
  }

  calcularTotal(values: any) {
    this.total = this.budgetService.calcularTotal(
      values.seo,
      values.ads,
      values.web,
      this.numeroDePaginas,
      this.numeroDeIdiomas,
      this.webCost
    );
    this.budgetService.actualizarPresupuesto(this.total);
  }

  onWebCostChange(cost: number) {
    this.webCost = cost;
    this.calcularTotal(this.form.value);
  }



  solicitarPresupuesto() {
    const { NombreCliente, Telefono, Email } = this.form.value;
    const seo = this.form.get('seo')?.value || false;
    const ads = this.form.get('ads')?.value || false;
    const web = this.form.get('web')?.value || false;
    const totalWebCost = this.budgetService.calcularTotal(seo, ads, web, this.numeroDePaginas, this.numeroDeIdiomas, this.webCost);

    if (!seo && !ads && !web) {
      this.ErrorCheckbox = true;
      return;
    }
    this.ErrorCheckbox = false;

    if (this.form.valid) {
        const budget: Budget = {
        id:'',
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
        numeroDeIdiomas: this.numeroDeIdiomas,
        fecha: new Date().toISOString()
      };

      this.budgetService.addBudget(budget);
      this.numeroDePaginas = 0;
      this.numeroDeIdiomas = 0;
      this.webCost = 0;
      this.form.reset();
      this.total = 0;
    }
  }
}
