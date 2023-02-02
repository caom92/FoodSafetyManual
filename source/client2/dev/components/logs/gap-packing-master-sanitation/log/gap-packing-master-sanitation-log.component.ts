import { Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogItem } from '../interfaces/gap-packing-master-sanitation-log.interface'

@Component({
  selector: 'gap-packing-master-sanitation-log',
  templateUrl: './gap-packing-master-sanitation-log.component.html'
})

export class GAPPackingMasterSanitationLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string
  areaOffset: Array<number> = []
  typeOffset: Array<number> = []

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-master-sanitation')
    super.ngOnInit()
  }

  initForm() {
    let accumulated = 0
    this.typeOffset.push(accumulated)
    this.areaOffset.push(accumulated)
    for (let area of this.log.areas) {
      for (let type of area.types) {
        this.typeOffset.push(accumulated + type.items.length)
        accumulated = accumulated + type.items.length
      }
      this.areaOffset.push(accumulated)
      accumulated = 0
    }

    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      items: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, [Validators.required]))
    }

    const control = <FormArray>this.captureForm.controls['items']
    for (let area of this.log.areas) {
      for (let type of area.types) {
        for (let item of type.items) {
          control.push(this.initItem(item))
        }
      }
    }
  }

  initItem(item: LogItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(item.id), [Validators.required]],
      status: [this.dataResolver.resolveBoolean(item.status), []],
    })

    return captureItemGroup
  }

  enableForm() {
    this.captureForm.enable()
  }

  resetForm() {
    this.captureForm.reset()
    this.initForm()
  }
}
