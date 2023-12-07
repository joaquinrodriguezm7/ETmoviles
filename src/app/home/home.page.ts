import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DjangoService } from '../service/django.service';
import { NavController } from '@ionic/angular';
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
  constructor(private router : Router, private route: ActivatedRoute, private storage : Storage, private api : DjangoService, private navCtrl : NavController) {
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
      }
    )
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
}




