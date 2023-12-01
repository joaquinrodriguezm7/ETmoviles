import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DjangoService } from '../service/django.service';
@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.page.html',
  styleUrls: ['./register-car.page.scss'],
})
export class RegisterCarPage implements OnInit {
  form! : FormGroup;
  users: any;
  constructor(private api: DjangoService, private fb: FormBuilder) {
   }

  ngOnInit() {
    this.crearFormulario()
  }

  crearFormulario() {
    this.form = this.fb.group({
      patente:['', [Validators.required]],
      marca:['', [Validators.required]],
      modelo:['', [Validators.required]],
      capacidad:['', [Validators.required]],
    })
  }
  // this.api.getUsuarios().subscribe(
  //   (usuarios)=>{
  //     console.log(usuarios);
  //     this.users = usuarios;
  //     console.log(this.users);
  //   }
  //   ,
  //   (error)=>{
  //     console.log(error);
  //   }
  // );
  // this.crearFormulario()

  getId() {
    this.api.getUsuarios().subscribe(
      (usuarios)=>{
        console.log(usuarios);
        this.users = usuarios;
        console.log(this.users);
      }
    )
  }

  registerVehiculo(){
    console.log(this.form.value)
    this.api.registerVehiculo(this.form.value).subscribe(
      response => {
        console.log("Vehículo Registrado Exitosamente", response)
      },
      error => {
        console.log("No Funciona", error)
      }
    );
  }
}
