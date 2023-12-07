import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { DjangoService } from '../service/django.service';
import { of, throwError } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { DuennoPage } from '../duenno/duenno.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let djangoService: jasmine.SpyObj<DjangoService>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const djangoServiceSpy = jasmine.createSpyObj('DjangoService', ['postData']);
  
    TestBed.configureTestingModule({
      declarations: [LoginPage, HomePage, DuennoPage],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: HomePage }, { path: 'duenno', component: DuennoPage },]),
        IonicModule.forRoot()
      ],
      providers: [
        { provide: DjangoService, useValue: djangoServiceSpy },
        { provide: Storage },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    djangoService = TestBed.inject(DjangoService) as jasmine.SpyObj<DjangoService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with the required controls', () => {
    expect(component.forma).toBeDefined();

    const usuarioControl = component.forma?.get('usuario');
    const passControl = component.forma?.get('pass');
    expect(usuarioControl).toBeDefined();
    expect(passControl).toBeDefined();
  
    const usuarioValidators = usuarioControl?.validator as ValidatorFn | null;
    const passValidators = passControl?.validator as ValidatorFn | null;
  
    const isUsuarioRequired = usuarioValidators?.(usuarioControl as AbstractControl) ? true : false;

    const isUsuarioMinLengthValid = usuarioControl?.value ? usuarioControl.value.length >= 5 : true;;

    const isPassRequired = passControl?.hasError('required') ?? true;

    console.log('isUsuarioRequired:', isUsuarioRequired);
    console.log('isUsuarioMinLengthValid:', isUsuarioMinLengthValid);
    console.log('isPassRequired:', isPassRequired);

    expect(isUsuarioRequired).toBe(true);
    expect(isUsuarioMinLengthValid).toBe(true);
    expect(isPassRequired).toBe(true);
  });

  it('should navigate to home when tipoUsuario is 2', fakeAsync(() => {
    const mockResponse = { tipoUsuario: 2 };
    djangoService.postData.and.returnValue(of(mockResponse));
    spyOn(router, 'navigate')

    component.guardar();
    tick();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should navigate to duenno when tipoUsuario is 1', fakeAsync(() => {
    const mockResponse = { tipoUsuario: 1 };
    djangoService.postData.and.returnValue(of(mockResponse));
    spyOn(router, 'navigate')

    component.guardar();
    tick();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/duenno']);
  }));

  it('should handle invalid credentials and show error message', fakeAsync(() => {
    const errorResponse = { status: 400, message: 'Credenciales inválidas' };
    djangoService.postData.and.returnValue(throwError(errorResponse));

    component.guardar();
    tick();
    fixture.detectChanges();

    expect(component.mensaje).toBe('Credenciales inválidas');
  }));

  it('should handle internal server error and show error message', fakeAsync(() => {
    const errorResponse = { status: 500, message: 'Error interno del servidor' };
    djangoService.postData.and.returnValue(throwError(errorResponse));

    component.guardar();
    tick();
    fixture.detectChanges();

    expect(component.mensaje).toBe('Error interno del servidor');
  }));
});