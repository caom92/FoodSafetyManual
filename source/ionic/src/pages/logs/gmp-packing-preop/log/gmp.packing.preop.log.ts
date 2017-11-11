import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CapturedLog, Area, Item } from '../gmp.packing.preop.interface'
import { LogHeaderComponent } from '../../log-header/log.header'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-preop-log',
    templateUrl: './gmp.packing.preop.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GMPPackingPreopLogComponent implements OnInit {
    @Input()
    log: {
        zone_name: string,
        program_name: string,
        module_name: string,
        log_name: string,
        html_footer: string,
        areas: {
            corrective_actions: Array<{
                id: number,
                code: string,
                en: string,
                es: string
            }>
            logs: Array<{
                id: number,
                name: string,
                types: Array<{
                    id: number,
                    name: string,
                    items: Array<{
                        id: number,
                        name: string,
                        order: number
                    }>
                }>
            }>
        }
    } = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] }] } }

    logHeaderData: {zone_name: string, program_name: string, module_name: string, date: string, created_by: string} = {
        zone_name: null,
        program_name: null,
        module_name: null,
        date: null,
        created_by: null
    }

    @Language()
    lang: string

    public gmpPackingPreopForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams) {
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit() {
        console.log(this.log)
        this.gmpPackingPreopForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingPreopForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        //console.log(this.log.areas.logs)
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for (let type of area.types) {
                for (let item of type.items) {
                    itemControl.push(this.initItem({ id: item.id, is_acceptable: true, corrective_action: 1, comment: "" }))
                }
            }
            control.push(this.initArea({ id: area.id, time: currentTime, notes: "", person_performing_sanitation: "", items: itemControl }))
        }
        console.log(this.gmpPackingPreopForm)
    }

    ngOnChanges() {
        console.log(this.log)
        this.gmpPackingPreopForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingPreopForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for (let type of area.types) {
                for (let item of type.items) {
                    itemControl.push(this.initItem({ id: item.id, is_acceptable: null, corrective_action: 1, comment: "" }))
                }
            }
            control.push(this.initArea({ id: area.id, time: currentTime, notes: "", person_performing_sanitation: "", items: itemControl }))
        }
    }

    resetedLog() {
        let resetedLog

        resetedLog = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>resetedLog.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for (let type of area.types) {
                for (let item of type.items) {
                    itemControl.push(this.initItem({ id: item.id, is_acceptable: null, corrective_action: 1, comment: "" }))
                }
            }
            control.push(this.initArea({ id: area.id, time: currentTime, notes: "", person_performing_sanitation: "", items: itemControl }))
        }

        return resetedLog
    }

    initArea(area: Area) {
        return this._fb.group({
            id: [area.id, [Validators.required]],
            time: [area.time, [Validators.required, Validators.minLength(1)]],
            notes: [area.notes, [Validators.required, Validators.minLength(1)]],
            person_performing_sanitation: [area.person_performing_sanitation, [Validators.required, Validators.minLength(1)]],
            items: this._fb.array(area.items)
        })
    }

    initItem(item: Item) {
        return this._fb.group({
            id: [item.id, [Validators.required]],
            is_acceptable: [item.is_acceptable, [Validators.required]],
            corrective_action_id: [item.corrective_action],
            comment: [item.comment]
        })
    }

    save(model: CapturedLog) {
        console.log(this.gmpPackingPreopForm.value)
        if (this.gmpPackingPreopForm.valid) {
            //this.gmpPackingPreopForm.reset()
            this.toasts.showText("capturedLog")
            console.log("Log is valid")
            console.log(this.gmpPackingPreopForm.value)
            let form_data = new FormData()
            let filled_log = this.gmpPackingPreopForm.value

            let flatObj = this.flatten(filled_log)

            for (let key in flatObj) {
                let tempKey = key + "]"
                tempKey = tempKey.replace(']', '')
                form_data.append(tempKey, flatObj[key]);
            }

            console.log(filled_log)
            console.log(flatObj)

            this.server.update(
                'capture-gmp-packing-preop',
                form_data,
                (response: any) => {
                    console.log(response)
                    console.log(JSON.stringify(response))
                } // (response: any)
            ) // this.server.update
        } else {
            this.toasts.showText("incompleteLog")
        }
    }

    flatten(data) {
        var result = {}

        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop + "][" + i + "][")
                if (l == 0) result[prop] = []
            } else {
                var isEmpty = true
                for (var p in cur) {
                    isEmpty = false
                    recurse(cur[p], prop ? prop + p : p)
                }
                if (isEmpty && prop) result[prop] = {}
            }
        }

        recurse(data, "")
        return result
    }
}