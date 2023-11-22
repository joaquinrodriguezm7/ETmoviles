import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    
      const isAuthenticated = await this.isAuthenticated();
      
      if(isAuthenticated == false){
        this.router.navigate(['notfound'])
      }
      
      return isAuthenticated;
  }

  constructor(private storage: Storage, private router: Router){

  }

  async isAuthenticated() {
    await this.storage.create()
    const futuroValor:Promise<string> = await this.storage.get('userAuth');
    const valor = await futuroValor;//esperamos que la promesa se resuelva

    if(valor == null){
      return false
    }else{
      return true
    }

    // this.storage.get('userAuth').then((valor) => {
    //   if(valor == null){
    //     return false
    //   }else{
    //     return true
    //   }
    // });
  }
  
}
