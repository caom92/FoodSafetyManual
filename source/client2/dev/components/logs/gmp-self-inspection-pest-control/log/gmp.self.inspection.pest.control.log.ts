import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
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

  public ngOnInit(): void {
    this.setSuffix('gmp-self-inspection-pest-control')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate(new Date())

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [Validators.required, Validators.minLength(1)]],
      stations: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['stations']
    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        control.push(this.initItem({ id: station.id, is_secured: null, condition: null, activity: null, corrective_actions: '' }))
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

  public resetForm(): void {
    let stations = []
    const currentDate = this.timeService.getISODate(new Date())

    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        stations.push({ id: station.id, is_secured: null, condition: null, activity: null, corrective_actions: '' })
      }
    }
    this.captureForm.reset({
      date: currentDate,
      notes: '',
      areas: stations
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_secured: [item.is_secured, [Validators.required]],
      condition: [item.condition, [Validators.required]],
      activity: [item.activity, [Validators.required]],
      corrective_actions: [item.corrective_actions]
    })
  }
}