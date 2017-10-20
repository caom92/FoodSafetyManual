import { Component, Input, NgModule, OnInit } from '@angular/core'

import { FormGroup } from '@angular/forms'

import { Language } from 'angular-l10n'

import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

import { LogArea, CorrectiveAction } from '../interfaces/gap.packing.preop.log.interface'

@Component({
    selector: 'gap-packing-preop-area',
    templateUrl: './gap.packing.preop.area.html',
    providers: [
        TranslationService,
        ToastService
    ]
})

export class GAPPackingPreopAreaComponent implements OnInit {
    @Input()
    area: LogArea

    @Input()
    actions: Array<CorrectiveAction>

    @Input('group')
    public areaForm: FormGroup

    @Language() 
    lang: string

    ngOnInit(){

    }
}