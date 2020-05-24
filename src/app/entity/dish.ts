import {DishType} from "./dish-type";
import {BaseEntity} from "./base-entity";

export class Dish extends BaseEntity{
  name:string;
  description:string;
  cost:number;
  availability:boolean;
  imagePath:string;
  type:DishType

  public toString():string{
    return  this.name;
  }
}
