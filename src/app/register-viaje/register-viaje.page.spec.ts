import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterViajePage } from './register-viaje.page';
import { Storage } from '@ionic/storage-angular';
import { RegisterCarPage } from '../register-car/register-car.page';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterViajePage', () => {
  let component: RegisterViajePage;
  let fixture: ComponentFixture<RegisterViajePage>;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      declarations:[RegisterCarPage],
      imports:[ IonicModule.forRoot(),
               HttpClientTestingModule,
               RouterTestingModule,
               FormsModule,
               ReactiveFormsModule],

      providers:[{ provide: Storage }]
    }).compileComponents
    fixture = TestBed.createComponent(RegisterViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
