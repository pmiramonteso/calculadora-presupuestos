import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  numeroDePaginas: number = 0;
  numeroDeIdiomas: number = 0;
  precioPorPagina: number = 30;
  precioPorIdioma: number = 30;

  @Output() totalWebCost = new EventEmitter<number>();

  calcularTotal() {
    const total = (this.numeroDePaginas * this.numeroDeIdiomas) * 30;
    this.totalWebCost.emit(total);
  }

  incrementoPaginas() {
    this.numeroDePaginas++;
    this.calcularTotal();
  }

  decrementoPaginas() {
    if (this.numeroDePaginas > 0) {
      this.numeroDePaginas--;
      this.calcularTotal();
    }
  }

  incrementoIdiomas() {
    this.numeroDeIdiomas++;
    this.calcularTotal();
  }

  decrementoIdiomas() {
    if (this.numeroDeIdiomas > 0) {
      this.numeroDeIdiomas--;
      this.calcularTotal();
    }
  }
}

