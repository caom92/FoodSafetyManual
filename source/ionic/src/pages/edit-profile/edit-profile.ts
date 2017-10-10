import { Component, ViewChild, OnInit } from '@angular/core'
import { NavController, NavParams, Select, Events } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { GMPPackingPreopReportComponent } from '../reports/gmp-packing-preop/report/gmp.packing.preop.report'

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
export class EditProfile /*implements OnInit*/ {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  selectedItem: any
  username: string = ""
  employeeID: string = ""
  realname: string = ""
  lstorage: string

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder, private storage: Storage, private toasts: ToastService, public events: Events) {
    this.selectedItem = navParams.get('item');
  }

  ionViewWillEnter() {
    this.storage.get("privileges").then(
      data => {
        console.log("Resultado de la promesa")
        console.log(JSON.parse(data))
        console.log("Fin resultado de la promesa")
      },
      error => {
        console.log("Error")
      }
    )

    this.events.publish('user:loggedIn', Date.now(), this.lang);

    this.lstorage = JSON.stringify(localStorage)

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

  isEnglish(){
    return this.lang == "en"
  }

  isSpanish(){
    return this.lang == "es"
  }

  isDirector(){
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
    console.log("Mostrar HTML Interno")
    console.log(document.getElementById("tableWrapper").innerHTML)
    this.lstorage = document.getElementById("tableWrapper").innerHTML
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}