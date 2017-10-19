import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureItem } from '../interfaces/gmp.packing.hand.washing.capture.interface'
import { Log, LogItem } from '../interfaces/gmp.packing.hand.washing.log.interface'
//import { LogHeaderComponent } from '../components/app.log.header'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-hand-washing-log',
    templateUrl: './gmp.packing.hand.washing.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GMPPackingHandWashingLogComponent implements OnInit {
    @Input()
    log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{id: null, name: null}] }

    @Language()
    lang: string

    public gmpPackingHandWashingForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams){
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit(){
        this.gmpPackingHandWashingForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            items: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingHandWashingForm.controls['items'];
        for (let item of this.log.items) {
            control.push(this.initItem({id:item.id,is_acceptable:false}))
        }
    }

    ngOnChanges(){
        this.gmpPackingHandWashingForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            items: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingHandWashingForm.controls['items'];
        for (let item of this.log.items) {
            let itemControl = []
            itemControl.push(this.initItem({id:item.id,is_acceptable:false}))
        }
    }

    resetedLog(){
        /*let resetedLog

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

        return resetedLog*/
    }

    initItem(item: CaptureItem){
        return this._fb.group({
            id:[item.id, [Validators.required]],
            is_acceptable:[item.is_acceptable, [Validators.required]]
        })
    }

    save(model: CaptureLog){
        if(this.gmpPackingHandWashingForm.valid){
            //this.gmpPackingHandWashingForm.reset()
            console.log(this.gmpPackingHandWashingForm.value)
            this.toasts.showText("capturedLog")
            //console.log("Log is valid")
            //console.log(this.gmpPackingHandWashingForm.value)
            let form_data = new FormData()
            let filled_log = this.gmpPackingHandWashingForm.value
            
            let flatObj = this.flatten(filled_log)

            for ( let key in flatObj ) {
                let tempKey = key + "]"
                tempKey = tempKey.replace(']', '')
                if(flatObj[key] == true){
                    form_data.append(tempKey, "1")
                } else if(flatObj[key] == false){
                    form_data.append(tempKey, "0")
                } else {
                    form_data.append(tempKey, flatObj[key])
                }
            }

            console.log(filled_log)
            console.log(flatObj)
    
            this.server.update(
                'capture-gmp-packing-hand-washing',
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