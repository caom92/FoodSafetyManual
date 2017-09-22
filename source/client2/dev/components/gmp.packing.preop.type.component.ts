import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gmp-packing-preop-type',
    templateUrl: '../templates/gmp.packing.preop.type.component.html'
})

export class GMPPackingPreopTypeComponent {
    @Input()
    type: {id: number, name: string, items: Array<{id: number, name: string, order: number}>}

    @Input()
    actions: Array<{name: string}>

    @Input('itemGroup')
    public itemForm: FormGroup;
}