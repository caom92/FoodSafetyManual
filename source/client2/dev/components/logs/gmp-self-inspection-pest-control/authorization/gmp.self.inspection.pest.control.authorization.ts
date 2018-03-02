import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { CaptureItem } from '../interfaces/gmp.self.inspection.pest.control.capture.interface'
import { Log } from '../interfaces/gmp.self.inspection.pest.control.log.interface'
import { Authorization } from '../interfaces/gmp.self.inspection.pest.control.authorization.interface';
import { UpdateItem } from '../interfaces/gmp.self.inspection.pest.control.update.interface';

@Component({
  selector: 'gmp-self-inspection-pest-control-authorization',
  templateUrl: './gmp.self.inspection.pest.control.authorization.html'
})

export class GMPSelfInspectionPestControlAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, rooms: [{ id: null, name: null, stations: [{ id: null, name: null, order: null, secured: null, condition: null, activity: null, corrective_actions: null }] }] }
  @Language() lang: string
  offset: Array<number> = []

  constructor(private timeService: DateTimeService,
    private translationService: TranslationService,
    _fb: FormBuilder,
    logService: LogService,
    toasts: ToastsService) {
    super(_fb, logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-self-inspection-pest-control")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    const currentDate = this.timeService.getISODate(new Date())

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      stations: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['stations']
    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        control.push(this.initItem({ id: station.id, is_secured: null, condition: null, activity: null, corrective_actions: "" }))
      }
    }

    // Desplazamiento que se debe realizar en el FormGroup para tener ordenados
    // correctamente los forms de cada item

    this.offset = []
    let accumulated = 0
    this.offset.push(accumulated)
    for (let room of this.log.rooms) {
      this.offset.push(accumulated + room.stations.length)
      accumulated = accumulated + room.stations.length
    }
  }

  resetForm() {
    let stations = []
    const currentDate = this.timeService.getISODate(new Date())

    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        stations.push({ id: station.id, is_secured: null, condition: null, activity: null, corrective_actions: "" })
      }
    }
    this.captureForm.reset({
      date: currentDate,
      notes: '',
      areas: stations
    })
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_secured: [item.is_secured, [Validators.required]],
      condition: [item.condition, [Validators.required]],
      activity: [item.activity, [Validators.required]],
      corrective_actions: [item.corrective_actions]
    })
  }
}