import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterCarPage } from './register-car.page';
import { DjangoService } from '../service/django.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { of, throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { DuennoPage } from '../duenno/duenno.page';

describe('RegisterCarPage', () => {
  let component: RegisterCarPage;
  let fixture: ComponentFixture<RegisterCarPage>;
  let djangoService: jasmine.SpyObj<DjangoService>;
  let storage: jasmine.SpyObj<Storage>;
  let fb: FormBuilder;

  beforeEach(
    waitForAsync(() => {
      const djangoServiceSpy = jasmine.createSpyObj('DjangoService', ['registerVehiculo']);
      const storageSpy = jasmine.createSpyObj('Storage', ['create', 'get']);

      TestBed.configureTestingModule({
        declarations: [RegisterCarPage],
        imports:[IonicModule.forRoot(),
                 ReactiveFormsModule,
                 FormsModule,
                 RouterTestingModule.withRoutes([{path:'duenno', component: DuennoPage}])],
        providers: [
          { provide: DjangoService, useValue: djangoServiceSpy },
          { provide: Storage, useValue: storageSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(RegisterCarPage);
      component = fixture.componentInstance;
      djangoService = TestBed.inject(DjangoService) as jasmine.SpyObj<DjangoService>;
      storage = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
      storage.get.and.returnValue(Promise.resolve('nombre_usuario_mock'));
      fb = TestBed.inject(FormBuilder);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    // Inicializa el formulario llamando al método
    component.crearFormulario();
  
    // Verifica que el formulario se haya creado
    expect(component.form).toBeTruthy();
  
    // Comprobaciones para evitar el error de 'null'
    if (component.form) {
      // Utiliza el operador de chequeo de nulidad en 'get' para cada campo
      const patenteControl = component.form.get('patente');
      const marcaControl = component.form.get('marca');
      const modeloControl = component.form.get('modelo');
      const capacidadControl = component.form.get('capacidad');
      const nombreUsuarioControl = component.form.get('nombre_usuario');
  
      // Verifica que cada control no sea 'null' o 'undefined' antes de usarlo
      expect(patenteControl).toBeTruthy();
      expect(marcaControl).toBeTruthy();
      expect(modeloControl).toBeTruthy();
      expect(capacidadControl).toBeTruthy();
      expect(nombreUsuarioControl).toBeTruthy();
  
      // Verifica que los campos del formulario tengan el validador requerido
      const validatorFnPatente = patenteControl?.validator;
      const validatorFnMarca = marcaControl?.validator;
      const validatorFnModelo = modeloControl?.validator;
      const validatorFnCapacidad = capacidadControl?.validator;
      const validatorFnNombreUsuario = nombreUsuarioControl?.validator;
  
      expect(validatorFnPatente).toBeTruthy();
      expect(validatorFnMarca).toBeTruthy();
      expect(validatorFnModelo).toBeTruthy();
      expect(validatorFnCapacidad).toBeTruthy();
      expect(validatorFnNombreUsuario).toBeTruthy();
  
      // Comprueba si cada control tiene un validador requerido
      if (validatorFnPatente && validatorFnMarca && validatorFnModelo && validatorFnCapacidad && validatorFnNombreUsuario) {
        const validationResultPatente = validatorFnPatente({} as any);
        const validationResultMarca = validatorFnMarca({} as any);
        const validationResultModelo = validatorFnModelo({} as any);
        const validationResultCapacidad = validatorFnCapacidad({} as any);
        const validationResultNombreUsuario = validatorFnNombreUsuario({} as any);
  
        expect(validationResultPatente).toEqual({ required: true });
        expect(validationResultMarca).toEqual({ required: true });
        expect(validationResultModelo).toEqual({ required: true });
        expect(validationResultCapacidad).toEqual({ required: true });
        expect(validationResultNombreUsuario).toEqual({ required: true });
      }
    }
  });

  it('should register vehicle successfully', () => {
    const mockFormData = {
      patente: 'ABC123',
      marca: 'Toyota',
      modelo: 'Camry',
      capacidad: 5,
      nombre_usuario: 'nombre_usuario_mock',
    };  

    djangoService.registerVehiculo.and.returnValue(of({ mensaje: 'Éxito' }));

    component.form.patchValue(mockFormData);
    component.registerVehiculo();

    expect(djangoService.registerVehiculo).toHaveBeenCalledWith(mockFormData);
    expect(component.isDisabled).toBe(true);
  });

  it('should handle registration failure', () => {
    const mockFormData = {
      patente: 'ABC123',
      marca: 'Toyota',
      modelo: 'Camry',
      capacidad: 5,
      nombre_usuario: 'nombre_usuario_mock',
    };

    const errorMessage = 'Error interno del servidor';
    djangoService.registerVehiculo.and.returnValue(throwError({ error: errorMessage }));

    component.form.patchValue(mockFormData);
    component.registerVehiculo();

    expect(djangoService.registerVehiculo).toHaveBeenCalledWith(mockFormData);
    expect(component.isDisabled).toBe(true); 
  });

});
