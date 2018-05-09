import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Language, DefaultLocale, Currency } from 'angular-l10n'

import { LanguageService } from '../../../services/app.language'
import { DateTimeService } from '../../../services/app.time'
import { MzDatepickerDirective } from 'ng2-materialize'

@Component({
  selector: 'log-header',
  templateUrl: './log.header.html'
})

export class LogHeaderComponent implements OnInit {
  @Input() log: {zone_name: string, program_name: string, module_name: string, date: string, created_by: string} = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }
  @Input() dateGroup?: FormGroup
  
  date: string = ""
  dateConfig: any
  username: string = ""
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Currency() currency: string
  @ViewChild(MzDatepickerDirective) datePicker: MzDatepickerDirective

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
      this.username = localStorage.user_full_name
    }

    this.dateConfig = (this.langManager.messages.global as any).datePickerConfig
  }

  openDatePicker() {  
    window.setTimeout(() => {
      this.datePicker.picker.open()
    })
  }
}