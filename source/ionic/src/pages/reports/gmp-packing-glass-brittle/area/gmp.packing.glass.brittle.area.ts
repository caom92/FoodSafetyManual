import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportArea } from '../interfaces/gmp.packing.glass.brittle.report.interface'

@Component({
    selector: '[gmp-packing-glass-brittle-report-area]',
    templateUrl: './gmp.packing.glass.brittle.area.html'
})

export class GMPPackingGlassBrittleReportAreaComponent implements OnInit {
    @Input()
    area: ReportArea = {
        id: null,
        name: null,
        items: []
    }

    @Input()
    time: string = ""

    @Language()
    lang: string

    rowspan: number = 0

    constructor() {

    }

    ngOnInit() {
        this.calculateRowspan()
    }

    calculateRowspan() {
        this.rowspan = this.area.items.length
        this.rowspan = this.rowspan + 1
    }
}