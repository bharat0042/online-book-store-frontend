import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from '../common/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = 'http://localhost:8080/v1/genres';

  constructor(private httpClient : HttpClient) { }

  getGenreList() : Observable<Genre[]> {
    return this.httpClient.get<GetGenreResponse>(this.baseUrl).pipe(
      map(response => response._embedded.genres)
    );
  }
}

interface GetGenreResponse {
  "_embedded": {
    "genres": Genre[]
  }
}