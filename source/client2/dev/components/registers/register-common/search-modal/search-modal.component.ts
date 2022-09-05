import { Component, Input, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzBaseModal, MzModalComponent } from 'ngx-materialize'

import { getDatePickerConfig } from '../../../../components/reports/super-report/report-language-config'
import { DateTimeService } from '../../../../services/time.service'

@Component({
  templateUrl: './search-modal.component.html'
})

export class SearchModal extends MzBaseModal {
  @ViewChild('searchModal') searchModal: MzModalComponent
  @Language() lang: string
  @Input() dateRangeForm: FormGroup
  @Input() onClose: () => {}
  readonly modalOptions: Materialize.ModalOptions
  dateOptions: Pickadate.DateOptions

  constructor(private formBuilder: FormBuilder, private timeService: DateTimeService) {
    super()
  }

  public ngOnInit(): void {
    this.dateOptions = getDatePickerConfig(localStorage.getItem('lang'))
    /*this.dateRangeForm = this.formBuilder.group({
      start_date: [this.timeService.getISODate()],
      end_date: [this.timeService.getISODate()]
    })*/
  }

  public search(): void {
    this.searchModal.closeModal()
    this.onClose()
  }
}
