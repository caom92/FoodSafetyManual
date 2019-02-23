import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureArea, CaptureItem } from '../interfaces/gap.packing.preop.capture.interface'
import { Log } from '../interfaces/gap.packing.preop.log.interface'

@Component({
  selector: 'gap-packing-preop-log',
  templateUrl: './gap.packing.preop.log.html'
})

export class GAPPackingPreopLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, en: null, es: null, items: [{ id: null, name: null, order: null }] }] }] } }
  @Language() lang: string

  readonly maxLengths = {
    area_notes: 65535,
    person_performing_sanitation: 255,
    comment: 65535,
    report_notes: 65535,
    album_url: 255
  }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toastService: ToastsService) {
    super(logService, toastService)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-preop')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.maxLength(this.maxLengths.report_notes)]],
      album_url: ['', [Validators.maxLength(this.maxLengths.album_url)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas.logs) {
      let itemControl: Array<FormGroup> = []
      for (let type of area.types) {
        for (let item of type.items) {
          itemControl.push(this.initItem({ id: item.id, is_acceptable: null, corrective_action: 1, comment: '' }))
        }
      }
      control.push(this.initArea({ id: area.id, time: currentTime, notes: '', person_performing_sanitation: '', items: itemControl }))
    }
  }

  public initArea(area: CaptureArea): FormGroup {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required, CustomValidators.timeValidator()]],
      notes: [area.notes, [Validators.maxLength(this.maxLengths.area_notes)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(this.maxLengths.person_performing_sanitation)]],
      items: this._fb.array(area.items)
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable],
      corrective_action_id: [item.corrective_action],
      comment: [item.comment, [Validators.maxLength(this.maxLengths.comment)]]
    })
  }

  resetForm() {
    let areas = []
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    for (let area of this.log.areas.logs) {
      let items: Array<CaptureItem> = []
      for (let type of area.types) {
        for (let item of type.items) {
          items.push({ id: item.id, is_acceptable: null, corrective_action: 1, comment: '' })
        }
      }
      areas.push({ id: area.id, time: currentTime, notes: '', person_performing_sanitation: '', items: items })
    }
    this.captureForm.reset({
      date: currentDate,
      notes: '',
      album_url: '',
      areas: areas
    })
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.is_acceptable.value == false) {
          item.enable()
        } else if (item.controls.is_acceptable.value == true || item.controls.is_acceptable.value == undefined || item.controls.is_acceptable.value == null) {
          if (item.controls.is_acceptable.value == undefined || item.controls.is_acceptable.value == null) {
            item.controls.is_acceptable.disable()
          }
          item.controls.corrective_action_id.disable()
          item.controls.comment.disable()
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