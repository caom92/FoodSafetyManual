import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization, AuthorizationItem, AuthorizationTest, AuthorizationType, AuthorizationWeek } from '../interfaces/gmp.packing.atp.luminometer.authorization.interface'
import { WeekData, LogWeek } from '../interfaces/gmp.packing.atp.luminometer.log.interface';

@Component({
  selector: 'gmp-packing-atp-luminometer-authorization',
  templateUrl: './gmp.packing.atp.luminometer.authorization.html'
})

export class GMPPackingATPLuminometerAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Language() lang: string
  @Input() log: Authorization

  constructor(_fb: FormBuilder,
    logService: LogService,
    toastService: ToastsService,
    routeState: ActivatedRoute,
    router: Router,
    private dataResolver: DataResolverService) {
    super(_fb, logService, toastService, routeState, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-luminometer')
    super.ngOnInit()
  }

  public initForm(): void {
    super.initForm()

    const control = this._fb.array([])
    for (let item of this.log.items) {
      control.push(this.initItem(item))
    }

    this.captureForm.addControl('items', control)
  }

  public initItem(item: AuthorizationItem): FormGroup {
    let captureItemGroup: FormGroup = this._fb.group({
      id: [item.id, [Validators.required]],
      weeks: this._fb.array([])
    })

    const control = <FormArray>captureItemGroup.controls['weeks']

    for (let week of item.weeks) {
      control.push(this.initWeek(week))
    }

    return captureItemGroup
  }

  public initWeek(week: AuthorizationWeek): FormGroup {
    let captureWeekGroup: FormGroup = this._fb.group({
      week_num: [week.week_num, [Validators.required]],
      date: [this.dataResolver.resolveString(week.date), [Validators.required, CustomValidators.dateValidator()]],
      types: this._fb.array([])
    })

    const control = <FormArray>captureWeekGroup.controls['types']

    for (let type of week.types) {
      control.push(this.initType(type))
    }

    return captureWeekGroup
  }

  public initType(type: AuthorizationType): FormGroup {
    let captureTypeGroup: FormGroup = this._fb.group({
      id: [type.id, [Validators.required]],
      tests: this._fb.array([])
    })

    const control = <FormArray>captureTypeGroup.controls['tests']

    for (let test of type.tests) {
      control.push(this.initTest(test))
    }

    return captureTypeGroup
  }

  public initTest(test: AuthorizationTest): FormGroup {
    let captureTestGroup: FormGroup = this._fb.group({
      test_num: [test.test_num, [Validators.required]],
      reading: [this.dataResolver.resolveNumber(test.reading, null), [Validators.required]],
      notes: [this.dataResolver.resolveString(test.notes, ''), [Validators.required]]
    })

    return captureTestGroup
  }
}