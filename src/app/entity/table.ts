import {BaseEntity} from "./base-entity";
import {User} from "./user";

export class Table extends BaseEntity{
  name:string;
  status:string;
  reservationDate:Date;
  user:User;
}
