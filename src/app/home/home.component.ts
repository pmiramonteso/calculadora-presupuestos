import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../service/budget.model';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  menuVisible = false;
  form: FormGroup;
  total: number = 0;
  webCost: number = 0;
  numeroDePaginas: number = 1;
  numeroDeIdiomas: number = 1;
  ErrorCheckbox: boolean = false;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private router: Router,
    private route: ActivatedRoute) {
    this.form = this.fb.group({
      seo: [false], 
      ads: [false], 
      web: [false],
      NombreCliente: ['', Validators.required],
      Telefono:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      Email:['',[Validators.required, Validators.email]],
    });

    this.form.valueChanges.subscribe(values => {
      this.calcularTotal(values);
      this.updateUrl();
    });

    //Con esto vuelvo a 0 si borro web
    this.form.get('web')?.valueChanges.subscribe(web => {
      if (!web) {
        this.numeroDePaginas = 1;
        this.numeroDeIdiomas = 1;
        this.form.patchValue({
          numeroDePaginas: 1,
          numeroDeIdiomas: 1
        });
        this.calcularTotal(this.form.value);
        this.updateUrl();
      }
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  onPaginasChange(paginas: number) {
    this.numeroDePaginas = paginas;
    this.calcularTotal(this.form.value);
    this.updateUrl();
  }

  onIdiomasChange(idiomas: number) {
    this.numeroDeIdiomas = idiomas;
    this.calcularTotal(this.form.value);
    this.updateUrl();
  }

  calcularTotal(values: any) {
    const paginasExtra = this.numeroDePaginas > 1 ? this.numeroDePaginas - 1 : 0;
    const idiomasExtra = this.numeroDeIdiomas > 1 ? this.numeroDeIdiomas - 1 : 0;

    this.total = this.budgetService.calcularTotal(
      values.seo,
      values.ads,
      values.web,
      paginasExtra,
      idiomasExtra,
      this.webCost
    );
    this.budgetService.actualizarPresupuesto(this.total);
  }

  onWebCostChange(cost: number) {
    this.webCost = cost;
    this.calcularTotal(this.form.value);
    this.updateUrl();
  }

  solicitarPresupuesto() {
    this.form.markAllAsTouched();
    
    const { NombreCliente, Telefono, Email } = this.form.value;
    const seo = this.form.get('seo')?.value || false;
    const ads = this.form.get('ads')?.value || false;
    const web = this.form.get('web')?.value || false;
    const totalWebCost = this.budgetService.calcularTotal(seo, ads, web, this.numeroDePaginas, this.numeroDeIdiomas, this.webCost);

    if (!seo && !ads && !web) {
      this.ErrorCheckbox = true;
      setTimeout(() => {
        this.ErrorCheckbox = false;
      }, 4000);

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
      this.numeroDePaginas = 1;
      this.numeroDeIdiomas = 1;
      this.webCost = 0;
      this.form.reset();
      this.total = 0;
      this.updateUrl();
    }
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        seo: params['seo'] === 'true',
        ads: params['ads'] === 'true',
        web: params['web'] === 'true',
      });
      this.numeroDePaginas = params['numeroDePaginas'] ? +params['numeroDePaginas'] : 1;
      this.numeroDeIdiomas = params['numeroDeIdiomas'] ? +params['numeroDeIdiomas'] : 1;

      this.calcularTotal(this.form.value);
    });
  }

  updateUrl(){
    const queryParams: any = {}

    if(this.form.get('seo')?.value){
        queryParams.seo = true
      } else {
    queryParams.seo = null;
    }

    if(this.form.get('ads')?.value){
      queryParams.ads = true
    } else {
      queryParams.ads = null;
    }

    if(this.form.get('web')?.value){
      queryParams.web = true

    if(this.numeroDePaginas > 0){
      queryParams.numeroDePaginas = this.numeroDePaginas
    } else {
      queryParams.numeroDePaginas = null;
    }

    if(this.numeroDeIdiomas > 0){
      queryParams.numeroDeIdiomas = this.numeroDeIdiomas
    } else {
      queryParams.numeroDeIdiomas = null;
    }

  } else {
    queryParams.web = null;
    queryParams.numeroDePaginas = null;
    queryParams.numeroDeIdiomas = null;
  }
      this.router.navigate([], {
        queryParams: queryParams,
        queryParamsHandling: 'merge' 
      });
  }
}


