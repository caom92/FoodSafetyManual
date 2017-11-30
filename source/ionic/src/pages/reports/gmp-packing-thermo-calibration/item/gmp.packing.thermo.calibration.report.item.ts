import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

@Component({
    selector: '[gmp-packing-thermo-calibration-report-item]',
    templateUrl: './gmp.packing.thermo.calibration.report.item.html'
})

export class GMPPackingThermoCalibrationReportItemComponent {
    @Input()
    item: ReportItem

    @Input()
    time: string = null

    @Input()
    timeRowspan: number = null

    @Language()
    lang: string

    constructor() {

    }
}