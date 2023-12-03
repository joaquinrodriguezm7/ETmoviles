import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCarPage } from './register-car.page';

describe('RegisterCarPage', () => {
  let component: RegisterCarPage;
  let fixture: ComponentFixture<RegisterCarPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RegisterCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
