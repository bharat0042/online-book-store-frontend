import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  user : string;

  constructor(private cartService: CartService,
             private router: Router) { }

  ngOnInit(): void {
    this.reviewCartDetails();
  }

  reviewCartDetails() {

    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  getFormData(name : string, phone : number, email : string, street : string, city : string, state : string, zip : number) {

    let customer = new Customer(name, phone, email, street, city, state, zip);

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItemList;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new Purchase();
    purchase.customer = customer;
    purchase.order = order;
    purchase.orderItems = orderItems;


    this.cartService.saveOrder(purchase);

    this.cartService.saveOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}.\nYou will be mailed the order id on your verified email account`);

        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );
  }

  resetCart() {
    this.cartService.cartItemList = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    
    // reset the form
    // navigate back to the products page
    this.router.navigateByUrl("/");
  }

}
