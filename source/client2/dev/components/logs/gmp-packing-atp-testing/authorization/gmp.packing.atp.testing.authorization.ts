import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { LanguageService } from '../../../../services/app.language'
import { Authorization } from '../interfaces/gmp.packing.atp.testing.authorization.interface'

@Component({
  selector: 'gmp-others-unusual-occurrence-authorization',
  templateUrl: './gmp.others.unusual.occurrence.authorization.html'
})

export class GMPOthersUnusualOccurrenceAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, entries: [{ name: null, time: null, items: [{ id: null, test_number: null, test1: null, results1: null, corrective_action: null, test2: null, results2: null }] }] }
  @Language() lang: string

  readonly maxLengths = {
    area_id: 255,
    product_id: 255,
    batch: 255,
    description: 65535,
    corrective_action: 65535,
    album_url: 255
  }

  constructor(_fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService) {
    super(_fb, logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-others-unusual-occurrence")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      areas: this._fb.array([])
    })
    //this.entries = []

    const control = <FormArray>this.captureForm.controls['areas']

    control.push(this.initEmptyEntry())
    //this.entries.push(this.entries.length + 1)
  }

  public initEmptyEntry(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      time: [this.timeService.getISOTime(new Date()), [Validators.required, Validators.maxLength(255)]],
      items: this._fb.array([])
    })
  }

  public initEmptyItem(test: number): FormGroup {
    return this._fb.group({
      test_number: [test, [Validators.required]],
      test1: [null, [Validators.required]],
      results1: [null, [Validators.required]],
      corrective_action: [null, [Validators.required]],
      test2: [null, [Validators.required]],
      results2: [null,  [Validators.required]]
    })
  }
}