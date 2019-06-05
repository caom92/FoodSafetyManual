import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'

import { CustomValidators } from '../../../../directives/custom.validators'
import { BackendService } from '../../../../services/app.backend'
import { LanguageService } from '../../../../services/app.language'
import { LoaderService } from '../../../../services/loader.service'
import { LogService } from '../../../../services/log.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperAuthorizationComponent } from '../../super-logs/super.logs.authorization'
import { Authorization } from '../interfaces/gmp.doc.control.doc.control.authorization.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-authorization',
  templateUrl: './gmp.doc.control.doc.control.authorization.html'
})

export class GMPDocControlDocControlAuthorizationComponent extends SuperAuthorizationComponent {
  log: Authorization
  selectedDocument: number
  selectedDocumentName: string
  files: Array<string> = []
  images: Array<string> = []

  constructor(_fb: FormBuilder,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    routeState: ActivatedRoute,
    router: Router,
    public server: BackendService,
    public loaderService: LoaderService) {
    super(_fb, logService, toastService, routeState, router)
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
          this.toastService.showServerMessage('update-gmp-doc-control-doc-control', response.meta.return_code)
          loader.dismiss()
          this.enableForm()
          if (response.meta.return_code == 0) {
            this.captureForm.markAsPristine()
          }
        }, (error: any, caught: Observable<void>) => {
          this.toastService.showClientMessage('server-unreachable', 1)
          loader.dismiss()
          return []
        }
      )
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toastService.showClientMessage('incomplete-log', 1)
    }
  }
}