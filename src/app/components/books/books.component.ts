import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.listBooks();
      }
    );
  }

  listBooks() {
    const hasGenreId: boolean = this.route.snapshot.paramMap.has('id');
    
    if (hasGenreId) {
      let currentGenreId = +this.route.snapshot.paramMap.get('id');
      this.bookService.getBooksListByGenreId(currentGenreId).subscribe(
        data => this.books = data
      );
    }
    else {
      this.bookService.getBooksList().subscribe(
        data => this.books = data
      );
    }
  }
}
