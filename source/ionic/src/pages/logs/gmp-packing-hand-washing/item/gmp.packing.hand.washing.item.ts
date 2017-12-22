import { Component, Input, NgModule } from '@angular/core'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

import { LogItem } from '../interfaces/gmp.packing.hand.washing.log.interface'

@Component({
    selector: 'gmp-packing-hand-washing-item',
    templateUrl: './gmp.packing.hand.washing.item.html'
})

export class GMPPackingHandWashingItemComponent {
    @Input()
    item: LogItem

    @Input('itemGroup')
    public itemForm: FormGroup

    @Language()
    lang: string

    constructor(private storage: Storage) {
        
    }
}