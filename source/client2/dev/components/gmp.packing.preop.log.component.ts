import { Component, Input, NgModule, OnInit } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Report, Area, Item } from '../interfaces/gmp.packing.preop.interface';

@Component({
    selector: 'gmp-packing-preop-log',
    templateUrl: '../templates/gmp.packing.preop.log.component.html'
})

export class GMPPackingPreopLogComponent {
    @Input()
    log:{
        zone_name: string,
        program_name: string,
        module_name: string,
        log_name: string,
        html_footer: string,
        areas: Array<{
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

    public gmpPackingPreopForm: FormGroup

    constructor(private _fb: FormBuilder){

    }

    ngOnInit(){
        this.gmpPackingPreopForm = this._fb.group({
            date: [new Date().getUTCDate(), [Validators.required, Validators.minLength(1)]],
            notes: ['Default Notes', [Validators.required, Validators.minLength(1)]],
            album_url: ['http://manual.jfdc.tech', [Validators.required, Validators.minLength(1)]],
            areas: this._fb.array([])
        })
        const control = <FormArray>this.gmpPackingPreopForm.controls['areas'];
        for (let area of this.log.areas) {
            var itemControl = []
            for(let type of area.types){
                for(let item of type.items){
                    itemControl.push(this.initItem({id:item.id,is_acceptable:null,corrective_action:0,comment:"default item comments"}))
                }
            }
            control.push(this.initArea({id:area.id,time:"",notes:"default note",person_performing_sanitation:"default person",items:itemControl}))
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
            is_acceptable:[item.is_acceptable, [Validators.required, Validators.minLength(1)]],
            corrective_action: [item.corrective_action, [Validators.required, Validators.minLength(1)]],
            comment: [item.comment, [Validators.required, Validators.minLength(1)]]
        })
    }

    save(model: Report){
        console.log(this.gmpPackingPreopForm.value)
    }
}