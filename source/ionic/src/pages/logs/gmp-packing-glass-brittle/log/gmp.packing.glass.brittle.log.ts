import { Component, Input, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureArea, CaptureItem } from '../interfaces/gmp.packing.glass.brittle.capture.interface'
import { Log, LogItem } from '../interfaces/gmp.packing.glass.brittle.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LogHeaderData, LogDetails } from '../../log.interfaces'
import { LogService } from '../../../../services/app.logs'

@Component({
    selector: 'gmp-packing-glass-brittle-log',
    templateUrl: './gmp.packing.glass.brittle.log.html'
})

export class GMPPackingGlassBrittleLogComponent implements OnInit {
    @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, quantity: null }] }] }
    @Language() lang: string
    logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }

    public gmpPackingGlassBrittleForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder,
        private timeService: DateTimeService,
        private translationService: TranslationService,
        private toasts: ToastService,
        private navParams: NavParams,
        public logService: LogService) {

    }

    ngOnInit() {
        this.log = this.navParams.get('data')
        // Llenamos los datos del encabezado que saldrá desplegado en la tarjeta; los datos de fecha y
        // elaborador son llenados automáticamente por el componente de encabezado
        this.logHeaderData.zone_name = this.log.zone_name
        this.logHeaderData.program_name = this.log.program_name
        this.logHeaderData.module_name = this.log.module_name

        this.initForm()
    }

    initForm() {
        this.gmpPackingGlassBrittleForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            time: [this.timeService.getISOTime(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingGlassBrittleForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas) {
            console.log("area of log")
            let itemControl = []
            for (let item of area.items) {
                console.log("item of area")
                itemControl.push(this.initItem({ id: item.id, is_acceptable: null }))
            }
            control.push(this.initArea({ id: area.id, items: itemControl }))
        }
    }

    resetForm() {
        let areas = []
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas) {
            let items = []
            for (let item of area.items) {
                items.push({ id: item.id, is_acceptable: null })
            }
            areas.push({ id: area.id, items: items })
        }
        this.gmpPackingGlassBrittleForm.reset({
            date: this.timeService.getISODate(new Date()),
            time: currentTime,
            notes: '',
            areas: areas
        })
    }

    initArea(area: CaptureArea) {
        return this._fb.group({
            id: [area.id, [Validators.required]],
            items: this._fb.array(area.items)
        })
    }

    initItem(item: CaptureItem) {
        return this._fb.group({
            id: [item.id, [Validators.required]],
            is_acceptable: [item.is_acceptable, [Validators.required]]
        })
    }

    save() {
        if (this.gmpPackingGlassBrittleForm.valid) {
            let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
            this.logService.send(this.gmpPackingGlassBrittleForm.value, 'capture-gmp-packing-glass-brittle', logDetails).then(success => {
                // Una vez que la promesa fue cumplida, reiniciamos el formulario
                this.resetForm()
            })
        } else {
            this.toasts.showText("incompleteLog")
        }
    }
}