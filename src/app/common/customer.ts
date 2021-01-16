import { CartItem } from "./cart-item";

export class Customer {
    name : string;
    phone : number;
    email : string;
    street : string;
    city : string;
    state : string;
    zip : number;

	constructor(name : string, phone : number, email : string, street : string, city : string, state : string, zip : number){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip
    }
}
