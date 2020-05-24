import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DishType} from "../entity/dish-type";
import {Dish} from "../entity/dish";
import {CssBlockDefinitionRuleAst} from "codelyzer/angular/styles/cssAst";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private BASE_URL = environment.apiURL + "/resto/V1";
  private GET_ALL_TYPES_URL = this.BASE_URL + "/dishType/getAll/";
  private GET_DISHES_BY_TYPE = this.BASE_URL + "/dish/getByType/";
  private GET_IMAGE_BY_URL = this.BASE_URL + "/user/getImage/";
  private SAVE_DISH_BY_URL = this.BASE_URL + "/dish/save";
  private SAVE_TYPE_BY_URL = this.BASE_URL + "/dishType/save";

  constructor(private http: HttpClient) {

  }

  async getAllTypes(): Promise<DishType[]> {
    return await this.http.get<DishType[]>(this.GET_ALL_TYPES_URL).toPromise();
  }

  getDishByType(type: DishType): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.GET_DISHES_BY_TYPE + type.name,);
  }

  saveDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.SAVE_DISH_BY_URL, dish);
  }

  saveType(type: DishType) {
    return this.http.post(this.SAVE_TYPE_BY_URL, type);
  }
}
