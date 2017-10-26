import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { AppSettings } from '../app-settings';

@Component( {
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
} )
export class OrdersComponent implements OnInit {
    response: string;
    updateresponse: string;
    userinfo: any;
    orderItems: any;
    constructor( private OrdersService: OrdersService ) {
    }

    ngOnInit() {
        this.getTodaysOrders();
    }

    getOrders() {
        this.OrdersService.getallOrders( AppSettings.API_ENDPOINT + 'order/admin/all' ).subscribe(
            data => {
                this.response = data;
                console.log( JSON.stringify( this.response ) );
            } );
    }
    getTodaysOrders() {
        this.OrdersService.getallOrders( AppSettings.API_ENDPOINT + 'order/admin/todayOrders' ).subscribe(
            data => {
                this.response = data;
                console.log( JSON.stringify( this.response ) );
            } );
    }
    getOneWeekOrders() {
        this.OrdersService.getallOrders( AppSettings.API_ENDPOINT + 'order/admin/oneWeekOrders' ).subscribe(
            data => {
                this.response = data;
                console.log( JSON.stringify( this.response ) );
            } );
    }
    chngeOrderStatus( id: string, status: string ) {
        console.log( status );
        this.OrdersService.updateOrderStatus( AppSettings.API_ENDPOINT + 'order/admin/' + id + '/' + status ).subscribe(
            data => {
                this.updateresponse = data;
                console.log( JSON.stringify( this.updateresponse ) );
                if ( data.msg === 'Not Updated' || data.msg === 'Internal Server Issue' ) {
                    alert( 'Status not updated' );
                    return false;
                }
                if ( data.msg === 'Updated Successfully' ) {
                    alert( 'Status updated successfully' );
                    this.getOrders();
                    return true;
                }
            } );
    }
}
