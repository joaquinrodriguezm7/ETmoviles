import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DjangoService } from '../service/django.service';
import { Storage } from '@ionic/storage-angular';
import * as e from 'cors';

@Component({
  selector: 'app-register-viaje',
  templateUrl: './register-viaje.page.html',
  styleUrls: ['./register-viaje.page.scss'],
})
export class RegisterViajePage implements OnInit {
  form!: FormGroup;
  user: any;
  sedes: any[] = [];
  vehiculos: any;
  isDisabled: boolean = true;

  constructor(private storage: Storage, private fb: FormBuilder, private api : DjangoService) { 
    this.api.getSedes().subscribe(
      (response) => {
        this.sedes = response;
      },
      (error) => {
        console.error('Error al obtener las sedes', error);
      }
    );
  }

  async ngOnInit() {
    this.crearFormulario();
    this.storage.create();
    this.storage.get('nombre_usuario').then((val) => {
      this.user=val;
      console.log(this.user)

      console.log('URL de solicitud:', `${this.api.apiURL}/vehiculo/${this.user}/`);
    
      if (this.user) {
        this.api.getVehiculos(this.user).subscribe(
          (response) => {
              this.vehiculos = response;
              console.log(response);
          },
          (error) => {
              console.error('Error al obtener la patente', error);
              console.log(this.user);
          }
        );
      } else{
        console.error("a")
      }
    });
  }

  crearFormulario() {
    this.form = this.fb.group({
      sede:['', [Validators.required]],
      inicio:['', [Validators.required]],
      termino:['', [Validators.required]],
      costo:['', [Validators.required]],
      patente:['', [Validators.required]],
      capacidad:['', [Validators.required]],
      nombre_usuario_dueño:['', [Validators.required]],
    })
  }

  registerViaje(){
    console.log(this.form.value);
    this.api.registerViaje(this.form.value).subscribe(
      (response) => {
        console.log("Viaje Registrado Exitosamente", response)
      },
      (error) => {
        console.error(error)
      }
    );
  }
  
  actualizarCapacidad() {
    const patenteControl = this.form.get('patente');
    const capacidadControl = this.form.get('capacidad');
    
    if (patenteControl && patenteControl.value && capacidadControl) {
      const patenteSeleccionada = patenteControl.value;
      
      const vehiculoSeleccionado = this.vehiculos.find((v: any) => v.patente === patenteSeleccionada);
      
      if (vehiculoSeleccionado) {
        capacidadControl.setValue(vehiculoSeleccionado.capacidad);
      }
    }
  }
  
  obtenerCapacidad() {
    const patenteControl = this.form.get('patente');
  
    if (patenteControl && patenteControl.value) {
      const patenteSeleccionada = patenteControl.value;
      const vehiculoSeleccionado = this.vehiculos.find((v: any) => v.patente === patenteSeleccionada);
  
      return vehiculoSeleccionado ? vehiculoSeleccionado.capacidad : '';
    }
  
    return '';
  }
}
