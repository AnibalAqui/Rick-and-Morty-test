import { TestBed } from '@angular/core/testing';

import { CharactersService } from './characters.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('shoudl getCharacters', () => {
    const res = service.getCharacters({
      name: 'rick',
      page: 1,
    });
    expect(res).toBeTruthy();
  });
  it('shoudl getCharacters without req', () => {
    const res = service.getCharacters();
    expect(res).toBeTruthy();
  });
  it('shoudl getCharactersById', () => {
    const res = service.getCharactersById([1, 2, 3]);
    expect(res).toBeTruthy();
  });
});
