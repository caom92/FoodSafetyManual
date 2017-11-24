import { Component, Input } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

import { GMPPackingThermoCalibrationReportLoader } from '../loader/gmp.packing.thermo.calibration.report.loader'

@Component({
    selector: 'gmp-packing-thermo-calibration-report-displayer',
    templateUrl: './gmp.packing.thermo.calibration.report.displayer.html'
})

export class GMPPackingThermoCalibrationReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}