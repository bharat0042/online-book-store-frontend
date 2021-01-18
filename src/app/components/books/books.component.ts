import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  isAuthenticated: boolean;
  config: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  }  = {currentPage : 1 , itemsPerPage : 4 , totalItems : 0};

  previousName : string = "";
  previousId : number = 0;

  constructor(private bookService: BooksService, private route: ActivatedRoute,
              private cartService : CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.listBooks();
      }
    );
  }

  listBooks() {
    const hasGenreId: boolean = this.route.snapshot.paramMap.has('id');
    const hasName: boolean = this.route.snapshot.paramMap.has('name');
    
    if(hasName && !hasGenreId) {
      let name = this.route.snapshot.paramMap.get('name');
      if(name != this.previousName) {
        this.config.currentPage = 1;
      }
      this.previousName = name;
      this.bookService.getBookListByName(name, this.config.currentPage-1, 
        this.config.itemsPerPage).subscribe(
          this.processResult()
      );
    }
    else {
      if(hasGenreId) {
        let currentGenreId = +this.route.snapshot.paramMap.get('id');
        if(currentGenreId != this.previousId) {
          this.config.currentPage = 1;
        }
        this.previousId = currentGenreId;
        this.bookService.getBooksListByGenreId(currentGenreId, this.config.currentPage-1, 
          this.config.itemsPerPage).subscribe(
          this.processResult()
        );
      }
      else {
        this.bookService.getBooksList(this.config.currentPage-1, 
          this.config.itemsPerPage).subscribe(
            this.processResult()
        );
      }
    }
  }

  processResult() {
    return (data: { _embedded: { books: Book[]; }; page: { size: number; totalElements: number; number: number; }; }) => {
      this.books = data._embedded.books;
      this.config.itemsPerPage = data.page.size;
      this.config.totalItems = data.page.totalElements;
      this.config.currentPage = Number(data.page.number) + 1;
    };
  }

  addToCart(temp : Book) {
    let cartItem = new CartItem(temp);
    this.cartService.addItemToCart(cartItem);
  }

  pageChanged(curPage : number) {
    this.config.currentPage = Number(curPage);
    this.listBooks();
  }

  updatePageSize(event: any) {
    let pageSizeValue = (event.target as HTMLSelectElement).value
    this.config.itemsPerPage = Number(pageSizeValue);
    this.config.currentPage = 1;
    this.listBooks();
  }
}
