import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoService } from '../service/django.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  forma!: FormGroup;
  user: string;
  constructor(private fb: FormBuilder, private router: Router, private api: DjangoService, private storage: Storage) { }

  ngOnInit() {
    this.crearFormulario();
    this.storage.create();
    this.storage.get('user').then((val) => {
      this.user = val;
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  nuevaPass(){
    this.api.changePass(this.forma.value).subscribe(
      (response) =>
        console.log(response)
      )
  }
}
