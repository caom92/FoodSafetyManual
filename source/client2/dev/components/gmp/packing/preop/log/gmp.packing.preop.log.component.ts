import { Component, Input, NgModule, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { Report, Area, Item } from '../../../../../interfaces/gmp.packing.preop.interface'
import { LogHeaderComponent } from '../../../../../components/app.log.header'

import { DateTimeService } from '../../../../../services/app.time'
import { BackendService } from '../../../../../services/app.backend'

@Component({
    selector: 'gmp-packing-preop-log',
    templateUrl: '../../../../../templates/gmp.packing.preop.log.component.html'
})

export class GMPPackingPreopLogComponent {
    @Input()
    log:{
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
    }

    public gmpPackingPreopForm: FormGroup = new FormBuilder().group({})

    constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService,){

    }

    ngOnChanges(){
        this.gmpPackingPreopForm = this._fb.group({
            date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
            notes: ['', [Validators.required, Validators.minLength(1)]],
            album_url: ['', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingPreopForm.controls['areas']
        let currentTime = this.timeService.getISOTime(new Date())
        for (let area of this.log.areas.logs) {
            let itemControl = []
            for(let type of area.types){
                for(let item of type.items){
                    itemControl.push(this.initItem({id:item.id,is_acceptable:true,corrective_action:1,comment:""}))
                }
            }
            control.push(this.initArea({id:area.id,time:currentTime,notes:"",person_performing_sanitation:"",items:itemControl}))
        }
    }

    initArea(area: Area){
        return this._fb.group({
            id:[area.id, [Validators.required]],
            time:[area.time, [Validators.required, Validators.minLength(1)]],
            notes: [area.notes, [Validators.required, Validators.minLength(1)]],
            person_performing_sanitation: [area.person_performing_sanitation, [Validators.required, Validators.minLength(1)]],
            items: this._fb.array(area.items)
        })
    }

    initItem(item: Item){
        return this._fb.group({
            id:[item.id, [Validators.required]],
            is_acceptable:[item.is_acceptable, [Validators.required]],
            corrective_action_id: [item.corrective_action],
            comment: [item.comment]
        })
    }

    save(model: Report){
        console.log(this.gmpPackingPreopForm)
        console.log(this.gmpPackingPreopForm.valid)
        console.log(this.gmpPackingPreopForm.value)
        if(this.gmpPackingPreopForm.valid){
            let form_data = new FormData();
            
            let flatObj = this.flatten(this.gmpPackingPreopForm.value)

            for ( let key in flatObj ) {
                let tempKey = key + "]"
                tempKey = tempKey.replace(']', '')
                form_data.append(tempKey, flatObj[key]);
            }

            console.log(flatObj)
    
            /*this.server.update(
                'capture-gmp-packing-preop',
                form_data,
                (response: any) => {
                  console.log(response)
                  console.log(JSON.stringify(response))
                } // (response: Response)
            ) // this.server.update*/
        } else {
            console.log("Log is not valid")
        }
    }

    flatten(data) {
        var result = {};
    
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop + "][" + i + "][");
                if (l == 0) result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + p : p);
                }
                if (isEmpty && prop) result[prop] = {};
            }
        }
        
        recurse(data, "");
        return result;
    };
}