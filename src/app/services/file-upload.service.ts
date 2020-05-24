import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private UPLOAD_URL = environment.apiURL + "/resto/V1/user/upload";


  constructor(private http: HttpClient) {
  }

  public upload(data): Observable<string> {
    return this.http.post<string>(this.UPLOAD_URL, data, {responseType: 'text' as 'json'});
  }
}
