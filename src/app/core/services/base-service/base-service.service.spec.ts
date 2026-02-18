import { TestBed } from '@angular/core/testing';

import { BaseServiceService } from './base-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('BaseServiceService', () => {
  let service: BaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get with url', () => {
    const httpSpy = spyOn(service['http'], 'get').and.returnValue(of([]));
    service.get('/character');
    expect(httpSpy).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character',
      { params: undefined },
    );
  });
});
