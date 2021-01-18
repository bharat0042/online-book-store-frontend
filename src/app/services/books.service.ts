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

  getBooksList(curPage : number, pageSize : number) : Observable<GetBookResponse> {
    return this.httpClient.get<GetBookResponse>(`${this.baseUrl}?page=${curPage}&size=${pageSize}`);
  }

  getBooksListByGenreId(genreId : number, curPage : number, pageSize : number) : Observable<GetBookResponse> {

    const searchUrl = `${this.baseUrl}/search/findByGenreId?id=${genreId}&page=${curPage}&size=${pageSize}`;

    return this.httpClient.get<any>(searchUrl);
  }

  getBooksListById(bookId : number) : Observable<Book> {

    const bookUrl = `${this.baseUrl}/${bookId}`;

    return this.httpClient.get<Book>(bookUrl);
  }

  getBookListByName(name: string, curPage : number, pageSize : number) : Observable<GetBookResponse> {
    const searchUrlBar = `${this.baseUrl}/search/findByNameContaining?name=${name}&page=${curPage}&size=${pageSize}`;

    return this.httpClient.get<GetBookResponse>(searchUrlBar);
  }
}

interface GetBookResponse {
  _embedded: {
    books: Book[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}
