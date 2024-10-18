import { Injectable, signal } from '@angular/core';
import { Budget } from '../service/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public totalWebCostSignal = signal<number>(0);
  private totalPresupuesto: number = 0;
  public _presupuestos = signal<Budget[]>([]);

  seo: boolean = false;
  ads: boolean = false;
  web: boolean = false;
  numeroDePaginas: number = 0;
  numeroDeIdiomas: number = 0;
  webCost: number = 0;

  calcularTotal(seo: boolean, ads: boolean, web: boolean, numeroDePaginas: number, numeroDeIdiomas: number, webCost: number = 0): number {
    let total = 0;

    if (seo) total += 300;
    if (ads) total += 400;
    if (web) total += 500 + webCost;

    total += (numeroDePaginas * 30) + (numeroDeIdiomas * 30);
    
    return total;
  }

  actualizarPresupuesto(total: number): void {
    this.totalPresupuesto = total;
    //console.log('Presupuesto actualizado:', this.totalPresupuesto);
  }

  addBudget(budget: Budget): void {
    const updatedBudgets = [...this._presupuestos(), budget];
    this._presupuestos.set(updatedBudgets);
 
  }
  getBudgets() {
    return this._presupuestos.asReadonly();
  }
  setTotalWebCost(cost: number): void {
    this.totalWebCostSignal.set(cost);
  }
  getTotalWebCost() {
    return this.totalWebCostSignal.asReadonly();
  }
}
