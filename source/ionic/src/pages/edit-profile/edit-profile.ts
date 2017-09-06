import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Select } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})
export class EditProfile implements OnInit {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  userLogInInfo: FormGroup
  changePassword: FormGroup
  changeUsername: FormGroup

  selectedItem: any
  username: string
  employeeID: string
  realname: string
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder, private storage: Storage, private toasts: ToastService) {
    this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.username = "default"
    this.employeeID = "default"
    this.realname = "default"

    this.storage.get('login_name').then((login_name) => {
      this.username = login_name;
    })

    this.storage.get('user_id').then((user_id) => {
      this.employeeID = user_id;
    })

    this.storage.get('full_name').then((full_name) => {
      this.realname = full_name;
    })

    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes
    this.userLogInInfo = this.formBuilder.group({
      username: [ this.username ],
      employeeID: [ this.employeeID ],
      realname: [ this.realname ]
    })

    this.changePassword = this.formBuilder.group({
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

    this.changeUsername = this.formBuilder.group({
      newUsername: [ "", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      currentPassword: [ "", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  onChangePasswordFormSubmit(): void{
    let formData = new FormData()
    //var toasts = this.toasts
    formData.append('user_id', JSON.parse(localStorage["__mydb/_ionickv/user_id"]))
    formData.append('password', this.changePassword.value.currentPassword)
    formData.append('new_password', this.changePassword.value.newPassword)

    // enviamos los datos al servidor
    this.server.update(
      'change-password', 
      formData, 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          this.toasts.showText("passwordChanged")
          this.changePassword.reset()
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toasts.showServiceErrorText("login", result.meta)
        }
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
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          this.toasts.showText("usernameChanged")
          this.changeUsername.reset()
          localStorage["__mydb/_ionickv/username"] = newUsername
          this.username = newUsername
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toasts.showServiceErrorText('change-username', result.meta)
        }
      }
    )
  }

  isDirector(){
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}