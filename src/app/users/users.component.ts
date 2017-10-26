import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { AppSettings } from '../app-settings';

@Component( {
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
} )
export class UsersComponent implements OnInit {
    response: any;
    constructor( private UsersService: UsersService ) { }

    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.UsersService.getallUsers( AppSettings.API_ENDPOINT + 'users/admin/all' ).subscribe(
            data => {
                this.response = data;
                console.log( JSON.stringify( this.response ) );
            } );
    }
    deleteUser( id: string ) {
        this.UsersService.deleteUser( AppSettings.API_ENDPOINT + 'users/admin/' + id ).subscribe(
            data => {
                if ( 'User Not deleted' === data.msg ) {
                    alert( 'User Not deleted' );
                }
                if ( 'Deleted Successfully' === data.msg ) {
                    alert( 'User deleted successfully' );
                    this.getUsers();
                }
                console.log( JSON.stringify( data ) );
            } );
    }
}
