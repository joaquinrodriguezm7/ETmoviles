import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public alertButtons = ['OK'];
  user : string = '';

  constructor(private router : Router, private route: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state && state['user']){
      this.user = state['user'];
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // console.log(params['nombre_usuario'])
      this.user = params['nombre_usuario']
    });
  }
}




