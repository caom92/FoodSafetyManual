import { Component, Input, NgModule, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureArea, CaptureItem } from '../interfaces/gmp.packing.glass.brittle.capture.interface'
import { Log, LogItem } from '../interfaces/gmp.packing.glass.brittle.log.interface'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-glass-brittle-log',
    templateUrl: './gmp.packing.glass.brittle.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GMPPackingGlassBrittleLogComponent implements OnInit {
    @Input()
    log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{id: null, name: null, items:[{id:null, name:null, order:null,quantity:null}]}] }

    @Language()
    lang: string

    public gmpPackingGlassBrittleForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams){
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit(){
        this.gmpPackingGlassBrittleForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            time:[this.timeService.getISOTime(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingGlassBrittleForm.controls['areas'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas) {
            console.log("area of log")
            let itemControl = []
            for(let item of area.items){
                console.log("item of area")
                itemControl.push(this.initItem({id:item.id,is_acceptable:null}))
            }
            control.push(this.initArea({id:area.id,items:itemControl}))
        }
    }

    ngOnChanges(){
        this.ngOnInit()
    }

    initArea(area: CaptureArea) {
        return this._fb.group({
            id:[area.id, [Validators.required]],
            items: this._fb.array(area.items)
        })
    }

    initItem(item: CaptureItem){
        return this._fb.group({
            id:[item.id, [Validators.required]],
            is_acceptable:[item.is_acceptable, [Validators.required]]
        })
    }

    save(model: CaptureLog){
        if(this.gmpPackingGlassBrittleForm.valid){
            this.toasts.showText("capturedLog")
            let form_data = new FormData()
            let filled_log = this.gmpPackingGlassBrittleForm.value
            
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
    
            this.server.update(
                'capture-gmp-packing-glass-brittle',
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