import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { DjangoService } from '../service/django.service';
import { Storage, IonicStorageModule} from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ViajePage', () => {
  let component: ViajePage;
  let fixture: ComponentFixture<ViajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViajePage],
      imports: [
        HttpClientTestingModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: DjangoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service: DjangoService = TestBed.inject(DjangoService);
    expect(service).toBeTruthy();
  });
});