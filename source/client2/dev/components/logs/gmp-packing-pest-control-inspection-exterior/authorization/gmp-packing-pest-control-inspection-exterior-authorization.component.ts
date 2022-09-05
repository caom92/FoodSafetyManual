import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationArea } from '../interfaces/gmp-packing-pest-control-inspection-exterior-authorization.interface'
import { maxLengths } from '../max-lengths/max-lengths'

@Component({
  selector: 'gmp-packing-pest-control-inspection-exterior-authorization',
  templateUrl: './gmp-packing-pest-control-inspection-exterior-authorization.component.html'
})

export class GMPPackingPestControlInspectionExteriorAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization

  readonly maxLengths = maxLengths

  constructor(private dataResolver: DataResolverService, private langManager: LanguageService, _fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gmp-packing-pest-control-inspection-exterior')
    super.ngOnInit()
  }

  initForm(): void {
    super.initForm()

    const itemsControl: FormArray = this._fb.array([])
    for (let item of this.log.areas) {
      itemsControl.push(this.initItem(item))
    }

    this.captureForm.addControl('areas', itemsControl)

    setTimeout(() => {
      $('select').material_select()
    }, 200)
  }

  initItem(area: AuthorizationArea): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(area.id), [Validators.required]],
      area_verification_id: [this.dataResolver.resolveNumber(area.area_verification_id), []],
      corrective_action_id: [this.dataResolver.resolveNumber(area.corrective_action_id), []],
      equipment_status_id: [this.dataResolver.resolveNumber(area.equipment_status_id), []],
      pest_type_id: [this.dataResolver.resolveNumber(area.pest_type_id), []],
      protection_status_id: [this.dataResolver.resolveNumber(area.protection_status_id), []],
      task_id: [this.dataResolver.resolveNumber(area.task_id), []],
      captured_pests: [this.dataResolver.resolveNumber(area.captured_pests), []],
      observations: [this.dataResolver.resolveString(area.observations), [Validators.maxLength(this.maxLengths.observations)]]
    })

    return captureItemGroup
  }

  cleanForm() {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      let controlArray: Array<AbstractControl> = []

      controlArray.push(area.controls.area_verification_id)
      controlArray.push(area.controls.corrective_action_id)
      controlArray.push(area.controls.equipment_status_id)
      controlArray.push(area.controls.pest_type_id)
      controlArray.push(area.controls.protection_status_id)
      controlArray.push(area.controls.task_id)
      controlArray.push(area.controls.captured_pests)
      controlArray.push(area.controls.observations)

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
}