import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DjangoService } from './django.service';

describe('DjangoService', () => {
  let service: DjangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DjangoService],
    });

    service = TestBed.inject(DjangoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
