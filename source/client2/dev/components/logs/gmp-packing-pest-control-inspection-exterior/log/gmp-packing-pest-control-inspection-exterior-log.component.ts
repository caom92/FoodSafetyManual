import { Component, Input } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogArea } from '../interfaces/gmp-packing-pest-control-inspection-exterior-log.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gmp-packing-pest-control-inspection-exterior-log',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-log.component.html'
})

export class GMPPackingPestControlInspectionExteriorLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      areas: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, [Validators.required]))
    }

    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      control.push(this.initItem(area))
    }

    setTimeout(() => {
      $('select').material_select()
    }, 200)
  }

  initItem(area: LogArea): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(area.id), [Validators.required]],
      area_verification_id: [this.dataResolver.resolveNumber(area.area_verification_id), []],
      corrective_action_id: [this.dataResolver.resolveNumber(area.corrective_action_id), []],
      equipment_status_id: [this.dataResolver.resolveNumber(area.equipment_status_id), []],
      pest_type_id: [this.dataResolver.resolveNumber(area.pest_type_id), []],
      protection_status_id: [this.dataResolver.resolveNumber(area.protection_status_id), []],
      task_id: [this.dataResolver.resolveNumber(area.task_id), []],
      captured_pests: [this.dataResolver.resolveNumber(area.captured_pests), []],
      observations: [this.dataResolver.resolveString(area.observations), [Validators.maxLength(this.maxLengths.observations)]]
    })

    return captureItemGroup
  }

  cleanForm() {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      let controlArray: Array<AbstractControl> = []

      controlArray.push(area.controls.area_verification_id)
      controlArray.push(area.controls.corrective_action_id)
      controlArray.push(area.controls.equipment_status_id)
      controlArray.push(area.controls.pest_type_id)
      controlArray.push(area.controls.protection_status_id)
      controlArray.push(area.controls.task_id)
      controlArray.push(area.controls.captured_pests)
      controlArray.push(area.controls.observations)

      for (let control of controlArray) {
        if (control.value === null || control.value === '') {
          control.disable()
        }
      }
    }
  }

  enableForm() {
    this.captureForm.enable()
  }

  resetForm() {
    this.captureForm.reset()
  }
}