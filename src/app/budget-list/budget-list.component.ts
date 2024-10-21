import { Component} from '@angular/core';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent {
  palabra: string = '';
  constructor(public budgetService: BudgetService) {
  }

  buscarPresupuestos(event: Event) {
    const input = event.target as HTMLInputElement;
    this.palabra = input.value.toLowerCase();
    }

    cribarPresupuesto() {
      return this.budgetService._presupuestos().filter(budget => 
        budget.NombreCliente.toLowerCase().includes(this.palabra)
      );
    }
  ordenarPorFecha() {
    this.budgetService._presupuestos.update(presupuestos =>
      [...presupuestos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    );
  }

  ordenarPorPrecio() {
    this.budgetService._presupuestos.update(presupuestos => 
      [...presupuestos].sort((a, b) => a.totalCost - b.totalCost)
    );
  }

  ordenarPorNombre() {
    this.budgetService._presupuestos.update(presupuestos => 
      [...presupuestos].sort((a, b) => a.NombreCliente.localeCompare(b.NombreCliente))
    );
  }
}
