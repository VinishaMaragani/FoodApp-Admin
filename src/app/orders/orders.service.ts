import { Injectable, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../app-settings';

@Injectable()
export class OrdersService {
    headers: Headers;
        options: RequestOptions;
        response: string;
        data: {};
        constructor( public http: Http ) {
            console.log( 'App Services Provider' );
            this.headers = new Headers();
            this.headers.append( 'Authorization', 'Basic xxxxxxxxxxxxxxxxxxxxxxxxx' );
            this.headers.append( 'Content-Type', 'application/json' );
            this.options = new RequestOptions( { headers: this.headers, withCredentials: true } );
        }

      getallOrders( url: string ) {
          return this.http.get( url, this.options )
              .map( data => {
                  console.log( 'I CAN SEE DATA HERE: ' + data.json() );
                  return data.json();
              } ).catch(data => {
                  console.log( 'I CAN SEE DATA ERROR HERE: ' + data._body );
                  return data._body;
              });
      }
      updateOrderStatus( url: string ) {
          return this.http.put( url, this.data, this.options )
              .map( data => {
                  console.log( 'I CAN SEE DATA HERE: ' + data.json() );
                  return data.json();
              } ).catch(data => {
                  console.log( 'I CAN SEE DATA ERROR HERE: ' + data._body );
                  return data._body;
              });
      }
      getsmsCount( url: string ) {
          return this.http.get( url, this.options )
              .map( data => {
                  console.log( 'I CAN SEE DATA HERE: ' + data.json() );
                  return data.json();
              } ).catch(data => {
                  console.log( 'I CAN SEE DATA ERROR HERE: ' + data._body );
                  return data._body;
              });
      }
}
