import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders/orders.service';
import { AppSettings } from '../app-settings';

@Component( {
    selector: 'app-smsinfo',
    templateUrl: './smsinfo.component.html',
    styleUrls: ['./smsinfo.component.css']
} )
export class SmsinfoComponent implements OnInit {
    smscount: string;
    constructor( private OrdersService: OrdersService ) { }

    ngOnInit() {
    }
    getsmsCount() {
        this.OrdersService.getallOrders( AppSettings.API_ENDPOINT + 'otp/admin/get/sms_balance' ).subscribe(
            data => {
                this.smscount = data;
                console.log( JSON.stringify( this.smscount ) );
            } );
    }
}
