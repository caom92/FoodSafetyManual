import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportArea } from '../gmp.packing.preop.interface'

@Component({
    selector: '[gmp-packing-preop-report-area]',
    templateUrl: './gmp.packing.preop.area.html'
})

export class GMPPackingPreopReportAreaComponent implements OnInit {
    @Input()
    area: ReportArea = {
        id: null,
        name: null,
        person_performing_sanitation: null,
        notes: null,
        time: null,
        types: []
    }

    @Language()
    lang: string

    rowspan: number = 0

    constructor() {

    }

    ngOnInit() {
        this.calculateRowspan()
    }

    calculateRowspan() {
        this.rowspan = this.area.types.length
        for(let count of this.area.types){
            this.rowspan += count.items.length
        }
        //this.rowspan = this.area.types.length
        console.log("rowspan = " + this.rowspan)
        this.rowspan += 1
    }
}