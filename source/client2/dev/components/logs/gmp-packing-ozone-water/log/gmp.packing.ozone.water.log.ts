import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
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
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, items: [{ id: null, name: null }] }
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
      control.push(this.initItem({ id: item.id, reading: null, ph: null, orp: null, temperature: null, corrective_action: "", product: "", lot: "", parcel: "", reference: "", total_chlorine: null, free_chlorine: null, rinse: null, status: false }))
    }
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      reading: [item.reading, []],
      ph: [item.ph, [Validators.required]],
      orp: [item.orp, []],
      temperature: [item.temperature, [Validators.required]],
      corrective_action: [item.corrective_action, []],
      product: [item.product, []],
      lot: [item.lot, []],
      parcel: [item.parcel, []],
      reference: [item.reference, []],
      total_chlorine: [item.total_chlorine, []],
      free_chlorine: [item.free_chlorine, []],
      rinse: [item.rinse, []],
      status: [item.status, [Validators.required]]
    })
  }

  public resetForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, reading: null, ph: null, orp: null, temperature: null, corrective_action: "", product: "", lot: "", parcel: "", reference: "", total_chlorine: null, free_chlorine: null, rinse: null, status: false })
    }
    this.captureForm.reset({
      date: currentDate,
      items: items
    })
  }

  public cleanForm(): void {
    const items = <FormArray>this.captureForm.controls.items

    for (let item of items.controls) {
      const readingControl: AbstractControl = (<FormGroup>item).controls.reading
      const orpControl: AbstractControl = (<FormGroup>item).controls.orp
      const actionControl: AbstractControl = (<FormGroup>item).controls.corrective_action
      const productControl: AbstractControl = (<FormGroup>item).controls.product
      const lotControl: AbstractControl = (<FormGroup>item).controls.lot
      const parcelControl: AbstractControl = (<FormGroup>item).controls.parcel
      const referenceControl: AbstractControl = (<FormGroup>item).controls.reference
      const totalChlorineControl: AbstractControl = (<FormGroup>item).controls.total_chlorine
      const freeChlorineControl: AbstractControl = (<FormGroup>item).controls.free_chlorine
      const rinseControl: AbstractControl = (<FormGroup>item).controls.rinse

      this.disableControl(readingControl, readingControl.value == null || readingControl.value == "")
      this.disableControl(orpControl, orpControl.value == null || orpControl.value == "")
      this.disableControl(actionControl, actionControl.value == null || actionControl.value == "")
      this.disableControl(productControl, productControl.value == null || productControl.value == "")
      this.disableControl(lotControl, lotControl.value == null || lotControl.value == "")
      this.disableControl(parcelControl, parcelControl.value == null || parcelControl.value == "")
      this.disableControl(referenceControl, referenceControl.value == null || referenceControl.value == "")
      this.disableControl(totalChlorineControl, totalChlorineControl.value == null || totalChlorineControl.value == "")
      this.disableControl(freeChlorineControl, freeChlorineControl.value == null || freeChlorineControl.value == "")
      this.disableControl(rinseControl, rinseControl.value == null || rinseControl.value == "")
    }
  }

  public enableForm(): void {
    const items = <FormArray>this.captureForm.controls.items

    for (let item of items.controls) {
      const readingControl: AbstractControl = (<FormGroup>item).controls.reading
      const orpControl: AbstractControl = (<FormGroup>item).controls.orp
      const actionControl: AbstractControl = (<FormGroup>item).controls.corrective_action
      const productControl: AbstractControl = (<FormGroup>item).controls.product
      const lotControl: AbstractControl = (<FormGroup>item).controls.lot
      const parcelControl: AbstractControl = (<FormGroup>item).controls.parcel
      const referenceControl: AbstractControl = (<FormGroup>item).controls.reference
      const totalChlorineControl: AbstractControl = (<FormGroup>item).controls.total_chlorine
      const freeChlorineControl: AbstractControl = (<FormGroup>item).controls.free_chlorine
      const rinseControl: AbstractControl = (<FormGroup>item).controls.rinse

      this.enableControl(readingControl)
      this.enableControl(orpControl)
      this.enableControl(actionControl)
      this.enableControl(productControl)
      this.enableControl(lotControl)
      this.enableControl(parcelControl)
      this.enableControl(referenceControl)
      this.enableControl(totalChlorineControl)
      this.enableControl(freeChlorineControl)
      this.enableControl(rinseControl)
    }
  }
}