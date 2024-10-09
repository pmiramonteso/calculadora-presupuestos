import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  numberOfPages: number = 1;
  numberOfLanguages: number = 1;
  pricePerPage: number = 100;
  pricePerLanguage: number = 50;

  @Output() totalWebCost = new EventEmitter<number>();

  calculateTotal() {
    const total = (this.numberOfPages * this.pricePerPage) + (this.numberOfLanguages * this.pricePerLanguage);
    this.totalWebCost.emit(total);
  }

  incrementPages() {
    this.numberOfPages++;
    this.calculateTotal();
  }

  decrementPages() {
    if (this.numberOfPages > 1) {
      this.numberOfPages--;
      this.calculateTotal();
    }
  }

  incrementLanguages() {
    this.numberOfLanguages++;
    this.calculateTotal();
  }

  decrementLanguages() {
    if (this.numberOfLanguages > 1) {
      this.numberOfLanguages--;
      this.calculateTotal();
    }
  }
}

