import { Component, Input } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { DataResolverService } from '../../../../services/data-resolver.service'
import { RegisterService } from '../../../../services/register.service'
import { EditRegisterModal } from '../../register-common/edit-register-modal/edit-register-modal.component'
import { FinishedProductEntryInterface } from '../interfaces/finished-product.interface'

@Component({
  templateUrl: './finished-product-edit-modal.component.html',
  styleUrls: ['./finished-product-edit-modal.component.css']
})

export class FinishedProductEditRegisterModalComponent extends EditRegisterModal {
  @Input() register: FinishedProductEntryInterface
  @Input() codes: Array<any>
  @Input() status: Array<any>
  private codesAutocomplete: { data: { [key: string]: string }, limit: number, onAutocomplete: Function } = { data: {}, limit: 5, onAutocomplete: this.onCodeAutocomplete() }

  constructor(langManager: LanguageService, private registerService: RegisterService, private _fb: FormBuilder, private dataResolver: DataResolverService) {
    super(langManager)
  }

  public ngOnInit(): void {
    super.ngOnInit()

    this.registerForm = this._fb.group({
      captured_register_id: [this.dataResolver.resolveNumber(this.register.captured_register_id), [Validators.required]],
      date: [this.dataResolver.resolveString(this.register.capture_date), [CustomValidators.dateValidator()]],
      code: [this.dataResolver.resolveString(this.register.code), [Validators.required]],
      //description: [this.dataResolver.resolveString(this.register.description), [Validators.required]],
      folio: [this.dataResolver.resolveString(this.register.folio), []],
      temperature: [this.dataResolver.resolveNumber(this.register.temperature), []],
      color: [this.dataResolver.resolveNumber(this.register.color), []],
      label: [this.dataResolver.resolveBoolean(this.register.label), []],
      weight: [this.dataResolver.resolveBoolean(this.register.weight), []],
      traceability: [this.dataResolver.resolveBoolean(this.register.traceability), []],
      //small_count: [this.dataResolver.resolveNumber(this.register.small_count), []],
      //big_count: [this.dataResolver.resolveNumber(this.register.big_count), []],
     //deformation: [this.dataResolver.resolveNumber(this.register.deformation), []],
      insect_damage: [this.dataResolver.resolveNumber(this.register.insect_damage), []],
      //scarring: [this.dataResolver.resolveNumber(this.register.scarring), []],
      decoloration: [this.dataResolver.resolveNumber(this.register.decoloration), []],
      dehydration: [this.dataResolver.resolveNumber(this.register.dehydration), []],
      mechanical_damage: [this.dataResolver.resolveNumber(this.register.mechanical_damage), []],
      soggy: [this.dataResolver.resolveNumber(this.register.soggy), []],
      decay: [this.dataResolver.resolveNumber(this.register.decay), []],
      wrinkly: [this.dataResolver.resolveNumber(this.register.wrinkly), []],
      busted: [this.dataResolver.resolveNumber(this.register.busted), []],
      //mushiness: [this.dataResolver.resolveNumber(this.register.mushiness), []],
      //bruises: [this.dataResolver.resolveNumber(this.register.bruises), []],
      status_id: [this.dataResolver.resolveNumber(this.register.status_id), []],
      sampling: [this.dataResolver.resolveNumber(this.register.sampling), []],
      exposition_temperature: [this.dataResolver.resolveNumber(this.register.exposition_temperature), []],
      notes: [this.dataResolver.resolveString(this.register.notes), []]
    })

    for (let code of this.codes) {
      this.codesAutocomplete.data[code.code] = null
    }

    setTimeout(() => {
      $('select').material_select()
    }, 100)
  }

  public editionCheck(): void {
    this.isEditable = false
    const role: string = String(localStorage.getItem('role_name'))

    if (role == 'Supervisor') {
      this.isEditable = true
    } else if (role == 'Employee') {
      if (this.register.supervisor_id == null) {
        this.isEditable = true
      }
    }
  }

  public editRegister(): void {
    this.cleanForm()
    if (this.registerForm.valid == true) {
      this.registerService.edit('finished-product', this.registerForm.value).then(success => {
        this.register.capture_date = success.capture_date
        this.register.code = success.code
        //this.register.description = success.description
        this.register.folio = success.folio
        this.register.color = success.color
        this.register.label = success.label
        this.register.weight = success.weight
        this.register.traceability = success.traceability
        //this.register.small_count = success.small_count
        //this.register.big_count = success.big_count
        //this.register.deformation = success.deformation
        this.register.insect_damage = success.insect_damage
        //this.register.scarring = success.scarring
        this.register.decoloration = success.decoloration
        this.register.dehydration = success.dehydration
        this.register.mechanical_damage = success.mechanical_damage
        this.register.soggy = success.soggy
        this.register.decay = success.decay
        this.register.wrinkly = success.wrinkly
        this.register.busted = success.busted
        //this.register.mushiness = success.mushiness
        //this.register.bruises = success.bruises
        this.register.status_id = success.status_id
        this.register.status_name = success.status_name
        this.register.sampling = success.sampling
        this.register.exposition_temperature = success.exposition_temperature
        this.register.notes = success.notes

        this.registerForm.enable()
        this.editModal.closeModal()
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
    //this.registerForm.controls.code.setValue(this.registerForm.controls.code.value.toUpperCase())
    //let selectedCode = this.codes.find(x => x.code == this.registerForm.controls.code.value)
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
