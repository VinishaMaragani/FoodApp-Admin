import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { AppSettings } from '../app-settings';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component( {
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
} )
export class RestaurantsComponent implements OnInit {
    restaurantForm: FormGroup;
    response: any;
    updateresponse: string;
    createresponse: string;
    restaurant: string;
    createrestaurant: string;
    showRestaurants: boolean;
    createRestaurants: boolean;
    restaddress: any;
    restItems: any;
    restId: string;
    loaderrests: Boolean;
    isUpdate: Boolean;
    constructor( private fb: FormBuilder, private RestaurantService: RestaurantsService ) {
    }
    ngOnInit() {
        this.showRestaurants = true;
        this.isUpdate = false;
        this.getRestaurants();
    }
    getRestaurants() {
        // this.response = undefined;
        this.RestaurantService.getallRestaurants( AppSettings.API_ENDPOINT + 'restaurant/admin/all' ).subscribe(
            data => {
                this.response = data;
                console.log( JSON.stringify( this.response ) );
                this.loaderrests = false;
            } );
    }
    UpdateRestaurantForm( item: any ) {
        this.isUpdate = true;
        this.createinit( item );
        const control = <FormArray>this.restaurantForm.controls['items'];
        control.removeAt( 0 );
        for ( let entry of item.items ) {
            control.push( this.initItem( entry ) );
        }
        this.showRestaurants = false; this.createRestaurants = true;
    }
    chngeStatus( id: string, status: number ) {
        console.log( status );
        status = ( status === 1 ) ? 0 : 1;
        console.log( status );
        this.RestaurantService.updateRestaurantStatus( AppSettings.API_ENDPOINT + 'restaurant/admin/' + id + '/' + status ).subscribe(
            data => {
                this.updateresponse = data;
                console.log( JSON.stringify( this.updateresponse ) );
                if ( data.msg === 'Not Updated' || data.msg === 'Internal Server Issue' ) {
                    alert( 'Status not updated' );
                    return false;
                }
                if ( data.msg === 'Updated Successfully' ) {
                    alert( 'Status updated successfully' );
                    this.getRestaurants();
                    return true;
                }
            } );
    }
    chngeItemStatus( id: string, status: number, restId: string ) {
        console.log( status );
        status = ( status === 1 ) ? 0 : 1;
        console.log( status );
        this.RestaurantService.updateRestaurantStatus( AppSettings.API_ENDPOINT + 'restaurant/admin/' + restId + '/' + id + '/' + status ).subscribe(
            data => {
                this.updateresponse = data;
                console.log( JSON.stringify( this.updateresponse ) );
                if ( data.msg === 'Not Updated' || data.msg === 'Internal Server Issue' ) {
                    alert( 'Status not updated' );
                    return false;
                }
                if ( data.msg === 'Updated Successfully' ) {
                    alert( 'Status updated successfully' );
                    this.getRestaurants();
                    return true;
                }
            } );
    }
    createRestaurant() {
        this.createrestaurant = this.restaurantForm.value;
        console.log( JSON.stringify( this.createrestaurant ) );
        this.RestaurantService.createRestaurant( AppSettings.API_ENDPOINT + 'restaurant/admin/', this.createrestaurant ).subscribe(
            data => {
                this.createresponse = data;
                console.log( JSON.stringify( this.createresponse ) );
                if ( data.msg === 'Not Inserted' || data.msg === 'Internal Server Issue' ) {
                    alert( 'Status not inserted' );
                }
                if ( data.msg === 'Inserted Successfully' ) {
                    alert( 'Status inserted successfully' );
                    this.revert();
                    this.createinit(undefined);
                }
            } );
    }
    updateRestaurant() {
        this.createrestaurant = this.restaurantForm.value;
        console.log( JSON.stringify( this.createrestaurant ) );
        this.RestaurantService.updateRestaurant( AppSettings.API_ENDPOINT + 'restaurant/admin/', this.createrestaurant ).subscribe(
            data => {
                this.createresponse = data;
                console.log( JSON.stringify( this.createresponse ) );
                if ( data.msg === 'Not Inserted' || data.msg === 'Internal Server Issue' ) {
                    alert( 'Status not inserted' );
                }
                if ( data.msg === 'Updated Successfully' ) {
                    alert( 'Updated successfully' );
                    this.revert();
                    this.createinit(undefined);
                    this.isUpdate = true;
                    this.getRestaurants();
                }
            } );
    }
    deleteRestaurant( id: string ) {
        this.RestaurantService.deleteRestaurant( AppSettings.API_ENDPOINT + 'restaurant/admin/' + id + '/').subscribe(
            data => {
                if ( 'Not deleted' === data.msg ) {
                    alert( 'Restaurant Not deleted' );
                }
                if ( 'Deleted Successfully' === data.msg ) {
                    alert( 'Restaurant deleted successfully' );
                }
                console.log( JSON.stringify( data ) );
                this.getRestaurants();
            } );
    }

    initItem( item: any ) {
        return new FormGroup( {
            id: new FormControl( item ? item.id : null, [Validators.required, Validators.maxLength( 95 )] ),
            itemName: new FormControl( item ? item.itemName : null, [Validators.required, Validators.maxLength( 95 )] ),
            price: new FormControl( item ? item.price : 0, [Validators.required, Validators.maxLength( 20 )] ),
            totalPrice: new FormControl( item ? item.totalPrice : 0, [Validators.required, Validators.maxLength( 500 )] ),
            discount: new FormControl( item ? item.discount : 0, [Validators.required, Validators.maxLength( 1 )] ),
            itemLogo: new FormControl( item ? item.itemLogo : null, [Validators.required, Validators.maxLength( 500 )] ),
            status: new FormControl( item ? item.status : 1 ),
            type: new FormControl( item ? item.type : null, [Validators.required, Validators.maxLength( 20 )] ),
            whichPriceShow: new FormControl( item ? item.whichPriceShow : 'totalPrice', [Validators.required, Validators.maxLength( 20 )] ),
        } );
    }
    createinit( rest: any ) {
        this.restaurantForm = new FormGroup( {
            _id: new FormControl( rest ? rest._id : null, [Validators.required, Validators.maxLength( 95 )] ),
            name: new FormControl( rest ? rest.name : null, [Validators.required, Validators.maxLength( 95 )] ),
            type: new FormControl( rest ? rest.type : null, [Validators.required, Validators.maxLength( 20 )] ),
            restLogo: new FormControl( rest ? rest.restLogo : null, [Validators.required, Validators.maxLength( 500 )] ),
            rating: new FormControl( rest ? rest.rating : 3, [Validators.required, Validators.maxLength( 1 )] ),
            status: new FormControl( rest ? rest.status : 1 ),
            dliveryCharges: new FormControl( rest ? rest.dliveryCharges : 20, [Validators.required, Validators.maxLength( 5 )] ),
            dliveryTimeInMin: new FormControl( rest ? rest.dliveryTimeInMin : 20, [Validators.required, Validators.maxLength( 3 )] ),
            address: new FormGroup( {
                street: new FormControl( rest ? rest.address.street : null, [Validators.required, Validators.maxLength( 200 )] ),
                location: new FormControl( rest ? rest.address.location : null, [Validators.required, Validators.maxLength( 200 )] ),
                city: new FormControl( rest ? rest.address.city : 'Khammam', [Validators.required, Validators.maxLength( 100 )] ),
                pin: new FormControl( rest ? rest.address.pin : 507, [Validators.required, Validators.maxLength( 6 )] ),
                state: new FormControl( rest ? rest.address.state : 'Telangana', [Validators.required, Validators.maxLength( 100 )] )
            } ),
            items: new FormArray( [this.initItem( undefined )] )
        } );
    }
    addItem() {
        const control = <FormArray>this.restaurantForm.controls['items'];
        control.push( this.initItem( undefined ) );
    }

    removeItem( i: number ) {
        const control = <FormArray>this.restaurantForm.controls['items'];
        control.removeAt( i );
    }
    revert() {
        this.restaurantForm.reset();
        this.createinit(undefined);
    }

}
