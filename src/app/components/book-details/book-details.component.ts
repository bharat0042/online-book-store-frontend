import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  newBook : Book;
  //bookAdditionalData : AddOnBook; --> for description and author, will add later
  public user : string;

  constructor(private activatedRoute : ActivatedRoute, private booksService : BooksService,
             private router : Router,  private cartService : CartService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getBookData();
    })
  }

  getBookData() {
    let newBookId = +this.activatedRoute.snapshot.paramMap.get('book-id');
    this.booksService.getBooksListById(newBookId).subscribe(
      data => this.newBook = data
    );
  }

  gotoHomepage() {
    this.router.navigateByUrl("/");
  }

  addToCart(temp : Book) {
    let cartItem = new CartItem(temp);
    this.cartService.addItemToCart(cartItem);
  }

}
