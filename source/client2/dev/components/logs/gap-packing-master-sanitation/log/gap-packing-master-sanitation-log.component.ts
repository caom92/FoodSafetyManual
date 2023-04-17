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
import { Log, LogArea, LogItem } from '../interfaces/gap-packing-master-sanitation-log.interface'

@Component({
  selector: 'gap-packing-master-sanitation-log',
  templateUrl: './gap-packing-master-sanitation-log.component.html'
})

export class GAPPackingMasterSanitationLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string
  areaOffset: Array<number> = []
  typeOffset: Array<number> = []

  readonly maxLengths = {
    area_notes: 65535,
    person_performing_sanitation: 65535,
    corrective_action: 65535,
    item_notes: 65535,
    report_notes: 65535,
    album_url: 65535
  }

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
    const currentTime = this.timeService.getISOTime()

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: [this.dataResolver.resolveString(this.log.notes), [Validators.maxLength(this.maxLengths.report_notes)]],
      album_url: [this.dataResolver.resolveString(this.log.album_url), [Validators.maxLength(this.maxLengths.album_url)]],
      areas: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, [Validators.required]))
    }

    const areasControl = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      let areaControl: FormGroup
      let itemsControl: FormArray = new FormArray([])
      for (let type of area.types) {
        for (let item of type.items) {
          itemsControl.push(this.initItem(item))
        }
      }
      /*if (area.time === null || area.time === undefined)
        area.time = currentTime*/
      areaControl = this.initArea(area)
      areaControl.addControl('items', itemsControl)
      areasControl.push(areaControl)
    }
  }

  initArea(area: LogArea): FormGroup {
    let captureAreaGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(area.id), [Validators.required]],
      time: [this.dataResolver.resolveString(area.time), [CustomValidators.timeValidator()]],
      notes: [this.dataResolver.resolveString(area.notes), [Validators.maxLength(this.maxLengths.area_notes)]],
      person_performing_sanitation: [this.dataResolver.resolveString(area.person_performing_sanitation), [Validators.maxLength(this.maxLengths.person_performing_sanitation)]]
    })

    return captureAreaGroup
  }

  initItem(item: LogItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(item.id), [Validators.required]],
      status: [this.dataResolver.resolveBoolean(item.status), []],
      corrective_action: [this.dataResolver.resolveString(item.corrective_action), [Validators.maxLength(this.maxLengths.corrective_action)]],
      notes: [this.dataResolver.resolveString(item.notes), [Validators.maxLength(this.maxLengths.item_notes)]]
    })

    return captureItemGroup
  }

  resetForm() {
    let areas = []
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    for (let area of this.log.areas) {
      let items: Array<LogItem> = []
      for (let type of area.types) {
        for (let item of type.items) {
          items.push({ id: item.id, name: item.name, status: null, corrective_action: null, notes: null })
        }
      }
      areas.push({ id: area.id, time: null, notes: null, person_performing_sanitation: null, items: items })
    }
    this.captureForm.reset({
      date: currentDate,
      notes: null,
      album_url: null,
      areas: areas
    })
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.status.value == false) {
          item.enable()
        } else if (item.controls.status.value == true || item.controls.status.value == undefined || item.controls.status.value == null) {
          if (item.controls.status.value == undefined || item.controls.status.value == null) {
            item.controls.status.disable()
          }
          item.controls.corrective_action.disable()
          item.controls.notes.disable()
        }
      }
    }
  }

  public enableForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        item.enable()
      }
    }
  }
}
