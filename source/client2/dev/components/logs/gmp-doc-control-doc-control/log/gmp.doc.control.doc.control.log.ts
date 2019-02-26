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
import { Log } from '../interfaces/gmp.doc.control.doc.control.log.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-log',
  templateUrl: './gmp.doc.control.doc.control.log.html'
})

export class GMPDocControlDocControlLogComponent extends SuperLogComponent implements OnInit {
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
    this.setSuffix('gmp-doc-control-doc-control')
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
        'capture-gmp-doc-control-doc-control',
        formData,
        (response) => {
          this.toastService.showServerMessage('capture-gmp-doc-control-doc-control', response.meta.return_code)
          loader.dismiss()
          this.enableForm()
          if (response.meta.return_code == 0) {
            this.resetForm()
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