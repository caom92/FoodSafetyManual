import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DateTimeService } from '../../../../services/time.service'

import { RegisterService } from '../../../../services/register.service'
import { FinishedProductEntryInterface } from '../interfaces/finished-product.interface'
import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { TranslatableText } from '../../register-list/register-list.interface'
import { MzModalService } from 'ngx-materialize'
import { FinishedProductAddRegisterModalComponent } from '../add-modal/finished-product-add-modal.component'
import { SearchModal } from '../../register-common/search-modal/search-modal.component'

@Component({
  selector: 'finished-product-register',
  templateUrl: './finished-product-register.component.html',
  styleUrls: ['../../templates/register-template.component.css']
})

export class FinishedProductRegisterComponent implements OnInit {
  isEmployee: boolean = false
  register: { registers: Array<FinishedProductEntryInterface>, name: TranslatableText, footer: string } = { registers: [], name: { en: '', es: '' }, footer: '' }
  codes: Array<any> = []
  status: Array<any> = []
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
    this.registerService.view('finished-product', null).then(success => {
      this.register = success
    })

    this.registerService.info('finished-product').then(success => {
      this.codes = success.codes
      this.status = success.status
    })
  }

  public searchRegisters(): void {
    this.registerService.view('finished-product', this.dateRangeForm.value).then(success => {
      this.register = success
    })
  }

  public onAddRegister(register: FinishedProductEntryInterface): void {
    this.register.registers.push(register)

    this.register.registers.sort((a, b) => a.capture_date > b.capture_date ? -1 : a.capture_date < b.capture_date ? 1 : 0)

    this.registerService.info('finished-product').then(success => {
      this.codes = success.codes
      this.status = success.status
    })
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
    this.modalService.open(FinishedProductAddRegisterModalComponent, {
      onClose: (register: FinishedProductEntryInterface) => {
        this.onAddRegister(register)
      },
      codes: this.codes,
      status: this.status
    })
  }

  public getCSS(): string {
    return '.dateColumn{width:70px}.codeColumn{width:60px}.brixColumn{width:60px}.colorColumn{width:60px}.descriptionColumn{width:250px}.actionColumn{width:250px}.signatureColumn{width:70px}.gpSignatureColumn{width:80px}.zoneColumn{width:40px}'
  }
}
