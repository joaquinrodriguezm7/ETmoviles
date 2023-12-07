import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DjangoService } from '../service/django.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public alertButtons = ['OK'];
  user : string = '';
  viaje : any[] = [];
  constructor(private router : Router, private route: ActivatedRoute, private storage : Storage, private api : DjangoService) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['user']){
      this.user = state['user'];
    }
    let obj ={
      user: this.user
    };
    
    this.api.getViajes(obj).subscribe(
      (response)=>{
        this.viaje=response
        console.log(this.viaje)
      }
    )
  }

  async ngOnInit(){
    await this.storage.create()
    this.storage.get('nombre_usuario').then((valor) => {
      this.user = valor;
    });
  }

  tomarViaje(i:any){
    let data = {
      id_viaje: i.id_viaje,
      nombre_usuario_cliente: this.user
    }
    this.api.putViaje(data).subscribe(
      (response) => {
        console.log(data.id_viaje,data.nombre_usuario_cliente,response)
      }
    )
  }
}




