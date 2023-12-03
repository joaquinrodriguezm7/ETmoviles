import { Component, OnInit } from '@angular/core';
import { DjangoService } from '../service/django.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  id: any;
  constructor(private storage: Storage, private api: DjangoService) { }

  ngOnInit() {
    this.storage.create()
  }
}
