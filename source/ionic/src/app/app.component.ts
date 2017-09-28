import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { HomePage } from '../pages/home/home';
import { BackendService } from '../services/app.backend';
import { TranslationService } from '../services/app.translation';
import { EditProfile } from '../pages/edit-profile/edit-profile';

import { ModulesPage } from '../pages/modules/modules';
import { LogsPage } from '../pages/logs/logs';

@Component({
  templateUrl: 'app.html',
  providers: [
    BackendService,
    TranslationService
  ]
})
export class MyApp implements AfterViewInit{
  @ViewChild(Nav) nav: Nav;
  @Language() lang: string;

  rootPage:any = HomePage;

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
      statusBar.styleDefault();
      splashScreen.hide();
    });

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
    ];

    this.pages_es = [
      { title: 'Editar Perfil', component: EditProfile, icon: "contact" }
    ];

    this.programPages = []

    this.programPages = [
      /*{ title: 'GMP', component: EditProfile, icon: "build" },
      { title: 'GAP', component: EditProfile, icon: "build" }*/
    ];

    this.adminPages_en = [
      { title: 'Users', component: HomePage, icon: "people" },
      { title: 'Zones', component: HomePage, icon: "map" },
      { title: 'Programs', component: HomePage, icon: "copy" },
      { title: 'Supervisors', component: HomePage, icon: "medal" },
      { title: 'Signatures', component: HomePage, icon: "create" }
    ];

    this.adminPages_es = [
      { title: 'Usuarios', component: HomePage, icon: "people" },
      { title: 'Zonas', component: HomePage, icon: "map" },
      { title: 'Programas', component: HomePage, icon: "copy" },
      { title: 'Supervisores', component: HomePage, icon: "medal" },
      { title: 'Firmas', component: HomePage, icon: "create" }
    ];
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

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    /*if(page.component == EditProfile && false){
      this.nav.setRoot(page.component)
    } else {*/
      this.nav.push(page.component)
    /*}*/
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
        if (result.meta.return_code == 0) {
          // si la sesion fue cerrada correctamente
          // redireccionamos al usuario a la pantalla de inicio de sesion
          // y limpiamos el contenido del Storage
          this.storage.clear()
          this.nav.setRoot(HomePage)
          this.menuCtrl.enable(false, "es")
          this.menuCtrl.enable(false, "en")
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

