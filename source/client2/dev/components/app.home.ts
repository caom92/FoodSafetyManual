import { Component, OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { TranslationService } from '../services/app.translation'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.home.html',
})
export class HomeComponent implements OnInit
{
  @Language() lang: string
  // La zona elegida por el director
  selectedZoneID: any = null
  
  // El constructor de este componente, inyectando los servicios requeridos
  constructor(
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private home: HomeElementsService,
    private langManager: LanguageService,
    private translationService: TranslationService
  ) {
  }

  // Esta funcion se ejecuta al iniciar la pagina
  ngOnInit(): void {
    // si no hay ningun idioma definimo, definimos el idioma español por defecto
    if (localStorage.getItem('lang') == null) {
      localStorage.setItem('lang', 'es')
      this.translationService.selectLanguage('es', 'ES')
    }

    if (localStorage.getItem('zone_id') != null && localStorage.getItem('zone_id') != null) {
      this.selectedZoneID = Number(localStorage.getItem('zone_id'))
    }

    // inicializamos los mensajes en el idioma adecuado
    this.langManager.initMessages()

    // si el usuario no ha iniciado sesion, coloca la bandera como falso
    if (localStorage.getItem('is_logged_in') === undefined) {
      localStorage.setItem('is_logged_in', 'false')
    }

    // idealmente, cuando el usuario navega a la pagina, deberiamos revisar el 
    // cookie de sesion en el servidor, sin embargo, como esta es una operacion 
    // asincrona, no se ajusta al modo de trabajo de ui-router, por lo que por 
    // lo pronto dependeremos de sessionStorage
    this.server.update(
      'check-session', 
      new FormData(), 
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.home.hideSpinner()
          if (!response.data) {
            // si el usuario no ha iniciado sesion, desactivamos la bandera y 
            // redireccionamos a la pantalla de inicio de sesion
            localStorage.setItem('is_logged_in', 'false')
            this.router.go('login')
          } else {
            // de lo contrario, permitimos la navegacion
            localStorage.setItem('is_logged_in', 'true')
            
            // no olvides desplegar el menu lateral de navegacion
            this.home.displaySideNav()

            // dependiendo del rol del usuario, se deben mostrar diferentes 
            // opciones en la aplicacion
            switch (this.home.roleName) {
              case 'Employee':
              case 'Manager':
                this.home.initProgramsMenu()
              break

              case 'Supervisor':
                this.home.initProgramsMenu()
                this.home.initSupervisorMenu(this.server, this.toastManager)
              break

              case 'Director':
                this.home.initProgramsMenu()
                this.home.initZoneMenu(this.server, this.toastManager)
              break
            }
          }
        } else {
          // si hubo un problema con la comunicacion con el servidor 
          // desplegamos un mensaje de error al usuario 
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'check-session', response.meta.return_code
            )
          )
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // this.server.update
  } // ngOnInit() 

  // Esta funcion se ejecuta cuando el usuario cambio el idioma de la pagina
  onLanguageButtonClicked(lang, country): void {
    this.langManager.changeLanguage(lang)
    this.translationService.selectLanguage(lang, country)
    $('select').material_select()
  }

  // Esta es la funcion que se invoca cuando el usuario hace clic en el boton 
  // de cerrar sesion
  onLogOutButtonClicked(): void {
    this.server.update(
      'logout', 
      new FormData(), 
      (response: any) => {
        if (response.meta.return_code == 0) {
          // si la sesion fue cerrada correctamente, desactivamos la bandera y 
          // redireccionamos al usuario a la pantalla de inicio de sesion
          let lang = localStorage.getItem('lang')
          localStorage.clear()
          localStorage.setItem('lang', lang)
          localStorage.setItem('is_logged_in', 'false')
          this.home.hideZoneMenu()
          this.home.programs = []
          this.router.go('login')
        } else {
          // si hubo un problema con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'logout', response.meta.return_code
            )
          )
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // this.server.update
  } // onLogOutButtonClicked()

  // Esta funcion se invoca cuando el usuario cambio de zona
  // [in]   selectedZone (uint): el ID de la zona elegida por el usuario
  onZoneSelectionChanged(): void {
    // instanciamos los datos que vamos a enviar al servidor
    let data = new FormData()
    data.append('zone_id', this.home.zone.id.toString())

    // enviamos al servidor el comando para cambiar de zona
    // TODO: Mandar mensaje de error cuando falle la ejecución de este servicio
    this.server.update(
      'director-change-zones',
      data,
      (response: any) => {
        if (response.meta.return_code == 0) {
          // cambiamos la zona actual por la nueva
          this.home.zoneName = response.data.name
          this.home.zoneID = Number(response.data.id)
          this.home.companyName = response.data.company_name
          this.home.companyAddress = response.data.address
          this.home.companyLogo = response.data.logo_path
        } 

        // damos retroalimentacion al usuario del resultado de esta operacion
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'director-change-zones', 
            response.meta.return_code
          )
        ) // this.toastManager.showServiceErrorText
      }, (error: any, caught: Observable<void>) => {
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'director-change-zones',
            404
          )
        )
        console.log('error message', this.langManager.getServiceMessage(
          'director-change-zones',
          404
        ))
        this.selectedZoneID = Number(localStorage.getItem('zone_id'))
        setTimeout(() => {
          $('select').material_select('destroy')
          $('select').material_select()
        })
        // this.home.zoneID = Number(localStorage.zone_id)
        // console.log(this.home.zone)
        // console.log(this.home.zone.id)
        return []
      } // (response: Response)
    ) // this.server.update
  } // onZoneSelectionChanged(selectedZoneID)
} // export class HomeComponent implements OnInit
