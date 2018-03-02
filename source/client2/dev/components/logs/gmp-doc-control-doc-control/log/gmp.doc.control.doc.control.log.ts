import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { BackendService } from '../../../../services/app.backend'
import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.doc.control.doc.control.log.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-log',
  templateUrl: './gmp.doc.control.doc.control.log.html'
})

export class GMPDocControlDocControlLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, documents: [{ id: null, name: null }] }
  @Language() lang: string
  selectedDocument
  images: any = null
  pdf: any = null

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
    logService: LogService,
    toasts: ToastsService,
    public server: BackendService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-doc-control-doc-control")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    let currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      capture_date: [null, [Validators.required, Validators.minLength(1)]],
      users: [null, [Validators.required]],
      notes: [null, [Validators.required, Validators.maxLength(65535)]],
      album_url: [null, [Validators.required, Validators.maxLength(65535)]],
      files: [null],
      images: [null]
    })
  }

  resetForm() {
    this.initForm()
    $(".fileControl").val("")
    this.selectedDocument = null
  }

  onImageFileSelected(event) {
    this.images = event.target.files
    this.captureForm.controls.images.setValue(event.target.files)
  }

  onPDFFileSelected(event) {
    this.pdf = event.target.files
    this.captureForm.controls.files.setValue(event.target.files)
  }

  public save(): void {
    let formData = new FormData()

    formData.append("date", this.captureForm.controls.date.value)
    formData.append("documents[0][id]", this.selectedDocument)
    formData.append("documents[0][entries][0][date]", this.captureForm.controls.capture_date.value)
    formData.append("documents[0][entries][0][employee]", this.captureForm.controls.users.value)
    formData.append("documents[0][entries][0][notes]", this.captureForm.controls.notes.value)
    formData.append("documents[0][entries][0][additional_info_url]", this.captureForm.controls.album_url.value)

    if (this.captureForm.controls.files.value != null && this.captureForm.controls.files.value != undefined){
      for (let pdf of this.captureForm.controls.files.value){
        formData.append("files[]", pdf, pdf.name)
      }
      formData.append("documents[0][entries][0][files_start]", "0")
      formData.append("documents[0][entries][0][files_length]", String(this.captureForm.controls.files.value.length))
    }

    if (this.captureForm.controls.images.value != null && this.captureForm.controls.images.value != undefined) {
      for (let image of this.captureForm.controls.images.value){
        formData.append("pictures[]", image, image.name)
      }
      formData.append("documents[0][entries][0][pictures_start]", "0")
      formData.append("documents[0][entries][0][pictures_length]", String(this.captureForm.controls.images.value.length))
    }

    this.server.update(
      "capture-gmp-doc-control-doc-control",
      formData,
      (response) => {
        this.resetForm()
      }
    )
  }
}