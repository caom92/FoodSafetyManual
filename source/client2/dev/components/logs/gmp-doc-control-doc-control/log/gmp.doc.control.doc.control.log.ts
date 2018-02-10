import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.doc.control.doc.control.log.interface'
import { BackendService } from '../../../../services/app.backend';

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
    /*let currentTime = this.timeService.getISOTime(new Date())
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      time: [currentTime, [Validators.required]],
      incident_date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      shift_id: ["", [Validators.required]],
      area_id: ["", [Validators.required, Validators.maxLength(255)]],
      product_id: ["", [Validators.required, Validators.maxLength(255)]],
      batch_id: ["", [Validators.required, Validators.maxLength(255)]],
      description_id: ["", [Validators.required, Validators.maxLength(65535)]],
      corrective_action: ["", [Validators.required, Validators.maxLength(65535)]],
      album_url: ["", [Validators.required, Validators.maxLength(65535)]],
    })*/
  }

  resetForm() {
    // Remember to implement
  }

  addDocument() {
    console.log("add document")
    console.log(this.log)
    console.log(this.selectedDocument)
  }

  onImageFileSelected(event) {
    console.log("image file")
    console.log(event)
    console.log(event.target.files)
    this.images = event.target.files
    for(let file of event.target.files){
      console.log(file)
    }
  }

  onPDFFileSelected(event) {
    console.log("pdf file")
    console.log(event)
    console.log(event.target.files)
    this.pdf = event.target.files
    for(let file of event.target.files){
      console.log(file)
    }
  }

  save() {
    // Has to be overwritten, since we can upload files
    console.log("code before saving")

    let formData = new FormData()

    formData.append("date", this.timeService.getISODate(new Date()))

    formData.append("documents[0][id]", "1")

    formData.append("documents[0][entries][0][date]", this.timeService.getISODate(new Date()))

    formData.append("documents[0][entries][0][employee]", "Test")
    //formData.append()
    //formData.append()

    if(this.pdf != null){
      for(let pdf of this.pdf){
        console.log(pdf)
        console.log(pdf.name)
        formData.append("files[]", pdf, pdf.name)
      }
      formData.append("documents[0][entries][0][files_start]", "0")
      formData.append("documents[0][entries][0][files_length]", String(this.pdf.length))
    }

    if(this.images != null) {
      for(let image of this.images){
        console.log(image)
        console.log(image.name)
        formData.append("pictures[]", image, image.name)
      }
      formData.append("documents[0][entries][0][pictures_start]", "0")
      formData.append("documents[0][entries][0][pictures_length]", String(this.images.length))
    }

    this.server.update(
      "capture-gmp-doc-control-doc-control",
      formData,
      (response) => {
        console.log(response)
      }
    )
  }
}