import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList: CartItem[] = [];
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }
  
  addItemToCart(cartItem: CartItem) {
    let itemExistInCart: boolean = false;
    let existingCartItem: CartItem ;

    for (let temp of this.cartItemList) {
      if (cartItem.id == temp.id) {
        itemExistInCart = true;
        existingCartItem = temp;
        break;
      }
    }

    if (itemExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItemList.push(cartItem);
    }

    this.computeQuantityAndPrice();
  }

  computeQuantityAndPrice() {
    let totalPriceValue: number = 0;
    let totalItemQuantity: number = 0;
    for (let temp of this.cartItemList) {
      if (temp.unitPrice != undefined) {
        totalPriceValue = totalPriceValue + temp.quantity * temp.unitPrice;
        totalItemQuantity = totalItemQuantity + temp.quantity;
      }
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalItemQuantity);
  }

  decQuantity(item: CartItem) {
    item.quantity--;
    if (item.quantity == 0) {
      this.remove(item);
    } else {
      this.computeQuantityAndPrice();
    }
  }

  remove(item: CartItem) {
    const itemIndexInCartList = this.cartItemList.findIndex(data => data.id === item.id);
    if (itemIndexInCartList > -1) {
      this.cartItemList.splice(itemIndexInCartList, 1);
    }
    this.computeQuantityAndPrice();
  }

  getCartItemList() {
    console.log(this.cartItemList);
    return this.cartItemList;
  }
}
