import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.packing.ozone.water.capture.interface'
import { Log } from '../interfaces/gmp.packing.ozone.water.log.interface'
import { maxLengths } from '../maxLengths/max.lengths'

@Component({
  selector: 'gmp-packing-ozone-water-log',
  templateUrl: './gmp.packing.ozone.water.log.html'
})

export class GMPPackingOzoneWaterLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, fields: [{ id: null, position: null, name_en: null, name_es: null, field_id: null }] }] }
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-ozone-water")
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      let dynamicItem: CaptureItem = { id: item.id }
      dynamicItem.id = item.id
      for (let field of item.fields) {
        switch (Number(field.field_id)) {
          case 1: dynamicItem.reading = null
            break
          case 2: dynamicItem.ph = null
            break
          case 3: dynamicItem.orp = null
            break
          case 4: dynamicItem.temperature = null
            break
          case 5: dynamicItem.corrective_action = ''
            break
          case 6: dynamicItem.product = ''
            break
          case 7: dynamicItem.lot = ''
            break
          case 8: dynamicItem.parcel = ''
            break
          case 9: dynamicItem.reference = ''
            break
          case 10: dynamicItem.total_chlorine = null
            break
          case 11: dynamicItem.free_chlorine = null
            break
          case 12: dynamicItem.rinse = null
            break
          case 13: dynamicItem.status = false
            break
        }
      }
      control.push(this.initItem(dynamicItem))
    }
  }

  public initItem(item: CaptureItem): FormGroup {
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

  public resetForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, reading: null, ph: null, orp: null, temperature: null, corrective_action: '', product: '', lot: '', parcel: '', reference: '', total_chlorine: null, free_chlorine: null, rinse: null, status: false })
    }
    this.captureForm.reset({
      date: currentDate,
      items: items
    })
  }
}