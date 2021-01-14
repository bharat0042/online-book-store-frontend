import { Book } from "./book";

export class CartItem {
    id : number;
    name : string;
    imageUrl : string;
    unitPrice : number = 0;
    quantity : number;

    constructor(book : Book) {
        this.id = book.id;
        this.name = book.name;
        this.imageUrl = book.imageUrl;
        this.unitPrice = book.price;
        this.quantity = 1;
    }
}