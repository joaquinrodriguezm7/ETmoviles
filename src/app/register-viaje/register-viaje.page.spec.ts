import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterViajePage } from './register-viaje.page';
import { Storage } from '@ionic/storage-angular';
import { RegisterCarPage } from '../register-car/register-car.page';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterViajePage', () => {
  let component: RegisterViajePage;
  let fixture: ComponentFixture<RegisterViajePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RegisterViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.configureTestingModule({
      declarations:[RegisterCarPage],
      imports:[Storage,
               RouterTestingModule],
      providers:[{provide:ActivatedRoute}]
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
