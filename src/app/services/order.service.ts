import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../entity/Order";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private BASE_URL = "http://localhost:8080/resto/V1";
  private BASE_URL = environment.apiURL + "/resto/V1";
  private GET_ALL_ORDERS_URL = this.BASE_URL + "/order/getAll";
  private UPDATE_USER = this.BASE_URL + "/order/update";

  constructor(private http:HttpClient) { }

  getAllOrder() :Observable<Order[]>{
    return this.http.get<Order[]>(this.GET_ALL_ORDERS_URL);
  }

  async updateOrder(order:Order) :Promise<Order>{
    return await this.http.put<Order>(this.UPDATE_USER,order).toPromise();
  }
}
