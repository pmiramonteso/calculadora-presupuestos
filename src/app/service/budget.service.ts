import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private totalPresupuesto: number = 0;

  calcularTotal(numeroDePaginas: number, numeroDeIdiomas: number): number {
    return numeroDePaginas * numeroDeIdiomas * 30;
  }

  actualizarPresupuesto(total: number): void {
    this.totalPresupuesto = total;
    console.log('Presupuesto actualizado:', this.totalPresupuesto);
  }
}