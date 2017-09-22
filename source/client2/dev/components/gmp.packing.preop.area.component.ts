import { Component, Input, NgModule } from '@angular/core'
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
    public areaForm: FormGroup;
}