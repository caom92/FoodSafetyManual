import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gmp-packing-preop-item',
    templateUrl: '../templates/gmp.packing.preop.item.component.html'
})

export class GMPPackingPreopItemComponent {
    @Input()
    item: {
        id: number,
        name: string,
        order: number
    }

    @Input()
    actions: Array<{
        name: string
    }>

    @Input('itemGroup')
    public itemForm: FormGroup;

    lang: string = localStorage.lang

    is_acceptable: string = null
    is_true_checked: boolean = false

    visibleAction: boolean = false
    visibleComment: boolean = false

    acceptable(): void {
        this.visibleAction = false
        this.visibleComment = false
    }

    unacceptable(): void {
        this.visibleAction = true
        this.visibleComment = true
    }
}