import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

@Component({
    selector: 'gmp-packing-thermo-calibration-report',
    templateUrl: './gmp.packing.thermo.calibration.report.html'
})

export class GMPPackingThermoCalibrationReportComponent {
    @Input()
    report: Report

    @Language()
    lang: string

    constructor() {
        
    }
}