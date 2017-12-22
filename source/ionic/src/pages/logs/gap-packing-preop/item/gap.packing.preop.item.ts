import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

import { LogItem, CorrectiveAction } from '../interfaces/gap.packing.preop.log.interface'

@Component({
    selector: 'gap-packing-preop-item',
    templateUrl: './gap.packing.preop.item.html'
})

export class GAPPackingPreopItemComponent {
    @Input() item: LogItem
    @Input() actions: Array<CorrectiveAction>
    @Input('itemGroup') public itemForm: FormGroup
    @Language() lang: string

    constructor() {
        
    }

    is_acceptable: string = null
    is_true_checked: boolean = false

    visibleAction: boolean = false
    visibleComment: boolean = false

    acceptable(): void {
        this.visibleAction = false
        this.visibleComment = false
        console.log(this.itemForm)
        console.log(this.itemForm.value)
    }

    unacceptable(): void {
        this.visibleAction = true
        this.visibleComment = true
        console.log(this.itemForm)
        console.log(this.itemForm.value)
    }
}