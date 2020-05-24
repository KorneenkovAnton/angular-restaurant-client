import {Dish} from "./dish";
import {BaseEntity} from "./base-entity";

export class OrderDetails extends BaseEntity{
  num:number;
  dish:Dish;
}
