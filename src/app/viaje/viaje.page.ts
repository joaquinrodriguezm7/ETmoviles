import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { DjangoService } from '../service/django.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  form!: FormGroup;
  nombre_usuario: any;
  isDisabled: boolean = true
  constructor(private storage: Storage, private fb: FormBuilder, private api : DjangoService) { }

  async ngOnInit() {
    this.crearFormulario();
    this.storage.create();
    this.storage.get('nombre_usuario').then((val) => {
      this.nombre_usuario=val;
      });
  }

  crearFormulario() {
    this.form = this.fb.group({
      inicio:['', [Validators.required]],
      termino:['', [Validators.required]],
      costo:['', [Validators.required]],
      patente:['', [Validators.required]],
      nombre_usuario_dueño:['', [Validators.required]],
      nombre_usuario_cliente:['', [Validators.required]]
    })
  }

  registerViaje(){
    console.log(this.form.value);
    this.api.registerViaje(this.form.value).subscribe(
      response => {
        console.log("Viaje Registrado Exitosamente", response)
      },
      error => {
        console.log("No Funciona", error)
      }
    );
  }
}
