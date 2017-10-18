import { Component, Input, NgModule, OnInit } from '@angular/core'

import { FormGroup } from '@angular/forms'

import { LogType, LogUnit } from '../interfaces/gmp.packing.scale.calibration.log.interface'

@Component({
    selector: 'gmp-packing-scale-calibration-type',
    templateUrl: './gmp.packing.scale.calibration.type.html'
})

export class GMPPackingScaleCalibrationTypeComponent implements OnInit {
    @Input()
    type: LogType

    @Input()
    units: Array<LogUnit>

    @Input('group')
    public typeForm: FormGroup

    ngOnInit(){
        
    }
}