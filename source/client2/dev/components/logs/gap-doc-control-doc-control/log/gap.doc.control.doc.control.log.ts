import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { CustomValidators } from '../../../../directives/custom.validators'
import { BackendService } from '../../../../services/app.backend'
import { LanguageService } from '../../../../services/app.language'
import { LoaderService } from '../../../../services/app.loaders'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/time.service'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gap.doc.control.doc.control.log.interface'

@Component({
  selector: 'gap-doc-control-doc-control-log',
  templateUrl: './gap.doc.control.doc.control.log.html'
})

export class GAPDocControlDocControlLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, documents: [{ id: null, name: null }] }
  @Language() lang: string
  selectedDocument
  images: any = null
  pdf: any = null

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationConfig: TranslationConfigService,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService,
    public server: BackendService,
    private loaderService: LoaderService) {
    super(logService, toastService)
  }

  public ngOnInit(): void {
    this.setSuffix('gap-doc-control-doc-control')
    this.selectedDocument = null
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      capture_date: ['', [Validators.required, Validators.minLength(1)]],
      users: ['', [Validators.required]],
      notes: ['', [Validators.maxLength(65535)]],
      album_url: ['', [Validators.maxLength(65535)]],
      files: [null],
      images: [null]
    })
  }

  public resetForm(): void {
    this.initForm()
    $('.fileControl').val('')
    this.selectedDocument = null
  }

  public onImageFileSelected(event): void {
    this.images = event.target.files
    this.captureForm.controls.images.setValue(event.target.files)
  }

  public onPDFFileSelected(event): void {
    this.pdf = event.target.files
    this.captureForm.controls.files.setValue(event.target.files)
  }

  public save(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      let loader = this.loaderService.koiLoader()
      let formData = new FormData()

      formData.append('date', this.captureForm.controls.date.value)
      formData.append('documents[0][id]', this.selectedDocument)
      formData.append('documents[0][entries][0][date]', this.captureForm.controls.capture_date.value)
      formData.append('documents[0][entries][0][employee]', this.captureForm.controls.users.value)
      formData.append('documents[0][entries][0][notes]', this.captureForm.controls.notes.value)
      formData.append('documents[0][entries][0][additional_info_url]', this.captureForm.controls.album_url.value)

      if (this.captureForm.controls.files.value != null && this.captureForm.controls.files.value != undefined) {
        for (let pdf of this.captureForm.controls.files.value) {
          formData.append('files[]', pdf, pdf.name)
        }
        formData.append('documents[0][entries][0][files_start]', '0')
        formData.append('documents[0][entries][0][files_length]', String(this.captureForm.controls.files.value.length))
      }

      if (this.captureForm.controls.images.value != null && this.captureForm.controls.images.value != undefined) {
        for (let image of this.captureForm.controls.images.value) {
          formData.append('pictures[]', image, image.name)
        }
        formData.append('documents[0][entries][0][pictures_start]', '0')
        formData.append('documents[0][entries][0][pictures_length]', String(this.captureForm.controls.images.value.length))
      }

      this.server.update(
        'capture-gap-doc-control-doc-control',
        formData,
        (response) => {
          if (response.meta.return_code == 0) {
            //success
            this.toastService.showText('capturedLog')
            this.resetForm()
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