import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duenno',
  templateUrl: './duenno.page.html',
  styleUrls: ['./duenno.page.scss'],
})
export class DuennoPage {
  
  alertButtons = ['Aceptar'];
  constructor(private router: Router) {}

  irARegistroCarro() {
    this.router.navigate(['/register-car']);
  }

  irALogin() {
    this.router.navigate(['/login'])
  }

  irAViaje(){
    this.router.navigate(['/register-viaje'])
  }
}
