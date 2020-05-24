import {OrderDetails} from "./order-details";
import {BaseEntity} from "./base-entity";
import {Table} from "./table";
import {User} from "./user";


export class Order extends BaseEntity{
  date:Date;
  amount:number;
  status:string;
  info:string;
  user:User;
  table:Table;
  dishes:OrderDetails[];
  receiptPath:String;
}
