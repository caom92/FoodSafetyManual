import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { maxLengths } from '../max-lengths/max-lengths'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogMachine } from '../interfaces/gap-packing-harvest-machine-cleaning-log.interface'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { CustomValidators } from '../../../../directives/custom.validators'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-log',
  templateUrl: './gap-packing-harvest-machine-cleaning-log.component.html'
})

export class GAPPackingHarvestMachineCleaningLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, logService: LogService, toastService: ToastsService, formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-harvest-machine-cleaning')
    super.ngOnInit()
  }

  initForm() {
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      machines: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      // Previous entry, add report_id
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, []))
    } else {
      // New entry, init new machine
      this.log.machines.push({
        entry_num: 1,
        date: '',
        harvest_machine_quantity: null,
        disinfection: null,
        soap_bag_wash: null,
        rinse: null,
        conditions: null,
        noted_defects: '',
        initials: ''
      })
    }

    const control = <FormArray>this.captureForm.controls['machines']
    for (let machine of this.log.machines) {
      control.push(this.initMachine(machine))
    }
  }

  finishForm() {
    let tempForm: FormGroup
    const currentDate = String(this.captureForm.value.date)
    tempForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      machines: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      // Previous entry, add report_id
      tempForm.addControl('report_id', new FormControl(this.log.report_id, []))
    }

    const control = <FormArray>tempForm.controls['machines']
    for (let machine of this.log.machines) {
      control.push(this.initMachine(machine, true))
    }

    return tempForm
  }

  initMachine(machine: LogMachine, isFinish: boolean = false): FormGroup {
    let captureMachineGroup: FormGroup = this._fb.group({
      date: [this.dataResolver.resolveString(machine.date), [Validators.required, CustomValidators.dateValidator()]],
      entry_num: [this.dataResolver.resolveNumber(machine.entry_num), [Validators.required]],
      harvest_machine_quantity: [this.dataResolver.resolveNumber(machine.harvest_machine_quantity), [isFinish ? Validators.required : Validators.nullValidator]],
      disinfection: [this.dataResolver.resolveNumber(machine.disinfection), [isFinish ? Validators.required : Validators.nullValidator]],
      soap_bag_wash: [this.dataResolver.resolveBoolean(machine.soap_bag_wash), [isFinish ? Validators.required : Validators.nullValidator]],
      rinse: [this.dataResolver.resolveBoolean(machine.rinse), [isFinish ? Validators.required : Validators.nullValidator]],
      conditions: [this.dataResolver.resolveBoolean(machine.conditions), [isFinish ? Validators.required : Validators.nullValidator]],
      noted_defects: [this.dataResolver.resolveString(machine.noted_defects), [isFinish ? Validators.required : Validators.nullValidator]],
      initials: [this.dataResolver.resolveString(machine.initials), [isFinish ? Validators.required : Validators.nullValidator]]
    })

    return captureMachineGroup
  }

  cleanForm() {
    for (let m in (<FormGroup>this.captureForm.controls.machines).controls) {
      const machine = (<FormGroup>(<FormGroup>this.captureForm.controls.machines).controls[m])
      
      let controlArray: Array<AbstractControl> = []

      controlArray.push(machine.controls.date)
      controlArray.push(machine.controls.entry_num)
      controlArray.push(machine.controls.harvest_machine_quantity)
      controlArray.push(machine.controls.disinfection)
      controlArray.push(machine.controls.soap_bag_wash)
      controlArray.push(machine.controls.rinse)
      controlArray.push(machine.controls.conditions)
      controlArray.push(machine.controls.noted_defects)
      controlArray.push(machine.controls.initials)

      for (let control of controlArray) {
        if (control.value === null || control.value === '') {
          control.disable()
        }
      }
    }
  }

  enableForm() {
    this.captureForm.enable()
  }

  resetForm() {
    this.captureForm.reset()
  }

  onEntryAdd() {
    const control = <FormArray>this.captureForm.controls['machines']

    let machine: LogMachine = {
      entry_num: control.controls.length + 1,
      date: '',
      harvest_machine_quantity: null,
      disinfection: null,
      soap_bag_wash: null,
      rinse: null,
      conditions: null,
      noted_defects: '',
      initials: ''
    }

    control.push(this.initMachine(machine))
    this.log.machines.push(machine)

    setTimeout(() => {
      $('select').material_select()
    }, 200)
  }

  onEntryRemove() {
    const control = <FormArray>this.captureForm.controls['machines']

    if (control.controls.length > 1) {
      control.controls.pop()
      this.log.machines.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  finish() {
    let finishForm: FormGroup = this.finishForm()

    finishForm.patchValue(this.captureForm.value)
    finishForm.updateValueAndValidity()

    if (finishForm.valid) {
      super.finish()
    } else {
      this.toastService.showClientMessage('finish-fail', 1)
    }
  }
}