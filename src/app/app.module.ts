import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DishesComponent} from './pages/dishes/dishes.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './pages/navigation/navigation.component';
import { DishComponent } from './pages/dishes/dish/dish.component';
import { CreateDishDialogComponent } from './pages/dishes/create-dish-dialog/create-dish-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { TablesComponent } from './pages/tables/tables.component';
import {MatFileUploadModule} from "mat-file-upload";
import {AuthInterceptor} from "./interceptor/auth-interceptor";
import {AuthGuard} from "./guard/auth.guard";
import {WebSocketService} from "./services/web-socket.service";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import { CarouselComponent } from './pages/carousel/carousel.component';


declare var require: any;
const FileSaver = require('file-saver');

const appRoutes :Routes = [
  {
    path:'dishes',
    component:DishesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'orders',
    component:OrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'tables',
    component:TablesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    component:CarouselComponent,
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    OrdersComponent,
    LoginComponent,
    NavigationComponent,
    DishComponent,
    CreateDishDialogComponent,
    TablesComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFileUploadModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
  ],
  providers: [
    WebSocketService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
