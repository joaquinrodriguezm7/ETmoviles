import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = '';
  forma!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.crearFormulario();
  }

  get invalidUser(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched; 
  }

  get invalidPass(){
    return this.forma.get('pass')?.invalid && this.forma.get('pass')?.touched; 
  }

  crearFormulario(){

    this.forma = this.fb.group({
      usuario:['', [Validators.required, Validators.minLength(5)]],
      pass:['', Validators.required]
    })
  }

  guardar(){
    console.log(this.forma);
  }

  ngOnInit() {
  }

  enviar(){
    
  }

}
