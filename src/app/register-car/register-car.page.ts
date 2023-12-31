import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DjangoService } from '../service/django.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.page.html',
  styleUrls: ['./register-car.page.scss'],
})
export class RegisterCarPage implements OnInit {
  alertButtons = ['Aceptar'];
  form! : FormGroup;
  nombre_usuario: any;
  isDisabled: boolean = true
  constructor(private api: DjangoService, private fb: FormBuilder, private storage: Storage, private router: Router) {
    this.crearFormulario();
   }

   ngOnInit() {
    
    this.storage.create();
    this.storage.get('nombre_usuario').then((val) => {
      this.nombre_usuario = val;
    });
  }


  crearFormulario() {
    this.form = this.fb.group({
      patente:['', [Validators.required]],
      marca:['', [Validators.required]],
      modelo:['', [Validators.required]],
      capacidad:['', [Validators.required]],
      nombre_usuario:['', [Validators.required]],
      
    })
  }

  registerVehiculo() {
    if (this.form) {
      const mockFormData = {
        patente: 'ABC123',
        marca: 'Toyota',
        modelo: 'Camry',
        capacidad: 5,
        nombre_usuario: 'nombre_usuario_mock',
      };
  
      
      this.api.registerVehiculo(this.form.value).subscribe(
        response => {
          console.log("Vehículo Registrado Exitosamente", response);
          this.router.navigate(['/duenno'])
        },
        error => {
          console.log("No Funciona", error);
        }
      );
    } else {
      console.error('El formulario no está inicializado.');
    }
  }
}
