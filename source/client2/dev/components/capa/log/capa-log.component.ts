import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms'

import { LanguageService } from '../../../services/app.language'
import { DateTimeService } from '../../../services/app.time'
import { CAPAService } from '../../../services/capa.service'
import { CAPAForm } from './capa-log.interface'

@Component({
  selector: 'capa-log',
  templateUrl: './capa-log.component.html'
})

export class CAPAFormComponent {
  @Output() closeCapa = new EventEmitter<any>()
  @Input() data: CAPAForm = null
  capaForm: FormGroup
  userID: number = Number(localStorage.getItem('user_id'))
  username: string = localStorage.getItem('user_full_name')
  dateConfig
  images: Array<{ id?: number, name: string, dataUrl: string }> = []
  pdfs: Array<{ id?: number, name: string }> = []

  constructor(private langManager: LanguageService, private formBuilder: FormBuilder, private timeService: DateTimeService, private capaService: CAPAService) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    if (this.data === null || this.data === undefined) {
      // no data input, init a clean form
      this.data = { id: null, capa_number: null, reference_number: null, creator_id: null, creator_name: null, capture_date: null, reference: null, description: null, observer: null, occurrence_date: null, findings: null, root_cause: null, preventive_actions: null, corrective_actions: null, planned_date: null, assigned_personnel: null, follow_up: null, actual_date: null, status: null, accepter_id: null, accepter_name: null, closure_date: null, url: null, images: null, files: null }
      this.initForm()
    } else {
      // data was received from Input directive, init
      this.initForm()
    }
  }

  public initForm(): void {
    const captureDate = this.timeService.getISODate(new Date())
    const currentDate = this.timeService.getISODate(new Date())
    this.capaForm = this.formBuilder.group({
      capa_number: [(this.data.capa_number !== undefined && this.data.capa_number !== null) ? this.data.capa_number : ''],
      reference_number: [(this.data.reference_number !== undefined && this.data.reference_number !== null) ? this.data.reference_number : ''],
      creator_id: [(this.data.creator_id !== undefined && this.data.creator_id !== null) ? this.data.creator_id : this.userID],
      creator_name: [(this.data.creator_name !== undefined && this.data.creator_name !== null) ? this.data.creator_name : this.username],
      capture_date: [(this.data.capture_date !== undefined && this.data.capture_date !== null) ? this.data.capture_date : captureDate],
      reference: [(this.data.reference !== undefined && this.data.reference !== null) ? this.data.reference : ''],
      description: [(this.data.description !== undefined && this.data.description !== null) ? this.data.description : ''],
      observer: [(this.data.observer !== undefined && this.data.observer !== null) ? this.data.observer : ''],
      occurrence_date: [(this.data.occurrence_date !== undefined && this.data.occurrence_date !== null) ? this.data.occurrence_date: ''],
      findings: [(this.data.findings !== undefined && this.data.findings !== null) ? this.data.findings : ''],
      root_cause: [(this.data.root_cause !== undefined && this.data.root_cause !== null) ? this.data.root_cause : ''],
      preventive_actions: [(this.data.preventive_actions !== undefined && this.data.preventive_actions !== null) ? this.data.preventive_actions : ''],
      corrective_actions: [(this.data.corrective_actions !== undefined && this.data.corrective_actions !== null) ? this.data.corrective_actions : ''],
      planned_date: [(this.data.planned_date !== undefined && this.data.planned_date !== null) ? this.data.planned_date : ''],
      assigned_personnel: [(this.data.assigned_personnel !== undefined && this.data.assigned_personnel !== null) ? this.data.assigned_personnel : ''],
      follow_up: [(this.data.follow_up !== undefined && this.data.follow_up !== null) ? this.data.follow_up : ''],
      actual_date: [(this.data.actual_date !== undefined && this.data.actual_date !== null) ? this.data.actual_date : ''],
      status: [(this.data.status !== undefined && this.data.status !== null) ? this.data.status : ''],
      accepter_id: [this.userID],
      closure_date: [currentDate],
      link: [(this.data.url !== undefined && this.data.url !== null) ? this.data.url : ''],
      images: this.formBuilder.array([]),
      files: this.formBuilder.array([])
    })

    // if we have an ID, it is used in the form
    if (this.data.id !== undefined && this.data.id !== null) {
      this.capaForm.addControl('id', new FormControl(this.data.id, [Validators.required]))
    }

    if (this.data.files !== undefined && this.data.files !== null) {
      if (this.data.files.length > 0) {
        for (let file of this.data.files) {
          this.pdfs.push({ id: file.id, name: file.path })
        }
      }
    }

    if (this.data.images !== undefined && this.data.images !== null) {
      if (this.data.images.length > 0) {
        for (let image of this.data.images) {
          this.images.push({ id: image.id, name: image.path, dataUrl: 'http://localhost/espresso/data/capa/images/' + image.path })
        }
      }
    }
  }

  public onImageFileSelected(event): void {
    let validFiles = true

    if (event.target.files.length === 0) {
      validFiles = false
    } else {
      for (let file of event.target.files) {
        // only png and jpeg formats are valid
        if (file.type.match(/(image\/(?:png|jpeg))/g) == null) {
          validFiles = false
        }
      }
    }

    if (validFiles === true) {
      const control = <FormArray>this.capaForm.controls.images

      for (let file of event.target.files) {
        control.push(new FormControl(file, []))
        let reader = new FileReader()
        reader.onload = (event: any) => {
          this.images.push({ name: file.name, dataUrl: event.target.result })
        }
        reader.readAsDataURL(file)
      }
      $('.image-input').val('')
    } else {
      // TODO send toast with invalid image file message
      $('.image-input').val('')
    }
  }

  public onPDFFileSelected(event): void {
    let validFiles = true

    if (event.target.files.length === 0) {
      validFiles = false
    } else {
      for (let file of event.target.files) {
        if (file.type != 'application/pdf') {
          validFiles = false
        }
      }
    }

    if (validFiles === true) {
      const control = <FormArray>this.capaForm.controls.files

      for (let file of event.target.files) {
        control.push(new FormControl(file, []))
        this.pdfs.push({ name: file.name })
      }
      $('.file-input').val('')
    } else {
      $('.file-input').val('')
      // TODO send toast with invalid PDF file message
    }
  }

  public deleteImage(index: number) {
    const control = <FormArray>this.capaForm.controls.images
    const imageLength = Number(this.images.length)
    const controlLength = Number(control.length)
    if (index > (imageLength - controlLength)) {
      control.removeAt(index - (imageLength - controlLength))
      this.images.splice(index, 1)
    } else {
      this.capaService.deleteImage(this.images[index].id).then(success => {
        this.images.splice(index, 1)
      }, error => {
          
      })
      //console.log('delete from server image: ', this.images[index].id, this.images[index].name)
    }
    //this.images.splice(index, 1)
  }

  public deletePDF(index: number) {
    const control = <FormArray>this.capaForm.controls.files
    const pdfsLength = Number(this.pdfs.length)
    const controlLength = Number(control.length)
    if (index > (pdfsLength - controlLength)) {
      control.removeAt(index - (pdfsLength - controlLength))
      this.pdfs.splice(index, 1)
    } else {
      this.capaService.deleteFile(this.pdfs[index].id).then(success => {
        this.pdfs.splice(index, 1)
      }, error => {

      })
      //console.log('delete from server file: ', this.pdfs[index].id, this.pdfs[index].name)
    }
  }

  public cleanForm(): void {  
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.capaForm.controls.capa_number)
    controlArray.push(this.capaForm.controls.reference_number)
    controlArray.push(this.capaForm.controls.creator_id)
    controlArray.push(this.capaForm.controls.capture_date)
    controlArray.push(this.capaForm.controls.reference)
    controlArray.push(this.capaForm.controls.description)
    controlArray.push(this.capaForm.controls.observer)
    controlArray.push(this.capaForm.controls.occurrence_date)
    controlArray.push(this.capaForm.controls.findings)
    controlArray.push(this.capaForm.controls.root_cause)
    controlArray.push(this.capaForm.controls.preventive_actions)
    controlArray.push(this.capaForm.controls.corrective_actions)
    controlArray.push(this.capaForm.controls.planned_date)
    controlArray.push(this.capaForm.controls.assigned_personnel)
    controlArray.push(this.capaForm.controls.follow_up)
    controlArray.push(this.capaForm.controls.actual_date)
    controlArray.push(this.capaForm.controls.status)
    controlArray.push(this.capaForm.controls.accepter_id)
    controlArray.push(this.capaForm.controls.closure_date)
    controlArray.push(this.capaForm.controls.link)

    const imageArrayControl = <FormArray>this.capaForm.controls.images
    const fileArrayControl = <FormArray>this.capaForm.controls.files

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }

    if (imageArrayControl.value.length == 0) {
      imageArrayControl.disable()
    }

    if (fileArrayControl.value.length == 0) {
      fileArrayControl.disable()
    }

    console.log(this.capaForm.value)
  }

  public enableForm(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.capaForm.controls.capa_number)
    controlArray.push(this.capaForm.controls.reference_number)
    controlArray.push(this.capaForm.controls.creator_id)
    controlArray.push(this.capaForm.controls.capture_date)
    controlArray.push(this.capaForm.controls.reference)
    controlArray.push(this.capaForm.controls.description)
    controlArray.push(this.capaForm.controls.observer)
    controlArray.push(this.capaForm.controls.occurrence_date)
    controlArray.push(this.capaForm.controls.findings)
    controlArray.push(this.capaForm.controls.root_cause)
    controlArray.push(this.capaForm.controls.preventive_actions)
    controlArray.push(this.capaForm.controls.corrective_actions)
    controlArray.push(this.capaForm.controls.planned_date)
    controlArray.push(this.capaForm.controls.assigned_personnel)
    controlArray.push(this.capaForm.controls.follow_up)
    controlArray.push(this.capaForm.controls.actual_date)
    controlArray.push(this.capaForm.controls.status)
    controlArray.push(this.capaForm.controls.accepter_id)
    controlArray.push(this.capaForm.controls.closure_date)
    controlArray.push(this.capaForm.controls.link)
    controlArray.push(this.capaForm.controls.images)
    controlArray.push(this.capaForm.controls.files)

    for (let control of controlArray) {
      control.enable()
    }
  }

  public save(): void {
    if (this.data.id === undefined || this.data.id === null) {
      this.capture()
    } else {
      this.update()
    }
  }

  public capture(): void {
    this.cleanForm()
    if (this.capaForm.valid == true) {
      this.capaService.capture(this.capaForm.value).then(success => {
        this.enableForm()
        this.capaForm.removeControl('images')
        this.capaForm.removeControl('files')
        this.capaForm.addControl('images', this.formBuilder.array([]))
        this.capaForm.addControl('files', this.formBuilder.array([]))
      }, error => {
        this.enableForm()
      })
    }
  }

  public update(): void {
    this.cleanForm()
    if (this.capaForm.valid == true) {
      this.capaService.update(this.capaForm.value).then(success => {
        this.enableForm()
        this.capaForm.removeControl('images')
        this.capaForm.removeControl('files')
        this.capaForm.addControl('images', this.formBuilder.array([]))
        this.capaForm.addControl('files', this.formBuilder.array([]))
      }, error => {
        this.enableForm()
      })
    }
  }

  public back(): void {
    this.closeCapa.emit()
  }
}