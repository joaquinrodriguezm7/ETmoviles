import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duenno',
  templateUrl: './duenno.page.html',
  styleUrls: ['./duenno.page.scss'],
})
export class DuennoPage {
  constructor(private router: Router) {}

  irARegistroCarro() {
    this.router.navigate(['/registro-carro']);
  }

  irALogin() {
    this.router.navigate(['/login'])
  }

  irAViaje(){
    this.router.navigate(['/viaje'])
  }
}
