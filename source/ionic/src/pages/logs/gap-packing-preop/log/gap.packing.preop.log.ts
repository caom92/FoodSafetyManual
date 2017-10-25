import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureArea, CaptureItem } from '../interfaces/gap.packing.preop.capture.interface'
import { Log } from '../interfaces/gap.packing.preop.log.interface'
//import { LogHeaderComponent } from '../components/app.log.header'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gap-packing-preop-log',
    templateUrl: './gap.packing.preop.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GAPPackingPreopLogComponent implements OnInit {
    @Input()
    log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] }] } }

    @Language() 
    lang: string

    public gapPackingPreopForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams){
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit(){
        console.log(this.log)
        this.gapPackingPreopForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gapPackingPreopForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        //console.log(this.log.areas.logs)
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for(let type of area.types){
                for(let item of type.items){
                    itemControl.push(this.initItem({id:item.id,is_acceptable:true,corrective_action:1,comment:""}))
                }
            }
            control.push(this.initArea({id:area.id,time:currentTime,notes:"",person_performing_sanitation:"",items:itemControl}))
        }
        console.log(this.gapPackingPreopForm)
    }

    ngOnChanges(){
        console.log(this.log)
        this.gapPackingPreopForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gapPackingPreopForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for(let type of area.types){
                for(let item of type.items){
                    itemControl.push(this.initItem({id:item.id,is_acceptable:null,corrective_action:1,comment:""}))
                }
            }
            control.push(this.initArea({id:area.id,time:currentTime,notes:"",person_performing_sanitation:"",items:itemControl}))
        }
    }

    resetedLog(){
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
            for(let type of area.types){
                for(let item of type.items){
                    itemControl.push(this.initItem({id:item.id,is_acceptable:null,corrective_action:1,comment:""}))
                }
            }
            control.push(this.initArea({id:area.id,time:currentTime,notes:"",person_performing_sanitation:"",items:itemControl}))
        }

        return resetedLog
    }

    initArea(area: CaptureArea){
        return this._fb.group({
            id:[area.id, [Validators.required]],
            time:[area.time, [Validators.required, Validators.minLength(1)]],
            notes: [area.notes, [Validators.required, Validators.minLength(1)]],
            person_performing_sanitation: [area.person_performing_sanitation, [Validators.required, Validators.minLength(1)]],
            items: this._fb.array(area.items)
        })
    }

    initItem(item: CaptureItem){
        return this._fb.group({
            id:[item.id, [Validators.required]],
            is_acceptable:[item.is_acceptable, [Validators.required]],
            corrective_action_id: [item.corrective_action],
            comment: [item.comment]
        })
    }

    save(model: CaptureLog){
        if(this.gapPackingPreopForm.valid){
            this.gapPackingPreopForm.reset()
            this.toasts.showText("capturedLog")
            console.log("Log is valid")
            console.log(this.gapPackingPreopForm.value)
            let form_data = new FormData()
            let filled_log = this.gapPackingPreopForm.value
            
            let flatObj = this.flatten(filled_log)

            for ( let key in flatObj ) {
                let tempKey = key + "]"
                tempKey = tempKey.replace(']', '')
                form_data.append(tempKey, flatObj[key]);
            }

            console.log(filled_log)
            console.log(flatObj)
    
            this.server.update(
                'capture-gap-packing-preop',
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