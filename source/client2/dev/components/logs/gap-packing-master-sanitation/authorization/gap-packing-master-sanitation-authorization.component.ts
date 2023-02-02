import { Component } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationItem } from '../interfaces/gap-packing-master-sanitation-authorization.interface'

@Component({
  selector: 'gap-packing-master-sanitation-authorization',
  templateUrl: './gap-packing-master-sanitation-authorization.component.html'
})

export class GAPPackingMasterSanitationAuthorizationComponent extends SuperAuthorizationComponent {
  @Language() lang: string
  log: Authorization
  areaOffset: Array<number> = []
  typeOffset: Array<number> = []

  constructor(private dataResolver: DataResolverService, private langManager: LanguageService, _fb: FormBuilder, logService: LogService, toastService: ToastsService, routeState: ActivatedRoute, router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  ngOnInit(): void {
    this.setSuffix('gap-packing-master-sanitation')
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

    const itemsControl: FormArray = this._fb.array([])
    for (let area of this.log.areas) {
      for (let type of area.types) {
        for (let item of type.items) {
          itemsControl.push(this.initItem(item))
        }
      }
    }

    this.captureForm.addControl('items', itemsControl)

    setTimeout(() => {
      $('select').material_select()
    }, 200)
  }

  initItem(item: AuthorizationItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [this.dataResolver.resolveNumber(item.id), [Validators.required]],
      status: [this.dataResolver.resolveNumber(item.status), []],
    })

    return captureItemGroup
  }

  enableForm() {
    this.captureForm.enable()
  }
}