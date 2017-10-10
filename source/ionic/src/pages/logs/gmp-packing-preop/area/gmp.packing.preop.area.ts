import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gmp-packing-preop-area',
    templateUrl: './gmp.packing.preop.area.html'
})

export class GMPPackingPreopAreaComponent implements OnInit {
    @Input()
    area: {id: number, name: string, types: Array<{id: number, name: string, items: Array<{id: number, name: string, order: number}>}>}

    @Input()
    actions: Array<{name: string, en: string, es: string}>

    @Input('group')
    public areaForm: FormGroup

    ngOnInit(){

    }
}