import { Component, Input, NgModule } from '@angular/core'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

import { LogItem } from '../interfaces/gmp.packing.scissors.knives.log.interface'

@Component({
    selector: 'gmp-packing-scissors-knives-item',
    templateUrl: './gmp.packing.scissors.knives.item.html'
})

export class GMPPackingScissorsKnivesItemComponent {
    @Input()
    item: LogItem

    @Input('itemGroup')
    public itemForm: FormGroup

    @Language()
    lang: string

    constructor(private storage: Storage) {
        
    }
}