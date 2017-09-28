import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gmp-packing-preop-area',
    templateUrl: '../templates/gmp.packing.preop.area.component.html'
})

export class GMPPackingPreopAreaComponent {
    @Input()
    area: {id: number, name: string, types: Array<{id: number, name: string, items: Array<{id: number, name: string, order: number}>}>}

    @Input()
    actions: Array<{name: string}>

    @Input('group')
    public areaForm: FormGroup

    ngOnInit(){
        $('.timepicker').pickatime({
            /*default: 0,
            fromnow: 0,
            twelvehour: false,
            donetext: 'OK',
            cleartext: 'Clear',
            canceltext: 'Cancel',
            autoclose: false,
            ampmclickable: true,
            aftershow: function(){}*/
        });
    }
}