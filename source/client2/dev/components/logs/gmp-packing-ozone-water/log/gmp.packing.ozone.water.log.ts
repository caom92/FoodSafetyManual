import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem, CaptureEntry } from '../interfaces/gmp.packing.ozone.water.capture.interface'
import { Log, LogField, LogItem } from '../interfaces/gmp.packing.ozone.water.log.interface'
import { maxLengths } from '../maxLengths/max.lengths'

@Component({
  selector: 'gmp-packing-ozone-water-log',
  templateUrl: './gmp.packing.ozone.water.log.html'
})

export class GMPPackingOzoneWaterLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null, fields: [{ id: null, position: null, name_en: null, name_es: null, field_id: null }] }] }
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
    this.setSuffix('gmp-packing-ozone-water')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem(item))
    }
  }

  public initItem(item: LogItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({})
    captureItemGroup.addControl('id', new FormControl(item.id, [Validators.required]))
    captureItemGroup.addControl('entries', this._fb.array([]))
    this.addEntry(<FormArray>captureItemGroup.controls.entries, item.fields)
    return captureItemGroup
  }

  public initEmptyEntry(test: number, fields: Array<LogField>): FormGroup {
    const currentTime = this.timeService.getISOTime(new Date())
    let entryGroup: FormGroup = this._fb.group({})
    entryGroup.addControl('test_number', new FormControl(test, [Validators.required]))
    entryGroup.addControl('time', new FormControl(currentTime, [Validators.required, CustomValidators.timeValidator()]))
    let dynamicEntry: CaptureEntry = { time: currentTime, test_number: 1 }
    
    for (let field of fields) {
      switch (Number(field.field_id)) {
        case 1: dynamicEntry.reading = null
          break
        case 2: dynamicEntry.ph = null
          break
        case 3: dynamicEntry.orp = null
          break
        case 4: dynamicEntry.temperature = null
          break
        case 5: dynamicEntry.corrective_action = ''
          break
        case 6: dynamicEntry.product = ''
          break
        case 7: dynamicEntry.lot = ''
          break
        case 8: dynamicEntry.parcel = ''
          break
        case 9: dynamicEntry.reference = ''
          break
        case 10: dynamicEntry.total_chlorine = null
          break
        case 11: dynamicEntry.free_chlorine = null
          break
        case 12: dynamicEntry.rinse = null
          break
        case 13: dynamicEntry.status = false
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

  public addEntry(itemForm: FormArray, fields: Array<LogField>): void {
    itemForm.push(this.initEmptyEntry(itemForm.controls.length +1, fields))
    this.cleanForm()
  }

  public removeEntry(itemForm: FormArray): void {
    if (itemForm.controls.length > 1) {
      itemForm.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  public resetForm(): void {
    this.initForm()
  }
}