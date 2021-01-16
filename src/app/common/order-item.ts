import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    bookId: number;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.bookId = cartItem.id;
    }
}
