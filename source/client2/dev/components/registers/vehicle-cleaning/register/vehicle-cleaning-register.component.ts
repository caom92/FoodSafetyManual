import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DateTimeService } from '../../../../services/time.service'

import { RegisterService } from '../../../../services/register.service'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'
import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { TranslatableText } from '../../register-list/register-list.interface'

@Component({
  selector: 'vehicle-cleaning-register',
  templateUrl: './vehicle-cleaning-register.component.html'
})

export class VehicleCleaningRegisterComponent implements OnInit {
  isEmployee: boolean = false
  register: { registers: Array<VehicleCleaningEntryInterface>, name: TranslatableText, footer: string } = { registers: [], name: { en: '', es: '' }, footer: '' }
  @ViewChild('reportComponent') reportComponent
  dateRangeForm: FormGroup
  dateOptions: Pickadate.DateOptions

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private timeService: DateTimeService) { }

  public ngOnInit(): void {
    this.dateOptions = getDatePickerConfig(localStorage.getItem('lang'))

    this.isEmployee = localStorage.getItem('role_name') == 'Employee'

    this.initRequestForm()

    this.initRegisters()
  }

  public initRequestForm(): void {
    this.dateRangeForm = this.formBuilder.group({
      start_date: [this.timeService.getISODate()],
      end_date: [this.timeService.getISODate()]
    })
  }

  public initRegisters(): void {
    // request an empty service, so you can get a few recent registers
    this.registerService.view('vehicle-cleaning', null).then(success => {
      this.register = success
    })
  }

  public searchRegisters(): void {
    this.registerService.view('vehicle-cleaning', this.dateRangeForm.value).then(success => {
      this.register = success
    })
  }

  public onAddRegister(register: VehicleCleaningEntryInterface): void {
    this.register.registers.push(register)

    this.register.registers.sort((a, b) => a.capture_date > b.capture_date ? -1 : a.capture_date < b.capture_date ? 1 : 0)
  }
}