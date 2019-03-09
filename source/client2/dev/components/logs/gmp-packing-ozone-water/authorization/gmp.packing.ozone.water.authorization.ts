import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationField, AuthorizationItem } from '../interfaces/gmp.packing.ozone.water.authorization.interface'
import { UpdateEntry } from '../interfaces/gmp.packing.ozone.water.update.interface'
import { maxLengths } from '../maxLengths/max.lengths'

@Component({
  selector: 'gmp-packing-ozone-water-authorization',
  templateUrl: './gmp.packing.ozone.water.authorization.html'
})

export class GMPPackingOzoneWaterAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, creation_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, items: [{ id: null, name: null, fields: [{ id: null, is_active: null, name_en: null, name_es: null, field_id: null, value: null }], entries: [{ test_number: null, time: null, fields: [{ id: null, is_active: null, name_en: null, name_es: null, field_id: null, value: null }] }] }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router, private timeService: DateTimeService) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-ozone-water')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem(item))
    }
  }

  public initItem(item: AuthorizationItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({})
    captureItemGroup.addControl('id', new FormControl(item.id, [Validators.required]))
    captureItemGroup.addControl('entries', this._fb.array([]))
    
    for (let entry of item.entries) {
      this.addEntry(<FormArray>captureItemGroup.controls.entries, entry.fields, entry.time)
    }

    return captureItemGroup
  }

  public initEmptyEntry(test: number, fields: Array<AuthorizationField>, time?: string): FormGroup {
    const currentTime = (time !== undefined) ? time : this.timeService.getISOTime()
    let entryGroup: FormGroup = this._fb.group({})
    entryGroup.addControl('test_number', new FormControl(test, [Validators.required]))
    entryGroup.addControl('time', new FormControl(currentTime, [Validators.required, CustomValidators.timeValidator()]))
    let dynamicEntry: UpdateEntry = { time: currentTime, test_number: 1 }

    for (let field of fields) {
      switch (Number(field.field_id)) {
        case 1: dynamicEntry.reading = (field.value !== undefined) ? Number(field.value) : null
          break
        case 2: dynamicEntry.ph = (field.value !== undefined) ? Number(field.value) : null
          break
        case 3: dynamicEntry.orp = (field.value !== undefined) ? Number(field.value) : null
          break
        case 4: dynamicEntry.temperature = (field.value !== undefined) ? Number(field.value) : null
          break
        case 5: dynamicEntry.corrective_action = (field.value !== undefined) ? String(field.value) : ''
          break
        case 6: dynamicEntry.product = (field.value !== undefined) ? String(field.value) : ''
          break
        case 7: dynamicEntry.lot = (field.value !== undefined) ? String(field.value) : ''
          break
        case 8: dynamicEntry.parcel = (field.value !== undefined) ? String(field.value) : ''
          break
        case 9: dynamicEntry.reference = (field.value !== undefined) ? String(field.value) : ''
          break
        case 10: dynamicEntry.total_chlorine = (field.value !== undefined) ? Number(field.value) : null
          break
        case 11: dynamicEntry.free_chlorine = (field.value !== undefined) ? Number(field.value) : null
          break
        case 12: dynamicEntry.rinse = (field.value !== undefined) ? Number(field.value) : null
          break
        case 13: dynamicEntry.status = (field.value !== undefined) ? Boolean(field.value) : false
          break
      }
    }

    if (dynamicEntry.reading !== undefined) entryGroup.addControl('reading', new FormControl(dynamicEntry.reading, [Validators.required]))
    if (dynamicEntry.ph !== undefined) entryGroup.addControl('ph', new FormControl(dynamicEntry.ph, [Validators.required]))
    if (dynamicEntry.orp !== undefined) entryGroup.addControl('orp', new FormControl(dynamicEntry.orp, [Validators.required]))
    if (dynamicEntry.temperature !== undefined) entryGroup.addControl('temperature', new FormControl(dynamicEntry.temperature, [Validators.required]))
    if (dynamicEntry.corrective_action !== undefined) entryGroup.addControl('corrective_action', new FormControl(dynamicEntry.corrective_action, [Validators.required, Validators.maxLength(this.maxLengths.corrective_action)]))
    if (dynamicEntry.product !== undefined) entryGroup.addControl('product', new FormControl(dynamicEntry.product, [Validators.required, Validators.maxLength(this.maxLengths.product)]))
    if (dynamicEntry.lot !== undefined) entryGroup.addControl('lot', new FormControl(dynamicEntry.lot, [Validators.required, Validators.maxLength(this.maxLengths.lot)]))
    if (dynamicEntry.parcel !== undefined) entryGroup.addControl('parcel', new FormControl(dynamicEntry.parcel, [Validators.required, Validators.maxLength(this.maxLengths.parcel)]))
    if (dynamicEntry.reference !== undefined) entryGroup.addControl('reference', new FormControl(dynamicEntry.reference, [Validators.required, Validators.maxLength(this.maxLengths.reference)]))
    if (dynamicEntry.total_chlorine !== undefined) entryGroup.addControl('total_chlorine', new FormControl(dynamicEntry.total_chlorine, [Validators.required]))
    if (dynamicEntry.free_chlorine !== undefined) entryGroup.addControl('free_chlorine', new FormControl(dynamicEntry.free_chlorine, [Validators.required]))
    if (dynamicEntry.rinse !== undefined) entryGroup.addControl('rinse', new FormControl(dynamicEntry.rinse, [Validators.required]))
    if (dynamicEntry.status !== undefined) entryGroup.addControl('status', new FormControl(dynamicEntry.status, [Validators.required]))

    return entryGroup
  }

  public addEntry(control: FormArray, fields: Array<AuthorizationField>, time?: string): void {
    control.push(this.initEmptyEntry(control.controls.length + 1, fields, time))
    this.cleanForm()
  }

  public removeEntry(control: FormArray): void {
    if (control.controls.length > 1) {
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }
}
