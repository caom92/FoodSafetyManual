import { Component, ViewChild } from '@angular/core'
import { NavController, NavParams, Select, Events } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { NavbarPageComponent } from '../super-components/navbar.component'

import { GMPPackingScaleCalibrationInventoryComponent } from '../inventories/gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class EditProfile extends NavbarPageComponent {
  @Language() lang: string

  username: string = ""
  employeeID: string = ""
  realname: string = ""

  // Configuramos el formulario con valores iniciales vacios y las reglas de 
  // validacion correspondientes

  userLogInInfo: FormGroup = this.formBuilder.group({
    username: [ this.username ],
    employeeID: [ this.employeeID ],
    realname: [ this.realname ]
  })

  changePassword: FormGroup = this.formBuilder.group({
    newPassword: [ "", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
    checkPassword: [ "", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
    currentPassword: [ "", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])]
  })

  changeUsername: FormGroup = this.formBuilder.group({
    newUsername: [ "", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])],
    currentPassword: [ "", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])]
  })

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: BackendService, public translationService: TranslationService, private formBuilder: FormBuilder, public storage: Storage, private toasts: ToastService, public events: Events) {
    super(translationService, events, storage)
  }

  ionViewWillEnter() {
    this.storage.get('login_name').then((login_name) => {
      this.username = login_name;
    })

    this.storage.get('user_id').then((user_id) => {
      this.employeeID = user_id;
    })

    this.storage.get('full_name').then((full_name) => {
      this.realname = full_name;
    })
  }

  onChangePasswordFormSubmit(): void{
    let formData = new FormData()
    this.storage.get("user_id").then(
      data => {  
        formData.append('user_id', data)
        formData.append('password', this.changePassword.value.currentPassword)
        formData.append('new_password', this.changePassword.value.newPassword)

        // enviamos los datos al servidor
        this.server.update(
          'change-password', 
          formData, 
          (response: any) => {
            if (response.meta.return_code == 0) {
              this.toasts.showText("passwordChanged")
              this.changePassword.reset()
            } else {
              // si algo ocurrio con la comunicacion con el servidor, desplegamos 
              // un mensaje de error al usuario
              this.toasts.showServiceErrorText("login", response.meta)
            }
          }
        )
      }
    )
  }

  onChangeUsernameFormSubmit(): void{
    let newUsername = this.changeUsername.value.newUsername
    let data = new FormData()
    data.append('new_username', newUsername)
    data.append('password', this.changeUsername.value.currentPassword)
    this.server.update(
      'change-username',
      data,
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.toasts.showText("usernameChanged")
          this.changeUsername.reset()
          this.storage.set("login_name", newUsername)
          this.username = newUsername
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toasts.showServiceErrorText('change-username', response.meta)
        }
      }
    )
  }
}