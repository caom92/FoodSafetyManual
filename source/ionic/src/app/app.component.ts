import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { NavController, Nav, Platform, MenuController, Events } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HttpModule } from '@angular/http'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { HomePage } from '../pages/home/home'
import { BackendService } from '../services/app.backend'
import { TranslationService } from '../services/app.translation'
import { DateTimeService } from '../services/app.time'
import { EditProfile } from '../pages/edit-profile/edit-profile'

import { ModulesPage } from '../pages/modules/modules'
import { LogsPage } from '../pages/logs/logs'

@Component({
  templateUrl: 'app.html',
  providers: [
    BackendService,
    TranslationService,
    DateTimeService
  ]
})

export class MyApp implements AfterViewInit {
  @ViewChild(Nav) nav: Nav
  @Language() lang: string

  rootPage: any = HomePage

  menuLangEn: boolean = this.lang == "en"
  menuLangEs: boolean = this.lang == "es"

  pages_en: Array<{title: string, component: any, icon: string}>
  pages_es: Array<{title: string, component: any, icon: string}>
  adminPages_en: Array<{title: string, component: any, icon: string}>
  adminPages_es: Array<{title: string, component: any, icon: string}>
  programPages: Array<{title: string, component: any, icon: string}>
  isAdminFlag: boolean = false

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public menuCtrl: MenuController, private server: BackendService, public events: Events, private translationService: TranslationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
    })

    events.subscribe("user:loggedIn", (time, lang) => {
      this.assignAdminFlag()
      this.updatePermissions()
      this.lang = lang
      this.menuLangEn = this.lang == "en"
      this.menuLangEs = this.lang == "es"
    })

    events.subscribe("language:changed", (lang, time) => {
      this.lang = lang
      this.menuLangEn = this.lang == "en"
      this.menuLangEs = this.lang == "es"
    })

    this.pages_en = [
      { title: 'Edit Profile', component: EditProfile, icon: "contact" }
    ]

    this.pages_es = [
      { title: 'Editar Perfil', component: EditProfile, icon: "contact" }
    ]

    this.programPages = []

    this.adminPages_en = [
      { title: 'Users', component: HomePage, icon: "people" },
      { title: 'Zones', component: HomePage, icon: "map" },
      { title: 'Programs', component: HomePage, icon: "copy" },
      { title: 'Supervisors', component: HomePage, icon: "medal" },
      { title: 'Signatures', component: HomePage, icon: "create" }
    ]

    this.adminPages_es = [
      { title: 'Usuarios', component: HomePage, icon: "people" },
      { title: 'Zonas', component: HomePage, icon: "map" },
      { title: 'Programas', component: HomePage, icon: "copy" },
      { title: 'Supervisores', component: HomePage, icon: "medal" },
      { title: 'Firmas', component: HomePage, icon: "create" }
    ]
  }

  updatePermissions(){
    this.programPages = []
    this.storage.get("privileges").then(
      data => {
        console.log("Privilegios del usuario conectado")
        console.log(JSON.parse(data))
        data = JSON.parse(data)
        console.log(data.zones[0])
        console.log("Programas")
        for(var program of data.zones[0].programs){
          this.programPages.push({title: program.name, component: EditProfile, icon:"build"})
        }
      }
    )
  }

  ionViewDidLoad() {
    this.updatePermissions()
  }

  ngAfterViewInit(){
    this.storage.get("lang").then(
      lang => {
        console.log("Lang in storage: " + lang)
        this.translationService.selectLanguage(lang)
        this.events.publish('language:changed', lang, Date.now())
        this.lang = lang
      },
      error => {
        this.lang = "es"
        this.translationService.selectLanguage("es")
        this.events.publish('language:changed', "es", Date.now())
        console.log("Error, no lang setted")
      }
    )
  }

  openPage(page) {
    // Simplemente, hacemos uso del controlador del navegador para empujar una nueva página
    this.nav.push(page.component)
  }

  openModules(event, program){
    console.log("openModules")
    console.log(program)
    this.nav.push(ModulesPage, {
      program: program
    })
  }

  closeSession(){
    this.server.update(
      'logout', 
      new FormData(), 
      (response: any) => {
        console.log(response)
        console.log(response.meta.return_code)
        if (response.meta.return_code == 0) {
          // si la sesion fue cerrada correctamente
          // redireccionamos al usuario a la pantalla de inicio de sesion
          // y limpiamos el contenido del Storage
          console.log("cierre de sesión")
          this.nav.setRoot(HomePage)
          this.menuCtrl.enable(false, "es")
          this.menuCtrl.enable(false, "en")
          this.storage.get("lang").then(
            lang => {
              this.storage.clear()
              this.storage.set("lang", lang)
              this.translationService.selectLanguage(lang)
              this.events.publish('language:changed', lang, Date.now());
              console.log("Set lang before logout: " + lang)
              console.log("Lang in storage: " + lang)
              this.lang = lang
            },
            error => {
              this.lang = "es"
              this.storage.clear()
              this.storage.set("lang", this.lang)
              this.translationService.selectLanguage(this.lang)
              this.events.publish('language:changed', "es", Date.now());
              console.log("Error, no lang setted")
              console.log("Set lang before logout: " + this.lang)
            }
          )
        } else {
          // si hubo un problema con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          //this.toastManager.showServiceErrorText('check-session', result.meta)
        }
      }
    )
  }

  isAdmin(){
    /*this.storage.get("role_name").then(
      data => {
        //this.isAdminFlag = (data == "Administrator")
      }
    )*/
  }

  assignAdminFlag(){
    this.storage.get("role_name").then(
      data => {
        if(data == "Administrator")
          this.isAdminFlag = true
        else
          this.isAdminFlag = false
        console.log(this.isAdminFlag)
      }
    )
  }

  isEnglish(){
    this.menuLangEn = true
    this.menuLangEs = false
    return this.lang == "en"
  }

  isSpanish(){
    this.menuLangEn = false
    this.menuLangEs = true
    return this.lang == "es"
  }
}

