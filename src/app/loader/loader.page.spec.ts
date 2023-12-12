import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPage } from '../login/login.page';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderPage],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path:'login', component: LoginPage}]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /login after timeout', fakeAsync(() => {
    spyOn(router, 'navigate').and.callThrough();

    component.simulateLoading();

    fixture.detectChanges();

    tick(750);

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    flush();
  }));
});
