import { Component, Input, NgModule, OnInit } from '@angular/core'

import { FormGroup } from '@angular/forms'

import { LogArea } from '../interfaces/gmp.packing.glass.brittle.log.interface'

@Component({
    selector: 'gmp-packing-glass-brittle-area',
    templateUrl: './gmp.packing.glass.brittle.area.html'
})

export class GMPPackingGlassBrittleAreaComponent implements OnInit {
    @Input()
    area: LogArea

    @Input('group')
    public areaForm: FormGroup

    ngOnInit(){
        console.log(this.areaForm)
    }
}