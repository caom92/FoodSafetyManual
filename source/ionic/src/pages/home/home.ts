import { Component, ViewChild, OnInit } from '@angular/core'
import { Nav, NavController, Select, App, MenuController, ToastController, Events } from 'ionic-angular'
import { StateService } from '@uirouter/angular'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

import { EditProfile } from '../edit-profile/edit-profile'

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
  serverOnline: boolean = null
  
  constructor(public navCtrl: NavController, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder, private storage: Storage, protected app: App, public menuCtrl: MenuController, private toasts: ToastService, public events: Events) {
    
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
  }

  ionViewCanEnter() {
    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes

    this.checkServer()

    // Revisar si el usuario se encuentra conectado
    this.server.update(
      'check-session', 
      new FormData(), 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (!response.data) {
            // si el usuario no ha iniciado sesion, desactivamos la bandera y 
            // redireccionamos a la pantalla de inicio de sesion
            this.menuCtrl.enable(false, "es")
            this.menuCtrl.enable(false, "en")
            //this.app.getRootNav().setRoot(HomePage)
          } else {
            this.storage.get("user_id").then(
              user_id => {
                console.log(user_id)
                if(user_id != null){
                  this.app.getRootNav().setRoot(EditProfile)
                  this.enableLocalizedMenu()
                }
              }
            )
            /*this.menuCtrl.enable(true, "es")
            this.menuCtrl.enable(true, "en")*/
            // de lo contrario, permitimos la navegacion
            /*localStorage.is_logged_in = true
            this.home.roleName = localStorage.role_name
            if (localStorage.role_name == 'Director') {
              this.server.update(
                'list-zones',
                new FormData(),
                (response: any) => {
                  if (response.meta.return_code == 0) {
                    this.home.zones = response.data
                    this.home.displayZoneMenu()
                  } else {
                    // si algo ocurrio con la comunicacion con el servidor, 
                    // desplegamos un mensaje de error al usuario
                    this.toastManager.showServiceErrorText(
                      'list-zones', 
                      response.meta
                    )
                  }
                }
              )
            }*/
          }
        } else {
          // si hubo un problema con la comunicacion con el servidor 
          // desplegamos un mensaje de error al usuario 
          this.toasts.showServiceErrorText('check-session', response.meta)
        }
      }
    )
  }

  ngOnInit() {
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
    this.events.publish('language:changed', selectedValue, Date.now());
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
      (response: any) => {
        if (response.meta.return_code == 0) {
          toasts.showText("loggedIn");
          this.storage.set("is_logged_in", true)
          this.mapUserDataToLocalStorage(response.data)
          rootNav.setRoot(EditProfile)
          this.enableLocalizedMenu()
          /*menuCtrl.enable(true, "es")
          menuCtrl.enable(true, "en")*/
        } else {
          toasts.showServiceErrorText("login", response.meta)
          console.log(response.meta.message)
        }
      },
      (error: any, caught: Observable<void>) => {
        this.serverOnline = false
        this.toasts.showText("serverTakingTooLong")
        return []
      }
    )
  }

  checkServer(){
    console.log("Check server again...")
    this.serverOnline = null
    this.server.update(
      'status',
      new FormData(),
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.serverOnline = response.data
        } else {
          this.serverOnline = false
        }
      },
      (error: any, caught: Observable<void>) => {
        this.serverOnline = false
        return []
      }
    )
  }

  enableLocalizedMenu(){
    this.storage.get("lang").then(
      lang => {
        console.log("Lang was set, reading value")
        this.lang = lang
        this.menuCtrl.enable(false)
        this.menuCtrl.enable(true, lang)
      },
      error => {
        console.log("Lang wasn't set, using default value")
        this.lang = "es"
        this.menuCtrl.enable(false)
        this.menuCtrl.enable(true, this.lang)
      }
    )
  }
}
