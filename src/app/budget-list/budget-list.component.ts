import { Component } from '@angular/core';
import { BudgetService } from '../service/budget.service';
import { Budget } from '../service/budget.model';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent {
  presupuestos: Budget[];
  constructor(private budgetService: BudgetService) {

    this.presupuestos = this.budgetService.getBudgets()();
  }
}