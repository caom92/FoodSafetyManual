import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gmp.self.inspection.pest.control.capture.interface'
import { Log } from '../interfaces/gmp.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gmp-self-inspection-pest-control-log',
  templateUrl: './gmp.self.inspection.pest.control.log.html'
})

export class GMPSelfInspectionPestControlLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, rooms: [{ id: null, name: null, stations: [{ id: null, name: null, order: null }] }] }
  @Language() lang: string
  offset: Array<number> = []

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-self-inspection-pest-control")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      stations: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['stations']
    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        control.push(this.initItem({ id: station.id, is_secured: null, condition: null, activity: null, corrective_actions: "" }))
      }
    }

    // Desplazamiento que se debe realizar en el FormGroup para tener ordenados correctamente los forms de cada item

    this.offset = []
    let accumulated = 0
    this.offset.push(accumulated)
    for (let room of this.log.rooms) {
      this.offset.push(accumulated + room.stations.length)
      accumulated = accumulated + room.stations.length
    }
  }

  resetForm() {
    /*let areas = []
    let currentTime = this.timeService.getISOTime(new Date())
    for (let area of this.log.areas) {
      let items = []
      for (let item of area.items) {
        items.push({ id: item.id, is_acceptable: null })
      }
      areas.push({ id: area.id, items: items })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      notes: '',
      areas: areas
    })*/
  }

  initItem(item: CaptureItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_secured: [item.is_secured, [Validators.required]],
      condition: [item.condition, [Validators.required]],
      activity: [item.activity, [Validators.required]],
      corrective_actions: [item.corrective_actions]
    })
  }

  save(){
    console.log(this.captureForm)
    console.log(this.captureForm.value)
    console.log(this.offset)
  }
}