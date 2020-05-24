import {Component, OnInit} from '@angular/core';
import {Order} from "../../entity/Order";
import {OrderService} from "../../services/order.service";
import {OrderDetails} from "../../entity/order-details";
import * as FileSaver from 'file-saver';
import {WebSocketService} from "../../services/web-socket.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Order[];
  currentDishes:OrderDetails[];
  currentOrder:Order;

  constructor(private orderService: OrderService, private webSocketService:WebSocketService) {
    let stompClient = webSocketService.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/orders/notification', order => {
        this.orders.push(JSON.parse(order.body));
      })
    });
  }

  ngOnInit() {
    this.orderService.getAllOrder().subscribe(
      res=> {this.orders = res;},
      error => {alert("Error get orders")}
    )

  }

  orderSelected(order: Order) {
    this.currentDishes = order.dishes;
    this.currentOrder = order;
  }

  removeOrder(order: Order) {
    order.status = "Canceled";
    this.orderService.updateOrder(order).then(
      data=>{
        this.orders.splice(this.orders.indexOf(order),1);
        alert("Order canceled");
    },
      error=>{alert("Error cancel order");order.status = "Preparing"}
    )
  }

  doneOrder(order: Order) {
    order.status = "Done";
    this.orderService.updateOrder(order).then(
      data=>{
        this.orders.splice(this.orders.indexOf(order),1);
        FileSaver.saveAs(environment.apiURL + "/resto/V1/user/getFile/" + data.receiptPath,data.receiptPath.toString());
        alert("Done");
      }
    )
  }
}
