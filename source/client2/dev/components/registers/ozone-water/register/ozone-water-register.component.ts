import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MzModalService } from 'ngx-materialize'

import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { RegisterService } from '../../../../services/register.service'
import { DateTimeService } from '../../../../services/time.service'
import { SearchModal } from '../../register-common/search-modal/search-modal.component'
import { TranslatableText } from '../../register-list/register-list.interface'
import { OzoneWaterAddRegisterModalComponent } from '../add-modal/ozone-water-add-modal.component'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  selector: 'ozone-water-register',
  templateUrl: './ozone-water-register.component.html',
  styleUrls: ['../../templates/register-template.component.css']
})

export class OzoneWaterRegisterComponent implements OnInit {
  isEmployee: boolean = false
  register: { registers: Array<OzoneWaterEntryInterface>, name: TranslatableText, footer: string } = { registers: [], name: { en: '', es: '' }, footer: '' }
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
    this.registerService.view('ozone-water', null).then(success => {
      this.register = success
    })
  }

  public searchRegisters(): void {
    this.registerService.view('ozone-water', this.dateRangeForm.value).then(success => {
      this.register = success
    })
  }

  public onAddRegister(register: OzoneWaterEntryInterface): void {
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
    this.modalService.open(OzoneWaterAddRegisterModalComponent, {
      onClose: (register: OzoneWaterEntryInterface) => {
        this.onAddRegister(register)
      }
    })
  }

  public getCSS(): string {
    return '.dateColumn{width:70px}.timeColumn{width:70px}.initialsColumn{width:75px}.areaColumn{width:535px}.signatureColumn{width:70px}.gpSignatureColumn{width:80px}.zoneColumn{width:40px}'
  }
}
