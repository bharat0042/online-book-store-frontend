import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice : number;
  totalQuantity : number;

  constructor(private cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    this.setCartItemList();
  }

  setCartItemList() {
    this.cartItems = this.cartService.cartItemList;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = Number(data.toFixed(2))
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.computeQuantityAndPrice();
  }

  incrementQuantity(item : CartItem) {
    this.cartService.addItemToCart(item);
  }

  decrementQuantity(item : CartItem) {
    this.cartService.decQuantity(item);
  }

  removeItem(item : CartItem) {
    this.cartService.remove(item);
  }

  checkoutNow() {
    this.router.navigateByUrl("/checkout");
  }
}
