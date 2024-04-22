import { Food } from "./Food";

export class CartItem{
  quantity: number = 1;
  price: number;
  name: string;
  constructor(public food:Food){
    this.price = food.price;
    this.name = food.name;
  }

}
