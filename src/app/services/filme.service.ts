import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private readonly urlApi = 'https://api.themoviedb.org/3/movie';

  public selecionarFilmesPopulares():Observable<any> {
    throw new Error('Não implementado.');
  }
  constructor() { }
}
