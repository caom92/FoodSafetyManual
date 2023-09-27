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
import { Authorization, AuthorizationArea, AuthorizationItem } from '../interfaces/gap-packing-cooler-cleaning-authorization.interface'

@Component({
  selector: 'gap-packing-cooler-cleaning-authorization',
  templateUrl: './gap-packing-cooler-cleaning-authorization.component.html'
})

export class GAPPackingCoolerCleaningAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization
  areaOffset: Array<number> = []
  typeOffset: Array<number> = []

  readonly maxLengths = {
    area_notes: 65535,
    person_performing_sanitation: 65535,
    item_notes: 65535,
    report_notes: 65535,
    album_url: 65535
  }

  constructor(private dataResolver: DataResolverService, private langManager: LanguageService, _fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gap-packing-cooler-cleaning')
    super.ngOnInit()
  }

  initForm(): void {
    super.initForm()
    let accumulated = 0
    this.typeOffset.push(accumulated)
    this.areaOffset.push(accumulated)
    for (let area of this.log.areas) {
      for (let type of area.types) {
        this.typeOffset.push(accumulated + type.items.length)
        accumulated = accumulated + type.items.length
      }
      this.areaOffset.push(accumulated)
      accumulated = 0
    }

    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      notes: [this.dataResolver.resolveString(this.log.notes), [Validators.maxLength(this.maxLengths.report_notes)]],
      album_url: [this.dataResolver.resolveString(this.log.album_url), [Validators.maxLength(this.maxLengths.album_url)]],
      areas: this._fb.array([])
    })

    const areasControl = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      let areaControl: FormGroup
      let itemsControl: FormArray = new FormArray([])
      for (let type of area.types) {
        for (let item of type.items) {
          itemsControl.push(this.initItem(item))
        }
      }
      areaControl = this.initArea(area)
      areaControl.addControl('items', itemsControl)
      areasControl.push(areaControl)
    }

    setTimeout(() => {
      $('select').material_select()
    }, 200)
  }

  initArea(area: AuthorizationArea): FormGroup {
    let captureAreaGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(area.id), [Validators.required]],
      time: [this.dataResolver.resolveString(area.time), [CustomValidators.timeValidator()]],
      notes: [this.dataResolver.resolveString(area.notes), [Validators.maxLength(this.maxLengths.area_notes)]],
      person_performing_sanitation: [this.dataResolver.resolveString(area.person_performing_sanitation), [Validators.maxLength(this.maxLengths.person_performing_sanitation)]]
    })

    return captureAreaGroup
  }

  initItem(item: AuthorizationItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(item.id), [Validators.required]],
      status: [this.dataResolver.resolveBoolean(item.status), []],
      corrective_action: [this.dataResolver.resolveNumber(item.corrective_action), []],
      notes: [this.dataResolver.resolveString(item.notes), [Validators.maxLength(this.maxLengths.item_notes)]]
    })

    return captureItemGroup
  }

  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.status.value == false) {
          item.enable()
        } else if (item.controls.status.value == true || item.controls.status.value == undefined || item.controls.status.value == null) {
          if (item.controls.status.value == undefined || item.controls.status.value == null) {
            item.controls.status.disable()
          }
          item.controls.corrective_action.disable()
          item.controls.notes.disable()
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
