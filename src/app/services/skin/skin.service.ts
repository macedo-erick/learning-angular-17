import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Skin } from '../../models/skin.model';

@Injectable({
  providedIn: 'root'
})
export class SkinService {
  private readonly BASE_URL =
    'https://bymykel.github.io/CSGO-API/api/en/skins.json';

  constructor(private http: HttpClient) {}

  getSkins() {
    return this.http.get<Skin[]>(this.BASE_URL);
  }
}
