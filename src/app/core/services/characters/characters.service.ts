import { inject, Injectable } from '@angular/core';
import { BaseServiceService } from '../base-service/base-service.service';
import {
  CharactersReqOpts,
  CharactersResp,
  CharRespResult,
} from './characters.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private baseService = inject(BaseServiceService);

  getCharacters(req?: CharactersReqOpts) {
    let params = new HttpParams();
    if (req?.page != null) {
      params = params.set('page', req.page.toString());
    }
    if (req?.name) params = params.set('name', req.name.trim());

    return this.baseService.get<CharactersResp>('/character', params);
  }

  getCharactersById(ids: number[]) {
    const idStrings = ids.join(',');
    return this.baseService.get<CharRespResult[]>(`/character/${idStrings}`);
  }
}
