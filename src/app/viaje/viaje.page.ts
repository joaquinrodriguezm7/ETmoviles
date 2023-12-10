import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { DjangoService } from '../service/django.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import * as e from 'cors';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  alertButtons = ['Aceptar'];
  user : string = '';
  viaje : any = {};
  id_viaje: any;
  constructor(private storage: Storage, private fb: FormBuilder, private api : DjangoService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    
    this.route.queryParams.subscribe((params) => {
      this.id_viaje = params['id_viaje'];
      console.log('Id del viaje:', this.id_viaje);

      this.api.getDetallesViaje(this.id_viaje).subscribe(
        (response) => {
          console.log('Detalles del viaje:', response);
          this.viaje = response;
        },
        (error) => {
          console.error('Error al obtener detalles del viaje:', error);
        }
      );
    });
   }
    
  async ngOnInit() {
    this.storage.get('user').then((valor) => {
      this.user = valor;
    });
  }

  tomarViaje(id_viaje: any) {
    let data = {
      id_viaje: id_viaje,
      nombre_usuario_cliente: this.user
    };
    this.api.putViaje(data).subscribe(
      (response) => {
        console.log('Viaje tomado correctamente:', response);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al tomar el viaje:', error);
      }
    );
  }
}
