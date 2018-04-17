import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { Language } from 'angular-l10n'
import { App, Events, MenuController, Nav, NavController } from 'ionic-angular'
import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend'
import { ToastsService } from '../../services/app.toasts'
import { TranslationService } from '../../services/app.translation'
import { EditProfile } from '../edit-profile/edit-profile'
import { NavbarPageComponent } from '../super-components/navbar.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavbarPageComponent implements OnInit {
  @Language() lang: string;

  nav: Nav
  userLogInInfo: FormGroup
  serverOnline: boolean = null

  constructor(public navCtrl: NavController, public server: BackendService, public translationService: TranslationService, private formBuilder: FormBuilder, public storage: Storage, protected app: App, public menuCtrl: MenuController, private toasts: ToastsService, public events: Events) {
    super(translationService, events, storage, server)
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
                // El usuario ya se encontraba conectado, así que se le da acceso a la aplicación
                if (user_id != null) {
                  this.events.publish('user:loggedIn', Date.now(), this.lang)
                  this.app.getRootNav().setRoot(EditProfile)
                  this.enableLocalizedMenu()
                }
              }
            )
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
    super.ngOnInit()
    this.userLogInInfo = this.formBuilder.group({
      username: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  // Esta funcion es invocada cuando el usuario hace clic en el boton de enviar
  // en el formulario de captura
  onLogInFormSubmit(): void {
    // guardamos los datos ingresados por el usuario en el formulario en una 
    // instancia de FormData
    let formData = new FormData()
    var rootNav = this.app.getRootNav()
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
          this.events.publish('user:loggedIn', Date.now(), this.lang);
          /*menuCtrl.enable(true, "es")
          menuCtrl.enable(true, "en")*/
        } else {
          toasts.showServiceErrorText("login", response.meta)
        }
      },
      (error: any, caught: Observable<void>) => {
        this.serverOnline = false
        this.toasts.showText("serverTakingTooLong")
        return []
      }
    )
  }

  checkServer() {
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

  enableLocalizedMenu() {
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
  
  // Reimplementamos la función de cambio de idioma para indicarle a
  // app.component que no debe de mostrar el sidenav al cambiar de idioma
  // en la pantalla de inicio de sesión
  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now(), true);
  }
}
