import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { FormGroup } from '@angular/forms'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-preop-area',
    templateUrl: './gmp.packing.preop.area.html',
    providers: [
        TranslationService,
        ToastService
    ]
})

export class GMPPackingPreopAreaComponent implements OnInit {
    @Input()
    area: {id: number, name: string, types: Array<{id: number, name: string, items: Array<{id: number, name: string, order: number}>}>}

    @Input()
    actions: Array<{name: string, en: string, es: string}>

    @Input('group')
    public areaForm: FormGroup

    @Language() 
    lang: string

    ngOnInit(){

    }
}