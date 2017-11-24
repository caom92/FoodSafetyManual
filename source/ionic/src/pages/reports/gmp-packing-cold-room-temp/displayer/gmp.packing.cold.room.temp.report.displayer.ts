import { Component, Input } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

import { GMPPackingColdRoomTempReportLoader } from '../loader/gmp.packing.cold.room.temp.report.loader'

@Component({
    selector: 'gmp-packing-cold-room-temp-report-displayer',
    templateUrl: './gmp.packing.cold.room.temp.report.displayer.html'
})

export class GMPPackingColdRoomTempReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}