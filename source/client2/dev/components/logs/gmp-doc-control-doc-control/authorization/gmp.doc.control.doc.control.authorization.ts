import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { CustomValidators } from '../../../../directives/custom.validators'
import { BackendService } from '../../../../services/app.backend'
import { LanguageService } from '../../../../services/app.language'
import { LoaderService } from '../../../../services/app.loaders'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.doc.control.doc.control.authorization.interface'

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
    toastService: ToastsService,
    router: StateService,
    public server: BackendService,
    public loaderService: LoaderService) {
    super(_fb, logService, toastService, router)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-doc-control-doc-control')    
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    if (this.log.documents.length != 0) {
      this.selectedDocument = this.log.documents[0].id
      this.selectedDocumentName = this.log.documents[0].name
      try {
        this.images = JSON.parse(this.log.documents[0].entries[0].pictures)
      } catch (error) {
        this.images = null
      }
      try {
        this.files = JSON.parse(this.log.documents[0].entries[0].files)
      } catch (error) {
        this.images = null
      }
      // The usual initForm, triggered only after a few initializations
      this.captureForm = this._fb.group({
        report_id: [this.log.report_id, [Validators.required]],
        date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]],
        capture_date: [this.log.documents[0].entries[0].date, [Validators.required, CustomValidators.dateValidator()]],
        users: [this.log.documents[0].entries[0].employee, [Validators.required]],
        notes: [this.log.documents[0].entries[0].notes, [Validators.maxLength(65535)]],
        album_url: [this.log.documents[0].entries[0].additional_info_url, [Validators.maxLength(65535)]]
      })
    } else {
      this.captureForm = this._fb.group({})
    }
  }

  public save(): void {
    if (this.captureForm.valid && this.log.documents.length != 0) {
      let loader = this.loaderService.koiLoader()
      let formData = new FormData()

      formData.append('report_id', this.captureForm.controls.report_id.value)
      formData.append('date', this.captureForm.controls.date.value)
      formData.append('documents[0][id]', String(this.selectedDocument))
      formData.append('documents[0][entries][0][date]', this.captureForm.controls.capture_date.value)
      formData.append('documents[0][entries][0][employee]', this.captureForm.controls.users.value)
      formData.append('documents[0][entries][0][notes]', this.captureForm.controls.notes.value)
      formData.append('documents[0][entries][0][additional_info_url]', this.captureForm.controls.album_url.value)

      this.server.update(
        'update-gmp-doc-control-doc-control',
        formData,
        (response) => {
          if (response.meta.return_code == 0) {
            //success
            this.toastService.showText('updatedLog')
            this.captureForm.markAsPristine()
            this.enableForm()
          } else {
            // error
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
            this.enableForm()            
          }
          loader.dismiss()
        }, (error: any, caught: Observable<void>) => {
          loader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toastService.showText('incompleteLog')
    }
  }
}