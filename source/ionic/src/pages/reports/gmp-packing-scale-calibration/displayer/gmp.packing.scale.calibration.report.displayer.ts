import { Component, Input } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.scale.calibration.report.interface'

import { GMPPackingScaleCalibrationReportLoader } from '../loader/gmp.packing.scale.calibration.report.loader'

@Component({
    selector: 'gmp-packing-scale-calibration-report-displayer',
    templateUrl: './gmp.packing.scale.calibration.report.displayer.html'
})

export class GMPPackingScaleCalibrationReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}