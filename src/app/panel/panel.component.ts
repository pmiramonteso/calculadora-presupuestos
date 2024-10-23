import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent{
  @Output() totalWebCost = new EventEmitter<number>();
  @Output() paginasChange = new EventEmitter<number>();
  @Output() idiomasChange = new EventEmitter<number>();

  form: FormGroup;

  contadorPaginasAbierto: number = 0;
  contadorPaginasCerrado: number = 0;

  contadorIdiomasAbierto: number = 0;
  contadorIdiomasCerrado: number = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numeroDePaginas: [0, Validators.min(0)],
      numeroDeIdiomas: [0, Validators.min(0)],
    });

    this.form.valueChanges.subscribe(values => {
      this.paginasChange.emit(values.numeroDePaginas);
      this.idiomasChange.emit(values.numeroDeIdiomas);
    });
  }
  
  calcularTotal(values: any): number {
    return (values.numeroDePaginas * 30) + (values.numeroDeIdiomas * 30);
  }

  incrementoPaginas() {
    this.form.patchValue({
      numeroDePaginas: this.form.value.numeroDePaginas + 1
    });
  }

  decrementoPaginas() {
    if (this.form.value.numeroDePaginas > 0) {
      this.form.patchValue({
        numeroDePaginas: this.form.value.numeroDePaginas - 1
      });
    }
  }

  incrementoIdiomas() {
    this.form.patchValue({
      numeroDeIdiomas: this.form.value.numeroDeIdiomas + 1
    });
  }

  decrementoIdiomas() {
    if (this.form.value.numeroDeIdiomas > 0) {
      this.form.patchValue({
        numeroDeIdiomas: this.form.value.numeroDeIdiomas - 1
      });
    }
  }

  modalAbierto(tipo: string) {
    if (tipo === 'paginas') {
      this.contadorPaginasAbierto++;
      console.log(`El modal de páginas se ha abierto ${this.contadorPaginasAbierto} veces`);
    } else if (tipo === 'idiomas') {
      this.contadorIdiomasAbierto++;
      console.log(`El modal de idiomas se ha abierto ${this.contadorIdiomasAbierto} veces`);
    }
  }

  modalCerrado(tipo: string) {
    if (tipo === 'paginas') {
      this.contadorPaginasCerrado++;
      console.log(`El modal de páginas se ha cerrado ${this.contadorPaginasCerrado} veces`);
    } else if (tipo === 'idiomas') {
      this.contadorIdiomasCerrado++;
      console.log(`El modal de idiomas se ha cerrado ${this.contadorIdiomasCerrado} veces`);
    }
  }
}


