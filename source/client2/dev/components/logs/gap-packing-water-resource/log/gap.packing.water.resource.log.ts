import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { CaptureArea, CaptureItem } from '../interfaces/gap.packing.water.resource.capture.interface'
import { Log } from '../interfaces/gap.packing.water.resource.log.interface'

@Component({
  selector: 'gap-packing-water-resource-log',
  templateUrl: './gap.packing.water.resource.log.html'
})

export class GAPPackingWaterResourceLogComponent extends SuperUpdateComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, quantity: null }] }] }
  @Language() lang: string

  readonly maxLengths = {
    corrective_actions: 65535
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toastService: ToastsService,
    formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-water-resource')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      areas: this._fb.array([])
    })
    
    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, []))
    }

    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      let itemControl = []
      for (let item of area.items) {
        itemControl.push(this.initItem({ id: item.id, date: (item.date != undefined) ? item.date : '', compliance: (item.compliance === 1) ? true : (item.compliance === 0) ? false : null, reason: (item.reason != undefined) ? item.reason : '', corrective_actions: (item.corrective_actions != undefined) ? item.corrective_actions : '' }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  public resetForm(): void {
    const currentDate = this.timeService.getISODate()
    let areas = []
    for (let area of this.log.areas) {
      let items = []
      for (let item of area.items) {
        items.push({ id: item.id, date: '', compliance: null, reason: '', corrective_actions: '' })
      }
      areas.push({ id: area.id, items: items })
    }
    this.captureForm.reset({
      date: currentDate,
      areas: areas
    })
  }

  public initArea(area: CaptureArea): FormGroup {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      items: this._fb.array(area.items)
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      date: [item.date, [CustomValidators.dateValidator()]],
      compliance: [item.compliance],
      reason: [item.reason],
      corrective_actions: [item.corrective_actions]
    })
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        const dateControl = (<FormGroup>item).controls.date
        const complianceControl = (<FormGroup>item).controls.compliance
        const actionsControl = (<FormGroup>item).controls.corrective_actions
        const reasonControl = (<FormGroup>item).controls.reason

        if (dateControl.value === null || dateControl.value === '') {
          dateControl.disable()
        }

        if (complianceControl.value === true || complianceControl.value === null) {
          actionsControl.disable()
          reasonControl.disable()
        } else {
          if (actionsControl.value === null || actionsControl.value === '') {
            actionsControl.disable()
          }

          if (reasonControl.value === null || reasonControl.value === '') {
            reasonControl.disable()
          }
        }

        if (complianceControl.value === null || complianceControl.value === '') {
          complianceControl.disable()
        }
      }
    }
  }

  public enableForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        const dateControl = (<FormGroup>item).controls.date
        const complianceControl = (<FormGroup>item).controls.compliance
        const actionsControl = (<FormGroup>item).controls.corrective_actions
        const reasonControl = (<FormGroup>item).controls.reason

        dateControl.enable()
        complianceControl.enable()
        actionsControl.enable()
        reasonControl.enable()
      }
    }
  }
}