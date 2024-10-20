import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({ numeroDePaginas: 0, numeroDeIdiomas: 0 });
  });

  it('should increment number of pages', () => {
    const initialPages = component.form.value.numeroDePaginas;
    component.incrementoPaginas();
    expect(component.form.value.numeroDePaginas).toBe(initialPages + 1);
  });

  it('should decrement number of pages', () => {
    component.form.patchValue({ numeroDePaginas: 2 });
    component.decrementoPaginas();
    expect(component.form.value.numeroDePaginas).toBe(1);
  });

  it('should not decrement number of pages below 0', () => {
    component.decrementoPaginas();
    expect(component.form.value.numeroDePaginas).toBe(0);
  });

  it('should increment number of languages', () => {
    const initialLanguages = component.form.value.numeroDeIdiomas;
    component.incrementoIdiomas();
    expect(component.form.value.numeroDeIdiomas).toBe(initialLanguages + 1);
  });

  it('should decrement number of languages', () => {
    component.form.patchValue({ numeroDeIdiomas: 2 });
    component.decrementoIdiomas();
    expect(component.form.value.numeroDeIdiomas).toBe(1);
  });

  it('should not decrement number of languages below 0', () => {
    component.decrementoIdiomas();
    expect(component.form.value.numeroDeIdiomas).toBe(0);
  });

  it('should emit total cost on form value changes', () => {
    spyOn(component.totalWebCost, 'emit');
    component.form.patchValue({ numeroDePaginas: 1, numeroDeIdiomas: 1 });
    expect(component.totalWebCost.emit).toHaveBeenCalledWith(60);
  });

  it('should increment number of pages when increment button is clicked', () => {
    const incrementButton = fixture.debugElement.query(By.css('button.botones:nth-of-type(3)'));
    incrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.form.value.numeroDePaginas).toBe(1);
  });

  it('should decrement number of pages when decrement button is clicked', () => {
    component.form.patchValue({ numeroDePaginas: 1 });
    const decrementButton = fixture.debugElement.query(By.css('button.botones:nth-of-type(2)'));
    decrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.form.value.numeroDePaginas).toBe(0);
  });
});
