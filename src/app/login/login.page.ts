import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { DjangoService } from '../service/django.service';
import { Storage } from '@ionic/storage-angular';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  pass: string = '';
  checked: boolean = false;
  user: string = '';
  forma!: FormGroup;
  mensaje: string = '';
  id: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private DjangoService: DjangoService,
    private storage: Storage,
    private zone: NgZone
  ) {
    this.crearFormulario();
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('user').then((val) => {
      this.usuario = val;
    });
    this.storage.get('pass').then((val) => {
      this.pass = val;
    });
    this.storage.get('checked').then((val) => {
      this.checked = val;
    });
  }

  get invalidUser() {
    return (
      this.forma.get('usuario')?.invalid &&
      this.forma.get('usuario')?.touched
    );
  }

  get invalidPass() {
    return (
      this.forma.get('pass')?.invalid && this.forma.get('pass')?.touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      pass: ['', Validators.required],
    });
  }

  guardar() {
    this.storage.set('nombre_usuario', this.forma.get('usuario')?.value);
    if (this.checked) {
      this.storage.set('user', this.forma.get('usuario')?.value);
      this.storage.set('pass', this.forma.get('pass')?.value);
    } else {
      this.storage.remove('user');
      this.storage.remove('pass');
    }

    this.DjangoService.postData(this.forma.value).subscribe(
      (response) => {
        this.id = response.id_usuario;
        this.storage.set("id_usuario", this.id);
        if (response.tipoUsuario === 2) {
          this.zone.run(() => {
            this.router.navigate(['/home']);
          });
          
        } else if (response.tipoUsuario === 1) {
          this.zone.run(() => {
            this.router.navigate(['/duenno']);
          });
          
        }
        this.mensaje = 'Se ha iniciado sesión correctamente';},
        (error)=>{
          console.error('Error durante el inicio de sesión:', error);
          if(error.status === 400){
            this.mensaje = 'Credenciales inválidas';
            setTimeout(() => {
              this.mensaje='';
            }, 5000);
          }
          else if(error.status === 500){
            this.mensaje = 'Error interno del servidor';
            setTimeout(() => {
              this.mensaje='';
            }, 5000);
          } 
          return throwError(error);
        }
      );
  }

  check() {
    this.storage.set('checked', this.checked);
  }
}