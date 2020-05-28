import {Table} from "./table";
import {User} from "./user";
import {BaseEntity} from "./base-entity";

export class ReserveEntity extends BaseEntity{
  reservationDate:Date;
  tables:Table;
  user:User;
}
