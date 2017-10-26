import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsService } from './restaurants/restaurants.service';
import { HttpModule } from '@angular/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from './orders/orders.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmsinfoComponent } from './smsinfo/smsinfo.component';
const appRoutes: Routes = [
    { path: 'foodapplication/foodworld/UI/admin/Restaurants', component: RestaurantsComponent },
    { path: 'foodapplication/foodworld/UI/admin/Orders', component: OrdersComponent },
    { path: 'foodapplication/foodworld/UI/admin/Users', component: UsersComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule( {
    declarations: [
        AppComponent,
        RestaurantsComponent,
        PageNotFoundComponent,
        OrdersComponent,
        UsersComponent,
        SmsinfoComponent,
    ],
    imports: [
        BrowserModule, HttpModule, FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot( appRoutes )
    ],
    providers: [RestaurantsService, OrdersService, UsersService],
    bootstrap: [AppComponent]
} )
export class AppModule { }
