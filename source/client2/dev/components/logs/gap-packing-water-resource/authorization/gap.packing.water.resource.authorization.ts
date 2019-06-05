import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationArea, AuthorizationItem } from '../interfaces/gap.packing.water.resource.authorization.interface'

@Component({
  selector: 'gap-packing-water-resource-authorization',
  templateUrl: './gap.packing.water.resource.authorization.html'
})

export class GAPPackingWaterResourceAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization

  constructor(_fb: FormBuilder,
    logService: LogService,
    toastService: ToastsService,
    routeState: ActivatedRoute,
    router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-packing-water-resource')
    super.ngOnInit()
  }

  public initForm(): void {
    super.initForm()

    const areasControl: FormArray = this._fb.array([])
    for (let area of this.log.areas) {
      areasControl.push(this.initArea(area))
    }

    this.captureForm.addControl('areas', areasControl)
  }

  public initArea(area: AuthorizationArea): FormGroup {
    const itemsControlArray: FormArray = this._fb.array([])
    for (let item of area.items) {
      itemsControlArray.push(this.initItem(item))
    }

    return this._fb.group({
      id: [area.id, [Validators.required]],
      items: itemsControlArray
    })
  }

  public initItem(item: AuthorizationItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      date: [item.date, [CustomValidators.dateValidator()]],
      compliance: [(item.compliance == 1) ? true : (item.compliance == 0) ? false : null],
      reason: [item.reason],
      corrective_actions: [item.corrective_actions]
    })
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        const dateControl = (<FormGroup>item).controls.date
        const complianceControl = (<FormGroup>item).controls.compliance
        const actionsControl = (<FormGroup>item).controls.corrective_actions
        const reasonControl = (<FormGroup>item).controls.reason

        if (dateControl.value === null || dateControl.value === '') {
          dateControl.disable()
        }

        if (complianceControl.value === true || complianceControl.value === null) {
          actionsControl.disable()
          reasonControl.disable()
        } else {
          if (actionsControl.value === null || actionsControl.value === '') {
            actionsControl.disable()
          }

          if (reasonControl.value === null || reasonControl.value === '') {
            reasonControl.disable()
          }
        }

        if (complianceControl.value === null || complianceControl.value === '') {
          complianceControl.disable()
        }
      }
    }
  }

  public enableForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        const dateControl = (<FormGroup>item).controls.date
        const complianceControl = (<FormGroup>item).controls.compliance
        const actionsControl = (<FormGroup>item).controls.corrective_actions
        const reasonControl = (<FormGroup>item).controls.reason

        dateControl.enable()
        complianceControl.enable()
        actionsControl.enable()
        reasonControl.enable()
      }
    }
  }
}