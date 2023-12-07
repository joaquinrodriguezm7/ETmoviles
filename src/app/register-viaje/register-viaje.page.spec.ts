import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterViajePage } from './register-viaje.page';

describe('RegisterViajePage', () => {
  let component: RegisterViajePage;
  let fixture: ComponentFixture<RegisterViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
