import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.packing.glass.brittle.authorization.interface'
import { UpdateArea, UpdateItem } from '../interfaces/gmp.packing.glass.brittle.update.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-authorization',
  templateUrl: './gmp.packing.glass.brittle.authorization.html'
})

export class GMPPackingGlassBrittleAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, creation_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, time: null, areas: [{ id: null, name: null, items: [{ id: null, name: null, order: null, status: null, quantity: null }] }] }
  @Language() lang: string
  captureForm: FormGroup = new FormBuilder().group({})

  readonly maxLengths = {
    notes: 65535
  }

  constructor(_fb: FormBuilder, toastService: ToastsService, logService: LogService, routeState: ActivatedRoute, router: Router, private langManager: LanguageService) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-glass-brittle')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      time: [this.log.time, [Validators.required, CustomValidators.timeValidator()]],
      notes: [this.log.notes, [Validators.maxLength(this.maxLengths.notes)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas']
    for (let area of this.log.areas) {
      let itemControl = []
      for (let item of area.items) {
        itemControl.push(this.initItem({ id: item.id, is_acceptable: (item.status == 1) ? true : false }))
      }
      control.push(this.initArea({ id: area.id, items: itemControl }))
    }
  }

  public initArea(area: UpdateArea): FormGroup {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      items: this._fb.array(area.items)
    })
  }

  public initItem(item: UpdateItem): FormGroup {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }
}
