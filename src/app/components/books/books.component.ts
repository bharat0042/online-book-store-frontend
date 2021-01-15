import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
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

  constructor(private bookService: BooksService, private route: ActivatedRoute,
              private cartService : CartService, private router : Router,
              private oktaAuth : OktaAuthService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.listBooks();
      }
    );
  }

  async listBooks() {
    this.oktaAuth.$authenticationState.subscribe(
      data => this.isAuthenticated = data
    );
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

  addToCart(temp : Book) {
    let cartItem = new CartItem(temp);
    this.cartService.addItemToCart(cartItem);
  }
}
