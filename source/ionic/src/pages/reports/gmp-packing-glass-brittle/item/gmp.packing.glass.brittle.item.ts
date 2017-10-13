import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.glass.brittle.report.interface'

@Component({
    selector: '[gmp-packing-glass-brittle-report-item]',
    templateUrl: './gmp.packing.glass.brittle.item.html'
})

export class GMPPackingGlassBrittleReportItemComponent {
    @Input()
    item: ReportItem

    @Language()
    lang: string

    constructor() {
        
    }
}