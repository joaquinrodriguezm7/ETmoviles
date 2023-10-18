import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public alertButtons = ['OK'];
  user : string = '';

  constructor(private router : Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['user']){
      this.user = state['user'];
    }
  }
}




