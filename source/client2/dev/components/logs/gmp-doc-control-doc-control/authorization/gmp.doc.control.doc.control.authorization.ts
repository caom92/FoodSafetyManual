import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { BackendService } from '../../../../services/app.backend'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.doc.control.doc.control.authorization.interface'
import { CustomValidators } from '../../../../directives/custom.validators';

@Component({
  selector: 'gmp-doc-control-doc-control-authorization',
  templateUrl: './gmp.doc.control.doc.control.authorization.html'
})

export class GMPDocControlDocControlAuthorizationComponent extends SuperAuthorizationComponent implements OnInit {
  @Input() log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, documents: [{ id: null, name: null, entries: [{ employee: null, date: null, notes: null, additional_info_url: null, pictures: null, files: null }] }] }
  @Language() lang: string
  selectedDocument: number
  selectedDocumentName: string
  files: Array<string> = []
  images: Array<string> = []

  constructor(_fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService,
    router: StateService,
    public server: BackendService) {
    super(_fb, logService, toasts, router)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-doc-control-doc-control")
    this.selectedDocument = this.log.documents[0].id
    this.selectedDocumentName = this.log.documents[0].name
    this.images = JSON.parse(this.log.documents[0].entries[0].pictures)
    this.files = JSON.parse(this.log.documents[0].entries[0].files)
    console.log(this.images)
    console.log(this.files)
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
      capture_date: [this.log.documents[0].entries[0].date, [Validators.required, Validators.minLength(1)]],
      users: [this.log.documents[0].entries[0].employee, [Validators.required]],
      notes: [this.log.documents[0].entries[0].notes, [Validators.required, Validators.maxLength(65535)]],
      album_url: [this.log.documents[0].entries[0].additional_info_url, [Validators.required, Validators.maxLength(65535)]]
    })
  }

  public save(): void {
    console.log(this.captureForm)
  }
}