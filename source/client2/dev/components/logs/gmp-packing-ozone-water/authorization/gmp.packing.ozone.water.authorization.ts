import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, items: [{ id: null, name: null, reading: null, ph: null, orp: null, temperature: null, corrective_action: null, product: null, lot: null, parcel: null, reference: null, total_chlorine: null, free_chlorine: null, rinse: null, status: null }]}
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, router: StateService) {
    super(_fb, logService, toastService, router)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-ozone-water")
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
      control.push(this.initItem({ id: Number(item.id), reading: item.reading, ph: item.ph, orp: item.orp, temperature: item.temperature, corrective_action: item.corrective_action, product: item.product, lot: item.lot, parcel: item.parcel, reference: item.reference, total_chlorine: item.total_chlorine, free_chlorine: item.free_chlorine, rinse: item.rinse, status: item.status == 1 }))
    }
  }

  public initItem(item: UpdateItem): FormGroup {
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
}
