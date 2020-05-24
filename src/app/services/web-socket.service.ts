import {Injectable} from '@angular/core';

import SockJs from "sockjs-client";
import Stomp from "stompjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private BASE_URL = environment.apiURL+"/socket";

  constructor() { }

  public connect(){
    let socket = new SockJs(this.BASE_URL);

    return Stomp.over(socket);
  }
}
