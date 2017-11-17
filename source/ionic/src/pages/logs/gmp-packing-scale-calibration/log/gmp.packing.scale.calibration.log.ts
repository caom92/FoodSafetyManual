import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { DatePipe } from '@angular/common';

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureType, CaptureItem } from '../interfaces/gmp.packing.scale.calibration.capture.interface'
import { Log, LogItem, LogType, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-scale-calibration-log',
    templateUrl: './gmp.packing.scale.calibration.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GMPPackingScaleCalibrationLogComponent implements OnInit {
    @Input()
    log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, types: { units: [{ id: null, symbol: null }], scales: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] } }

    @Language()
    lang: string

    public gmpPackingScaleCalibrationForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams, private storage: Storage, private events: Events) {
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit() {
        this.gmpPackingScaleCalibrationForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            corrective_action: ['', [Validators.required, Validators.minLength(1)]],
            types: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingScaleCalibrationForm.controls['types'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let type of this.log.types.scales) {
            let itemControl = []
            for (let item of type.items) {
                itemControl.push(this.initItem({ id: item.id, test: null, unit_id: null, status: null, is_sanitized: false }))
            }
            control.push(this.initType({ id: type.id, time: currentTime, items: itemControl }))
        }
    }

    ngOnChanges() {
        this.ngOnInit()
    }

    initType(type: CaptureType) {
        return this._fb.group({
            id: [type.id, [Validators.required]],
            time: [type.time, [Validators.required]],
            items: this._fb.array(type.items)
        })
    }

    initItem(item: CaptureItem) {
        return this._fb.group({
            id: [item.id, [Validators.required]],
            test: [item.test, [Validators.required]],
            unit_id: [item.unit_id, [Validators.required]],
            status: [item.status, [Validators.required]],
            is_sanitized: [item.is_sanitized, []]
        })
    }

    save(model: CaptureLog) {
        if (this.gmpPackingScaleCalibrationForm.valid) {
            let form_data = new FormData()
            let filled_log = this.gmpPackingScaleCalibrationForm.value

            let flatObj = this.flatten(filled_log)

            for (let key in flatObj) {
                let tempKey = key + "]"
                tempKey = tempKey.replace(']', '')
                if (flatObj[key] == true) {
                    form_data.append(tempKey, "1")
                } else if (flatObj[key] == false) {
                    form_data.append(tempKey, "0")
                } else {
                    form_data.append(tempKey, flatObj[key])
                }
            }

            this.server.update(
                'capture-gmp-packing-scale-calibration',
                form_data,
                (response: any) => {
                    this.toasts.showText("capturedLog")
                    console.log(response)
                    console.log(JSON.stringify(response))
                }, (error: any, caught: Observable<void>) => {
                    this.toasts.showText("failedLogToQueue")
                    this.storage.get("pendingLogQueue").then((val) => {
                        console.log("Pending queue: ")
                        console.log(val)
                        let pendingLog: { service: string, log: any } = { service: null, log: null }
                        pendingLog.service = 'capture-gmp-packing-scale-calibration'
                        pendingLog.log = filled_log
                        this.storage.get("user_id").then((user_id) => {
                            if (val == null || val == undefined) {
                                let temp = {}
                                temp[user_id] = [pendingLog]
                                this.storage.set("pendingLogQueue", temp)
                                this.events.publish("pendingLog:total", 1)
                            } else {
                                if (Array.isArray(val[user_id])) {
                                    val[user_id].push(pendingLog)
                                    this.events.publish("pendingLog:total", val[user_id].length)
                                    this.storage.set("pendingLogQueue", val)
                                } else {
                                    val[user_id] = [pendingLog]
                                    this.storage.set("pendingLogQueue", val)
                                    this.events.publish("pendingLog:total", 1)
                                }
                            }
                        })
                    })
                    return []
                }
            )
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