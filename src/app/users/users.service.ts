import { Injectable, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../app-settings';

@Injectable()
export class UsersService {
    headers: Headers;
options: RequestOptions;
response: string;
data: {};
constructor( public http: Http ) {
    console.log( 'App Services Provider' );
    this.headers = new Headers();
    this.headers.append( 'Authorization', 'Basic xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' );
    this.headers.append( 'Content-Type', 'application/json' );
    this.options = new RequestOptions( { headers: this.headers, withCredentials: true } );
}
  getallUsers( url: string ) {
      return this.http.get( url, this.options )
          .map( data => {
              console.log( 'I CAN SEE DATA HERE: ' + data.json() );
              return data.json();
          } ).catch(data => {
              console.log( 'I CAN SEE DATA ERROR HERE: ' + data._body );
              return data._body;
          });
  }
  deleteUser( url: string ) {
      return this.http.delete( url, this.options )
          .map( data => {
              console.log( 'I CAN SEE DATA HERE: ' + data.json() );
              return data.json();
          } ).catch(data => {
              console.log( 'I CAN SEE DATA ERROR HERE: ' + data._body );
              return data._body;
          });
  }
}
