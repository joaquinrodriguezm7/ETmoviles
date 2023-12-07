import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DuennoPage } from './duenno.page';
import { Router } from '@angular/router';
import { RegisterCarPage } from '../register-car/register-car.page';

describe('DuennoPage', () => {
  let component: DuennoPage;
  let fixture: ComponentFixture<DuennoPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DuennoPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([{ path:'register-car', component: RegisterCarPage}]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DuennoPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /registro-carro when irARegistroCarro is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.irARegistroCarro();

    expect(navigateSpy).toHaveBeenCalledWith(['/register-car']);
  });

  it('should navigate to /login when irARegistroCarro is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.irALogin();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
  
  it('should navigate to /viaje when irARegistroCarro is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.irAViaje();

    expect(navigateSpy).toHaveBeenCalledWith(['/register-viaje']);
  });
});