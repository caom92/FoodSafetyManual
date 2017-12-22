import { Component, Input } from '@angular/core'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

import { LogItem, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
    selector: 'gmp-packing-scale-calibration-item',
    templateUrl: './gmp.packing.scale.calibration.item.html'
})

export class GMPPackingScaleCalibrationItemComponent {
    @Input()
    item: LogItem

    @Input()
    units: Array<LogUnit>

    @Input('itemGroup')
    public itemForm: FormGroup

    @Language()
    lang: string

    constructor(private storage: Storage) {
        
    }
}