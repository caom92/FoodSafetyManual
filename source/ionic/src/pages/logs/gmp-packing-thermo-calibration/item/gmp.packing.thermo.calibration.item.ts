import { Component, Input, NgModule } from '@angular/core'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

import { LogItem } from '../interfaces/gmp.packing.thermo.calibration.log.interface'

@Component({
    selector: 'gmp-packing-thermo-calibration-item',
    templateUrl: './gmp.packing.thermo.calibration.item.html'
})

export class GMPPackingThermoCalibrationItemComponent {
    @Input()
    item: LogItem

    @Input('itemGroup')
    public itemForm: FormGroup

    @Language()
    lang: string

    constructor(private storage: Storage) {
        
    }
}