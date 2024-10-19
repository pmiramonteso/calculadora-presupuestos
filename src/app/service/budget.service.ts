import { Injectable, signal } from '@angular/core';
import { Budget } from '../service/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public totalPresupuesto: number = 0;
  public _presupuestos = signal<Budget[]>([]);
  private presupuestoIdCounter: number = 1;

  calcularTotal(seo: boolean, ads: boolean, web: boolean, numeroDePaginas: number, numeroDeIdiomas: number, webCost: number = 0): number {
    let total = 0;

    if (seo) total += 300;
    if (ads) total += 400;
    if (web) total += 500 + webCost;

    total += (numeroDePaginas * 30);
    total += (numeroDeIdiomas * 30);
    
    return total;
  }

  actualizarPresupuesto(total: number): void {
    this.totalPresupuesto = total;
  }

  addBudget(budget:Budget){
    budget.id = (this.presupuestoIdCounter++).toString();
    const currentBudgets = this._presupuestos();
    this._presupuestos.set([...currentBudgets, budget]);
    console.log(this._presupuestos());
  }

  getBudget(){
    return this._presupuestos()
  }
}
