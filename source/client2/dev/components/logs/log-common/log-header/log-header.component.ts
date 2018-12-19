import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DefaultLocale, Language } from 'angular-l10n'
import { MzDatepickerDirective } from 'ngx-materialize'

import { LanguageService } from '../../../../services/app.language'
import { DateTimeService } from '../../../../services/app.time'

@Component({
  selector: 'log-header',
  templateUrl: './log-header.component.html'
})

export class LogHeaderComponent implements OnInit {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @ViewChild(MzDatepickerDirective) datePicker: MzDatepickerDirective
  @Input() log: { zone_name: string, program_name: string, module_name: string, date: string, created_by: string } = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }
  @Input() dateGroup?: FormGroup

  date: string = ''
  dateConfig: any
  username: string = ''

  constructor(private timeService: DateTimeService, private langManager: LanguageService) {

  }

  ngOnInit() {
    if (this.log.date != null && this.log.date != undefined) {
      this.date = this.log.date
    } else {
      this.date = this.timeService.getISODate(new Date())
    }

    if (this.log.created_by != null && this.log.created_by != undefined) {
      this.username = this.log.created_by
    } else {
      this.username = localStorage.getItem('user_full_name')
    }

    this.dateConfig = this.langManager.messages.global.datePickerConfig
  }

  openDatePicker() {
    window.setTimeout(() => {
      this.datePicker.picker.open()
      this.dateGroup.markAsDirty()
    })
  }
}