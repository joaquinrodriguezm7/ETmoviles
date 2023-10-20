import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  tarifaMinima: any;
  capacidad: any
  sede: String
  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();

    await this.storage.set('tarifaMinima', '5000');
    await this.storage.set('capacidad', '3');
    await this.storage.set('sede', 'Antonio Varas #666');

    this.storage.get('tarifaMinima').then((valor) => {
      this.tarifaMinima = valor;
    })

    this.storage.get('capacidad').then((valor) => {
      this.capacidad = valor;
    })

    this.storage.get('sede').then((valor) => {
      this.sede = valor;
    })
  }

}
