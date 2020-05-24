import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "../entity/table";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private BASE_URL = environment.apiURL + "/resto/V1";
  private GET_ALL_TABLES_URL = this.BASE_URL + "/table/getAll";
  private UPDATE_TABLE = this.BASE_URL + "/table/update";

  constructor(private http: HttpClient) {
  }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.GET_ALL_TABLES_URL);
  }

  async updateTable(table: Table): Promise<Table> {
    return await this.http.post<Table>(this.UPDATE_TABLE, table).toPromise();
  }
}
