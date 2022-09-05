import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DateTimeService } from '../../../../services/time.service'

import { RegisterService } from '../../../../services/register.service'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'
import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { TranslatableText } from '../../register-list/register-list.interface'
import { MzModalService } from 'ngx-materialize'
import { VehicleCleaningAddRegisterModalComponent } from '../add-modal/vehicle-cleaning-add-modal.component'
import { SearchModal } from '../../register-common/search-modal/search-modal.component'

@Component({
  selector: 'vehicle-cleaning-register',
  templateUrl: './vehicle-cleaning-register.component.html',
  styleUrls: ['../../templates/register-template.component.css']
})

export class VehicleCleaningRegisterComponent implements OnInit {
  isEmployee: boolean = false
  register: { registers: Array<VehicleCleaningEntryInterface>, name: TranslatableText, footer: string } = { registers: [], name: { en: '', es: '' }, footer: '' }
  @ViewChild('reportComponent') reportComponent
  @ViewChild('reportGeneratorComponent') reportGeneratorComponent
  dateRangeForm: FormGroup
  dateOptions: Pickadate.DateOptions

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder, private timeService: DateTimeService, private modalService: MzModalService) { }

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

  public onSearchClick(): void {
    this.modalService.open(SearchModal, {
      dateRangeForm: this.dateRangeForm,
      onClose: () => {
        this.searchRegisters()
      }
    })
  }

  public onReportClick(): void {
    this.reportGeneratorComponent.requestPDFReport()
  }

  public openAddModal(): void {
    this.modalService.open(VehicleCleaningAddRegisterModalComponent, {
      onClose: (register: VehicleCleaningEntryInterface) => {
        this.onAddRegister(register)
      }
    })
  }

  public getCSS(): string {
    return '.dateColumn{width:70px}.plateColumn{width:70px}.disinfectionColumn{width:75px}.waterColumn{width:75px}.conditionsColumn{width:75px}.contaminationColumn{width:75px}.actionColumn{width:250px}.initialsColumn{width:60px}.signatureColumn{width:70px}.gpSignatureColumn{width:80px}.zoneColumn{width:40px}'
  }
}
