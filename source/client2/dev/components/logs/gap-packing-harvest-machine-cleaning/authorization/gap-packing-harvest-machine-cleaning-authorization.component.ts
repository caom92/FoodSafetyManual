import { Component } from '@angular/core'
import { Language } from 'angular-l10n'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { maxLengths } from '../max-lengths/max-lengths'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationMachine } from '../interfaces/gap-packing-harvest-machine-cleaning-authorization.interface'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { CustomValidators } from '../../../../directives/custom.validators'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-authorization',
  templateUrl: './gap-packing-harvest-machine-cleaning-authorization.component.html'
})

export class GAPPackingHarvestMachineCleaningAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization = null
  @Language() lang: string

  readonly maxLengths = maxLengths

  constructor(_fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router, private dataResolver: DataResolverService, private timeService: DateTimeService) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit() {
    this.setSuffix('gap-packing-harvest-machine-cleaning')
    super.ngOnInit()
  }

  initForm() {
    super.initForm()

    const machinesControl: FormArray = this._fb.array([])
    
    for (let machine of this.log.machines) {
      machinesControl.push(this.initMachine(machine))
    }

    this.captureForm.addControl('machines', machinesControl)
  }

  initMachine(machine: AuthorizationMachine): FormGroup {
    let captureMachineGroup: FormGroup = this._fb.group({
      date: [this.dataResolver.resolveString(machine.date), [Validators.required, CustomValidators.dateValidator()]],
      entry_num: [this.dataResolver.resolveNumber(machine.entry_num), []],
      harvest_machine_quantity: [this.dataResolver.resolveNumber(machine.harvest_machine_quantity), []],
      disinfection: [this.dataResolver.resolveNumber(machine.disinfection), []],
      soap_bag_wash: [this.dataResolver.resolveBoolean(machine.soap_bag_wash), []],
      rinse: [this.dataResolver.resolveBoolean(machine.rinse), []],
      conditions: [this.dataResolver.resolveBoolean(machine.conditions), []],
      noted_defects: [this.dataResolver.resolveString(machine.noted_defects), []],
      initials: [this.dataResolver.resolveString(machine.initials), []]
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
}