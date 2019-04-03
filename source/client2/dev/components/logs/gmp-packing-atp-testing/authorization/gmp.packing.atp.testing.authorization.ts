import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationEntry, AuthorizationTest } from '../interfaces/gmp.packing.atp.testing.authorization.interface'

@Component({
  selector: 'gmp-packing-atp.testing-authorization',
  templateUrl: './gmp.packing.atp.testing.authorization.html'
})

export class GMPPackingATPTestingAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, creation_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, entries: [{ name: null, time: null, items: [{ id: null, test_number: null, test1: null, results1: null, corrective_action: null, test2: null, results2: null }] }] }
  @Language() lang: string

  constructor(_fb: FormBuilder,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    routeState: ActivatedRoute,
    router: Router) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-testing')
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      notes: [this.log.notes, Validators.maxLength(65535)],
      areas: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['areas']

    for (const entry of this.log.entries) {
      control.push(this.initEntry(entry))
    }

    this.cleanForm()
  }

  public initEntry(entry: AuthorizationEntry): FormGroup {
    const items = this._fb.array([])

    for (const test of entry.items) {
      items.push(this.initItem(test))
    }

    return this._fb.group({
      name: [entry.name, [Validators.required, Validators.maxLength(255)]],
      time: [entry.time, [Validators.required, Validators.maxLength(255)]],
      items: items
    })
  }

  public initItem(test: AuthorizationTest): FormGroup {
    return this._fb.group({
      test_number: [test.test_number, [Validators.required]],
      test1: [test.test1, [Validators.required]],
      results1: [(test.results1 == 1) ? true : (test.results1 == 0) ? false : null, [Validators.required]],
      corrective_action: [test.corrective_action, [Validators.required]],
      test2: [test.test2, [Validators.required]],
      results2: [(test.results2 == 1) ? true : (test.results2 == 0) ? false: null, [Validators.required]]
    })
  }

  // TODO: Realizar una implementación para pruebas individuales
  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.results1.value == false) {
          item.enable()
        } else if (item.controls.results1.value == true || item.controls.results1.value == undefined) {
          item.controls.corrective_action.disable()
          item.controls.test2.disable()
          item.controls.results2.disable()
        }
      }
    }
  }
}