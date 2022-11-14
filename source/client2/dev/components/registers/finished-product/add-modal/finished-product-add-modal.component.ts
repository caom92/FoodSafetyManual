import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { RegisterService } from '../../../../services/register.service'
import { TextAutocomplete } from '../../../product-data/viewer/product-data-viewer.interface'
import { AddRegisterModal } from '../../register-common/add-register-modal/add-register-modal.component'
import { FinishedProductEntryInterface } from '../interfaces/finished-product.interface'

@Component({
  templateUrl: './finished-product-add-modal.component.html',
  styleUrls: ['./finished-product-add-modal.component.css']
})

export class FinishedProductAddRegisterModalComponent extends AddRegisterModal {
  dateConfig
  registerForm: FormGroup
  @Input() onClose: (register: FinishedProductEntryInterface) => {}
  @Input() codes: Array<any>
  @Input() status: Array<any>
  private codesAutocomplete: { data: { [key: string]: string }, limit: number, onAutocomplete: Function } = { data: {}, limit: 5, onAutocomplete: this.onCodeAutocomplete() }

  constructor(private registerService: RegisterService, private langManager: LanguageService, private _fb: FormBuilder) {
    super()
  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.registerForm = this._fb.group({
      date: [null, [CustomValidators.dateValidator(), Validators.required]],
      code: ['', [Validators.required]],
      //description: ['', [Validators.required]],
      folio: [null, []],
      temperature: [null, []],
      color: [null, []],
      label: [null, []],
      weight: [null, []],
      traceability: [null, []],
      //small_count: [null, []],
      //big_count: [null, []],
      //deformation: [null, []],
      insect_damage: [null, []],
      //scarring: [null, []],
      decoloration: [null, []],
      dehydration: [null, []],
      mechanical_damage: [null, []],
      soggy: [null, []],
      decay: [null, []],
      wrinkly: [null, []],
      busted: [null, []],
      //mushiness: [null, []],
      //bruises: [null, []],
      status_id: [null, []],
      sampling: [100, []],
      exposition_temperature: [null, []],
      notes: [null, []]
    })

    for (let code of this.codes) {
      this.codesAutocomplete.data[code.code] = null
    }

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public addRegister(close: boolean = false): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.add('finished-product', this.registerForm.value).then(success => {
        this.onClose({
          id: success,
          captured_register_id: success,
          capture_date: this.registerForm.value.date,
          code: this.registerForm.value.code,
          submitter_first_name: localStorage.getItem('user_full_name'),
          submitter_last_name: '',
          //description: this.registerForm.value.description,
          folio: this.registerForm.value.folio,
          color: this.registerForm.value.color,
          label: this.registerForm.value.label,
          weight: this.registerForm.value.weight,
          traceability: this.registerForm.value.traceability,
          //small_count: this.registerForm.value.small_count === undefined ? 0 : this.registerForm.value.small_count,
          //big_count: this.registerForm.value.big_count === undefined ? 0 : this.registerForm.value.big_count,
          //deformation: this.registerForm.value.deformation === undefined ? 0 : this.registerForm.value.deformation,
          insect_damage: this.registerForm.value.insect_damage === undefined ? 0 : this.registerForm.value.insect_damage,
          //scarring: this.registerForm.value.scarring === undefined ? 0 : this.registerForm.value.scarring,
          decoloration: this.registerForm.value.decoloration === undefined ? 0 : this.registerForm.value.decoloration,
          dehydration: this.registerForm.value.dehydration === undefined ? 0 : this.registerForm.value.dehydration,
          mechanical_damage: this.registerForm.value.mechanical_damage === undefined ? 0 : this.registerForm.value.mechanical_damage,
          soggy: this.registerForm.value.soggy === undefined ? 0 : this.registerForm.value.soggy,
          decay: this.registerForm.value.decay === undefined ? 0 : this.registerForm.value.decay,
          wrinkly: this.registerForm.value.wrinkly === undefined ? 0 : this.registerForm.value.wrinkly,
          busted: this.registerForm.value.busted === undefined ? 0 : this.registerForm.value.busted,
          //mushiness: this.registerForm.value.mushiness === undefined ? 0 : this.registerForm.value.mushiness,
          //bruises: this.registerForm.value.bruises === undefined ? 0 : this.registerForm.value.bruises,
          status_id: this.registerForm.value.status_id,
          status_name: this.status.find(x => x.id == this.registerForm.value.status_id).name,
          sampling: this.registerForm.value.sampling,
          exposition_temperature: this.registerForm.value.exposition_temperature,
          notes: this.registerForm.value.notes,
          submitter_id: Number(localStorage.getItem('user_id')),
          signable: 0,
          signature_path: null,
          supervisor_id: null,
          gp_signable: 0,
          gp_supervisor_id: null,
          gp_signature_path: null,
          zone_id: Number(localStorage.getItem('zone_id')),
          zone: localStorage.getItem('zone_name')
        })

        this.registerForm.enable()
        this.registerForm.reset()

        if (close === true) {
          this.addModal.closeModal()
        }
      }, error => {
        this.registerForm.enable()
      })
    } else {
      this.registerForm.enable()
    }
  }

  public onCodeAutocomplete(): Function {
    return (value) => {
      this.registerForm.controls.code.setValue(value)
    }
  }

  public onCodeChange(): void {
    //console.log(this.registerForm.controls.code.value)
    //this.registerForm.controls.code.setValue(this.registerForm.controls.code.value.toUpperCase())
    //let selectedCode = this.codes.find(x => x.code == this.registerForm.controls.code.value)
    //console.log(this.registerForm.controls.code.value)
    //console.log('selectedCode', selectedCode)
    /*if (selectedCode !== undefined) {
      this.registerForm.controls.description.setValue(selectedCode.description)
    } else {
      this.registerForm.controls.description.setValue('')
    }*/
  }

  public cleanForm(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.registerForm.controls.folio)
    controlArray.push(this.registerForm.controls.temperature)
    controlArray.push(this.registerForm.controls.color)
    controlArray.push(this.registerForm.controls.label)
    controlArray.push(this.registerForm.controls.weight)
    controlArray.push(this.registerForm.controls.traceability)
    //controlArray.push(this.registerForm.controls.small_count)
    //controlArray.push(this.registerForm.controls.big_count)
    //controlArray.push(this.registerForm.controls.deformation)
    controlArray.push(this.registerForm.controls.insect_damage)
    //controlArray.push(this.registerForm.controls.scarring)
    controlArray.push(this.registerForm.controls.decoloration)
    controlArray.push(this.registerForm.controls.dehydration)
    controlArray.push(this.registerForm.controls.mechanical_damage)
    controlArray.push(this.registerForm.controls.soggy)
    controlArray.push(this.registerForm.controls.decay)
    controlArray.push(this.registerForm.controls.wrinkly)
    controlArray.push(this.registerForm.controls.busted)
    //controlArray.push(this.registerForm.controls.mushiness)
    //controlArray.push(this.registerForm.controls.bruises)
    controlArray.push(this.registerForm.controls.status_id)
    controlArray.push(this.registerForm.controls.sampling)
    controlArray.push(this.registerForm.controls.exposition_temperature)
    controlArray.push(this.registerForm.controls.notes)

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }
  }
}
