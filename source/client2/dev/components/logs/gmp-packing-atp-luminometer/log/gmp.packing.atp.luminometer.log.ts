import { Component, Input } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { FormUtilService } from '../../../../services/form-util.service'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperUpdateComponent } from '../../super-logs/super.logs.update'
import { Log, LogItem, LogTest, LogType, LogWeek, WeekData } from '../interfaces/gmp.packing.atp.luminometer.log.interface'

@Component({
  selector: 'gmp-packing-atp-luminometer-log',
  templateUrl: './gmp.packing.atp.luminometer.log.html'
})

export class GMPPackingATPLuminometerLogComponent extends SuperUpdateComponent {
  @Input() log: Log = null
  @Language() lang: string
  types: Array<LogType> = []

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private dataResolver: DataResolverService,
    logService: LogService,
    toastService: ToastsService,
    formUtilService: FormUtilService) {
    super(logService, toastService, formUtilService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-luminometer')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = (this.log.creation_date !== undefined) ? this.log.creation_date : this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      items: this._fb.array([])
    })

    if (this.log.report_id != null && this.log.report_id != undefined) {
      this.captureForm.addControl('report_id', new FormControl(this.log.report_id, []))
    }

    const control = <FormArray>this.captureForm.controls['items']
    for (let item of this.log.items) {
      control.push(this.initItem(item))
    }
  }

  public initItem(item: LogItem): FormGroup {
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

  public initWeek(week: LogWeek): FormGroup {
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

  public initType(type: LogType): FormGroup {
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

  public initTest(test: LogTest): FormGroup {
    let captureTestGroup: FormGroup = this._fb.group({
      test_num: [test.test_num, [Validators.required]],
      reading: [this.dataResolver.resolveNumber(test.reading, null), [Validators.required]],
      notes: [this.dataResolver.resolveString(test.notes, ''), [Validators.required]]
    })

    return captureTestGroup
  }

  public addEntry(weekData: WeekData): void {
    let tempTypes: Array<LogType> = []

    for (let type of weekData.weeks[0].types) {
      tempTypes.push({
        id: Number(type.id),
        name_en: String(type.name_en),
        name_es: String(type.name_es),
        tests: [
          {
            test_num: 1
          },
          {
            test_num: 2
          },
          {
            test_num: 3
          }
        ]
      })
    }

    let week: LogWeek = {
      week_num: weekData.weeksForm.controls.length + 1,
      types: tempTypes
    }

    weekData.weeks.push(week)
    weekData.weeksForm.push(this.initWeek(week))
  }

  public removeEntry(weekData: WeekData): void {
    if (weekData.weeksForm.controls.length > 1) {
      weekData.weeksForm.controls.pop()
      weekData.weeks.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  public resetForm(): void {
    this.initForm()
  }
}