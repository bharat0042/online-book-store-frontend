import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'http://localhost:8080/v1/books';

  constructor(private httpClient : HttpClient) { }

  getBooksList() : Observable<Book[]> {
    return this.httpClient.get<GetBookResponse>(this.baseUrl).pipe(
      map(response => response._embedded.books)
    );
  }

  getBooksListByGenreId(genreId : number) : Observable<Book[]> {

    const searchUrl = `${this.baseUrl}/search/findByGenreId?id=${genreId}`;

    return this.httpClient.get<GetBookResponse>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}

interface GetBookResponse {
  "_embedded": {
    "books": Book[]
  }
}
