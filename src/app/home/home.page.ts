import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DjangoService } from '../service/django.service';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public alertButtons = ['OK'];
  user : string = '';
  viaje : any[] = [];
  id : any;
  sedes: any[] = [];
  sede: string = 'todos';
  constructor(private router : Router, private route: ActivatedRoute, private storage : Storage, private api : DjangoService, private navCtrl : NavController, private cdr: ChangeDetectorRef) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['user']){
      this.user = state['user'];
    }
    let obj ={
      user: this.user
    };
    
    this.api.getViajes(obj).subscribe(
  (response) => {
    this.viaje = response;
    this.cdr.detectChanges();
  },
  (error) => {
    console.error('Error al obtener los viajes', error);
  }
) ;
    this.api.getSedes().subscribe(
      (sedes) => {
        this.sedes = sedes;
      },
      (error) => {
        console.error('Error al obtener las sedes', error);
      }
    );
  }

  async ngOnInit(){
    await this.storage.create()
    this.storage.get('nombre_usuario').then((valor) => {
      this.user = valor;
    });
  }

  verViaje(i:any){
    this.id = i.id_viaje
    console.log(this.id)
    this.navCtrl.navigateForward('/viaje',{queryParams: {
      id_viaje: this.id
    }});
  }

  event($event: any) {
    if (this.sede === 'todos') {
        this.api.getViajes({}).subscribe(
            (response) => {
                this.viaje = response;
            },
            (error) => {
                console.error('Error al obtener todos los viajes', error);
            }
        );
    } else {
        this.api.getViajes({ sede: this.sede }).subscribe(
            (response) => {
                this.viaje = response;
                console.log(this.viaje)
            },
            (error) => {
                console.error('Error al obtener viajes filtrados', error);
            }
        );
    }
  }
}




