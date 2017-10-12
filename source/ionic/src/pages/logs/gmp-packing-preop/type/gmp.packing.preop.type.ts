import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'gmp-packing-preop-type',
    templateUrl: './gmp.packing.preop.type.html'
})

export class GMPPackingPreopTypeComponent {
    @Input()
    type: {id: number, name: string, items: Array<{id: number, name: string, order: number}>}

    @Input()
    actions: Array<{name: string, en: string, es: string}>

    @Input('itemGroup')
    public itemForm: FormGroup

    @Language()
    lang: string
}