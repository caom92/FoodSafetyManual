import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.ozone.water.authorization.interface'
import { UpdateItem } from '../interfaces/gmp.packing.ozone.water.update.interface'
import { maxLengths } from '../maxLengths/max.lengths'

@Component({
  selector: 'gmp-packing-ozone-water-authorization',
  templateUrl: './gmp.packing.ozone.water.authorization.html'
})

export class GMPPackingOzoneWaterAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, items: [{ id: null, name: null, fields: [{ id: null, position: null, name_en: null, name_es: null, field_id: null, value: null }] }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, router: StateService) {
    super(_fb, logService, toastService, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-ozone-water')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      let dynamicItem: UpdateItem = { id: item.id }
      dynamicItem.id = item.id
      for (let field of item.fields) {
        switch (Number(field.field_id)) {
          case 1: dynamicItem.reading = Number(field.value)
            break
          case 2: dynamicItem.ph = Number(field.value)
            break
          case 3: dynamicItem.orp = Number(field.value)
            break
          case 4: dynamicItem.temperature = Number(field.value)
            break
          case 5: dynamicItem.corrective_action = String(field.value)
            break
          case 6: dynamicItem.product = String(field.value)
            break
          case 7: dynamicItem.lot = String(field.value)
            break
          case 8: dynamicItem.parcel = String(field.value)
            break
          case 9: dynamicItem.reference = String(field.value)
            break
          case 10: dynamicItem.total_chlorine = Number(field.value)
            break
          case 11: dynamicItem.free_chlorine = Number(field.value)
            break
          case 12: dynamicItem.rinse = Number(field.value)
            break
          case 13: dynamicItem.status = String(field.value) == '1'
            break
        }
      }
      control.push(this.initItem(dynamicItem))
    }
  }

  public initItem(item: UpdateItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({})
    captureItemGroup.addControl('id', new FormControl(item.id, [Validators.required]))
    if (item.reading !== undefined) captureItemGroup.addControl('reading', new FormControl(item.reading, [Validators.required]))
    if (item.ph !== undefined) captureItemGroup.addControl('ph', new FormControl(item.ph, [Validators.required]))
    if (item.orp !== undefined) captureItemGroup.addControl('orp', new FormControl(item.orp, [Validators.required]))
    if (item.temperature !== undefined) captureItemGroup.addControl('temperature', new FormControl(item.temperature, [Validators.required]))
    if (item.corrective_action !== undefined) captureItemGroup.addControl('corrective_action', new FormControl(item.corrective_action, [Validators.required, Validators.maxLength(this.maxLengths.corrective_action)]))
    if (item.product !== undefined) captureItemGroup.addControl('product', new FormControl(item.product, [Validators.required, Validators.maxLength(this.maxLengths.product)]))
    if (item.lot !== undefined) captureItemGroup.addControl('lot', new FormControl(item.lot, [Validators.required, Validators.maxLength(this.maxLengths.lot)]))
    if (item.parcel !== undefined) captureItemGroup.addControl('parcel', new FormControl(item.parcel, [Validators.required, Validators.maxLength(this.maxLengths.parcel)]))
    if (item.reference !== undefined) captureItemGroup.addControl('reference', new FormControl(item.reference, [Validators.required, Validators.maxLength(this.maxLengths.reference)]))
    if (item.total_chlorine !== undefined) captureItemGroup.addControl('total_chlorine', new FormControl(item.total_chlorine, [Validators.required]))
    if (item.free_chlorine !== undefined) captureItemGroup.addControl('free_chlorine', new FormControl(item.free_chlorine, [Validators.required]))
    if (item.rinse !== undefined) captureItemGroup.addControl('rinse', new FormControl(item.rinse, [Validators.required]))
    if (item.status !== undefined) captureItemGroup.addControl('status', new FormControl(item.status, [Validators.required]))
    return captureItemGroup
  }
}
