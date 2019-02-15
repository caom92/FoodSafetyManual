import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureArea, CaptureItem } from '../interfaces/gmp.packing.preop.capture.interface'
import { Log } from '../interfaces/gmp.packing.preop.log.interface'

@Component({
  selector: 'gmp-packing-preop-log',
  templateUrl: './gmp.packing.preop.log.html'
})

export class GMPPackingPreopLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, en: null, es: null, items: [{ id: null, name: null, order: null }] }] }] } }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix('gmp-packing-preop')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.maxLength(65535)]],
      album_url: ['', [Validators.maxLength(65535)]],
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

  resetForm() {
    const currentDate = this.timeService.getISODate()
    const currentTime = this.timeService.getISOTime()
    let areas = []
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

  public initArea(area: CaptureArea): FormGroup {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required]],
      notes: [area.notes, [Validators.maxLength(65535)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.maxLength(255)]],
      items: this._fb.array(area.items)
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]],
      corrective_action_id: [item.corrective_action],
      comment: [item.comment, [Validators.maxLength(65535)]]
    })
  }
}