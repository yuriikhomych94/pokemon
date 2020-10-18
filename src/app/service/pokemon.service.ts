import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = environment.url;
  constructor(private http: HttpClient) { }


  getPokemons(index): Observable<any> {
    return this.http.get<any>(`${this.url}/pokemon/${index}`)
  }

}
