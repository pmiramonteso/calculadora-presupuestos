import { Injectable, signal } from '@angular/core';
import { Budget } from '../service/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public totalPresupuesto: number = 0;
  public _presupuestos = signal<Budget[]>([]);

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

  addBudget(budget:Budget){
    const currentBudgets = this._presupuestos();
    this._presupuestos.set([...currentBudgets, budget]);
    console.log(currentBudgets);
  }

  getBudget(){
    return this._presupuestos()
  }
}
