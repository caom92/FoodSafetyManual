import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language, TranslationService } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { AlertController } from '../../../../services/alert/app.alert'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureItem } from '../interfaces/gap.self.inspection.pest.control.capture.interface'
import { Log } from '../interfaces/gap.self.inspection.pest.control.log.interface'

@Component({
  selector: 'gap-self-inspection-pest-control-log',
  templateUrl: './gap.self.inspection.pest.control.log.html'
})

export class GAPSelfInspectionPestControlLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, rooms: [{ id: null, name: null, stations: [{ id: null, name: null, order: null }] }] }
  @Language() lang: string
  offset: Array<number> = []

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    logService: LogService,
    toastService: ToastsService,
    formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-self-inspection-pest-control')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate()

    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: ['', [/*Validators.required, Validators.minLength(1)*/]],
      stations: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['stations']
    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        control.push(this.initItem({ id: station.id, /*is_secured: null,*/ condition: null, activity: null, corrective_actions: '' }))
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
    const currentDate = this.timeService.getISODate()

    for (let room of this.log.rooms) {
      for (let station of room.stations) {
        stations.push({ id: station.id, /*is_secured: null,*/ condition: null, activity: null, corrective_actions: '' })
      }
    }
    this.captureForm.reset({
      date: currentDate,
      notes: '',
      stations: stations
    })
  }

  public initItem(item: CaptureItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      //is_secured: [item.is_secured, [Validators.required]],
      condition: [item.condition, [Validators.required]],
      activity: [item.activity, [Validators.required]],
      corrective_actions: [item.corrective_actions]
    })
  }

  public fillBlanks() {
    /*let alert = this.alertCtrl.create({
      title: this.translationService.translate('Titles.autofill'),
      message: this.translationService.translate('Messages.autofill'),
      buttons: [
        {
          text: this.translationService.translate('Options.cancel'),
          handler: () => {
            
          }
        },
        {
          text: this.translationService.translate('Options.accept'),
          handler: () => {
            for (let i of (<FormArray>this.captureForm.controls.stations).controls) {
              let control = <FormGroup>i
              if (control.pristine) {
                control.controls.condition.setValue(true)
                control.controls.activity.setValue(false)
                control.controls.corrective_actions.setValue("N/A")
              }
            }
          }
        }
      ]
    })*/
    for (let i of (<FormArray>this.captureForm.controls.stations).controls) {
      let control = <FormGroup>i
      if (control.pristine) {
        control.controls.condition.setValue(true)
        control.controls.activity.setValue(false)
        control.controls.corrective_actions.setValue("N/A")
      }
    }
  }
}