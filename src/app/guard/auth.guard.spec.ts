import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Storage } from '@ionic/storage-angular';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,
                  Storage],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});