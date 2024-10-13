import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private totalPresupuesto: number = 0;

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
    console.log('Presupuesto actualizado:', this.totalPresupuesto);
  }
}