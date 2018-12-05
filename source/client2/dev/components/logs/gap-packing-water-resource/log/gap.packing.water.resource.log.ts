import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
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
    toasts: ToastsService) {
    super(logService, toasts)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-water-resource')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
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
        itemControl.push(this.initItem({ id: item.id, date: (item.date != undefined) ? item.date : '', compliance: (item.compliance != undefined) ? item.compliance : false, corrective_actions: (item.corrective_actions != undefined) ? item.corrective_actions : '' }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  public resetForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
    let areas = []
    for (let area of this.log.areas) {
      let items = []
      for (let item of area.items) {
        items.push({ id: item.id, date: '', compliance: false, corrective_actions: '' })
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

        if (dateControl.value == null || dateControl.value == '') {
          dateControl.disable()
        }

        if (complianceControl.value == null || complianceControl.value == '') {
          complianceControl.disable()
        }

        if (actionsControl.value == null || actionsControl.value == '') {
          actionsControl.disable()
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

        dateControl.enable()
        complianceControl.enable()
        actionsControl.enable()
      }
    }
  }
}