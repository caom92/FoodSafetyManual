import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, NavController, Select, App, MenuController, ToastController } from 'ionic-angular';
import { BackendService } from '../../services/app.backend';
import { StateService } from '@uirouter/angular'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { TranslationService } from '../../services/app.translation';
import { ToastService } from '../../services/app.toasts';

import { EditProfile } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})
export class HomePage implements OnInit {
  //@ViewChild(Nav) nav: Nav;
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  nav: Nav
  userLogInInfo: FormGroup
  
  constructor(public navCtrl: NavController, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder, private storage: Storage, protected app: App, public menuCtrl: MenuController, private toasts: ToastService) {

  }

  private mapUserDataToLocalStorage(userData) {
    this.storage.set("user_id", userData.user_id)
    this.storage.set("role_id", userData.role_id)
    this.storage.set("role_name", userData.role_name)
    this.storage.set("exclusive_access", userData.exclusive_access)
    this.storage.set("employee_num", userData.employee_num)
    this.storage.set("first_name", userData.first_name)
    this.storage.set("last_name", userData.last_name)
    this.storage.set("full_name", userData.first_name + " " + userData.last_name)
    this.storage.set("login_name", userData.login_name)
    this.storage.set("company", userData.company)
    this.storage.set("logo", userData.logo)
    this.storage.set("address", userData.address)

    if (userData.zone_id !== undefined) {
      this.storage.set("zone_id", userData.zone_id)
      this.storage.set("zone_name", userData.zone_name)
    }

    if (userData.privileges !== undefined) {
      this.storage.set("privileges", JSON.stringify(userData.privileges))
    }

    if (userData.zone_list !== undefined) {
      this.storage.set("zone_list", JSON.stringify(userData.zone_list))
    }

    if (userData.log_list !== undefined) {
      this.storage.set("log_list", JSON.stringify(userData.log_list))
    }
    this.storage.forEach(function(value, key, iterationNumber){
      console.log("key: " + key + ", value: " + value);
    })
  }

  ngOnInit() {
    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes
    if(localStorage["__mydb/_ionickv/is_logged_in"] == "true"){
      this.app.getRootNav().setRoot(EditProfile)
      this.menuCtrl.enable(true)
    }
    console.log(localStorage["__mydb/_ionickv/is_logged_in"])
    this.userLogInInfo = this.formBuilder.group({
      username: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
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

  // Esta funcion es invocada cuando el usuario hace clic en el boton de enviar
  // en el formulario de captura
  onLogInFormSubmit(): void {
    // guardamos los datos ingresados por el usuario en el formulario en una 
    // instancia de FormData
    let formData = new FormData()
    var rootNav = this.app.getRootNav()
    var menuCtrl = this.menuCtrl
    var toasts = this.toasts
    formData.append('username', this.userLogInInfo.value.username)
    formData.append('password', this.userLogInInfo.value.password)

    // enviamos los datos al servidor
    this.server.update(
      'login', 
      formData, 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          toasts.showText("loggedIn");
          this.storage.set("is_logged_in", true)
          this.mapUserDataToLocalStorage(result.data)
          rootNav.setRoot(EditProfile)
          menuCtrl.enable(true)
        } else {
          toasts.showServiceErrorText("login", result.meta)
          console.log(result.meta.message)
        }
      }
    )
  }
}
