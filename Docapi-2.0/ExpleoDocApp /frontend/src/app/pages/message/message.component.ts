import {Component, Inject, Injectable} from  '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


@Component({
templateUrl:  'message.component.html'
})
export  class  MessageComponent {
    constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }


}
