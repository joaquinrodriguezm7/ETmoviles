import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public alertButtons = ['OK'];
  user : string = '';

  constructor(private router : Router, private route: ActivatedRoute, private storage : Storage) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['user']){
      this.user = state['user'];
    }
  }

  async ngOnInit(){
    await this.storage.create()
    this.storage.get('userAuth').then((valor) => {
      this.user = valor;
    });
  }
}




