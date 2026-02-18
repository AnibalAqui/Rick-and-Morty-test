import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  private http = inject(HttpClient);
  baseUrl = 'https://rickandmortyapi.com/api';
  get<T>(url: string, params?: HttpParams) {
    return firstValueFrom(this.http.get<T>(this.baseUrl + url, { params }));
  }
}
