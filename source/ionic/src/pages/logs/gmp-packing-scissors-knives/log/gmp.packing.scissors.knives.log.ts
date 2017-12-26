import { Component, Input, OnInit } from '@angular/core'
import { NavParams } from 'ionic-angular'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { CaptureLog, CaptureItem } from '../interfaces/gmp.packing.scissors.knives.capture.interface'
import { Log, LogItem } from '../interfaces/gmp.packing.scissors.knives.log.interface'
//import { LogHeaderComponent } from '../components/app.log.header'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

@Component({
    selector: 'gmp-packing-scissors-knives-log',
    templateUrl: './gmp.packing.scissors.knives.log.html',
    providers: [
        BackendService,
        TranslationService,
        ToastService
    ]
})

export class GMPPackingScissorsKnivesLogComponent implements OnInit {
    @Input()
    log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{id: null, name: null, quantity: null}] }

    @Language()
    lang: string

    public gmpPackingScissorsKnivesForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams){
        this.log = navParams.get('data');
        console.log(this.log)
    }

    ngOnInit(){
        this.gmpPackingScissorsKnivesForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            items: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingScissorsKnivesForm.controls['items'];
        let currentTime = this.timeService.getISOTime(new Date())
        for (let item of this.log.items) {
            control.push(this.initItem({id:item.id,time:currentTime,approved:false,condition:false,is_sanitized:false,corrective_action:""}))
        }
    }

    ngOnChanges(){
        this.ngOnInit()
    }

    initItem(item: CaptureItem){
        return this._fb.group({
            id:[item.id, [Validators.required]],
            time:[item.time, [Validators.required]],
            approved:[item.approved],
            condition:[item.condition],
            is_sanitized:[item.is_sanitized],
            corrective_action:[item.corrective_action]
        })
    }

    save(model: CaptureLog){
        if(this.gmpPackingScissorsKnivesForm.valid){
            this.toasts.showText("capturedLog")
            let form_data = new FormData()
            let filled_log = this.gmpPackingScissorsKnivesForm.value
            
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

            console.log(this.gmpPackingScissorsKnivesForm.value)
            console.log(flatObj)
    
            this.server.update(
                'capture-gmp-packing-scissors-knives',
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