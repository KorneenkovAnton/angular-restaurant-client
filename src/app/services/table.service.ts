import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "../entity/table";
import {environment} from "../../environments/environment";
import {ReserveEntity} from "../entity/reserve-entity";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private BASE_URL = environment.apiURL + "/resto/V1";
  private GET_ALL_TABLES_URL = this.BASE_URL + "/reserve/all";
  private DELETE_TABLE = this.BASE_URL + "/reserve/delete/";

  constructor(private http: HttpClient) {
  }

  getAllTables(): Observable<ReserveEntity[]> {
    return this.http.get<ReserveEntity[]>(this.GET_ALL_TABLES_URL);
  }

  updateTable(id: number): Observable<any> {
    return this.http.delete<any>(this.DELETE_TABLE + id);
  }
}

