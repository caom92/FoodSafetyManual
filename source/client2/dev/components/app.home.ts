import { Component, OnInit } from '@angular/core'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.home.html',
})
export class HomeComponent implements OnInit
{
  selectedZoneID: any = null
  
  // El constructor de este componente, inyectando los servicios requeridos
  constructor(
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private home: HomeElementsService,
    private langManager: LanguageService
  ) {
  }

  // Esta funcion se ejecuta al iniciar la pagina
  ngOnInit() {
    // si no hay ningun idioma definimo, definimos el idioma español por defecto
    if (localStorage.lang == null) {
      localStorage.lang = 'es'
    }

    // inicializamos los mensajes en el idioma adecuado
    this.langManager.initMessages()

    // si el usuario no ha iniciado sesion, coloca la bandera como falso
    if (localStorage.is_logged_in === undefined) {
      localStorage.is_logged_in = false
    }

    // idealmente, cuando el usuario navega a la pagina, deberiamos revisar el 
    // cookie de sesion en el servidor, sin embargo, como esta es una operacion 
    // asincrona, no se ajusta al modo de trabajo de ui-router, por lo que por 
    // lo pronto dependeremos de sessionStorage
    this.server.update(
      'check-session', 
      new FormData(), 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          this.home.hideSpinner()
          if (!result.data) {
            // si el usuario no ha iniciado sesion, desactivamos la bandera y 
            // redireccionamos a la pantalla de inicio de sesion
            localStorage.is_logged_in = false
            this.router.go('login')
          } else {
            // de lo contrario, permitimos la navegacion
            localStorage.is_logged_in = true
            
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
              'check-session', result.meta.return_code
            )
          )
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // this.server.update
  } // ngOnInit() 

  // Esta funcion se ejecuta cuando el usuario cambio el idioma de la pagina
  onLanguageButtonClicked(lang) {
    this.langManager.changeLanguage(lang)
  }

  // Esta es la funcion que se invoca cuando el usuario hace clic en el boton 
  // de cerrar sesion
  onLogOutButtonClicked() {
    this.server.update(
      'logout', 
      new FormData(), 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          // si la sesion fue cerrada correctamente, desactivamos la bandera y 
          // redireccionamos al usuario a la pantalla de inicio de sesion
          let lang = localStorage.lang
          localStorage.clear()
          localStorage.lang = lang
          localStorage.is_logged_in = false
          this.home.hideZoneMenu()
          this.router.go('login')
        } else {
          // si hubo un problema con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'logout', result.meta.return_code
            )
          )
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // this.server.update
  } // onLogOutButtonClicked()

  // Esta funcion se invoca cuando el usuario cambio de zona
  // [in]   selectedZone (uint): el ID de la zona elegida por el usuario
  onZoneSelectionChanged() {
    console.log(this.selectedZoneID)
    // instanciamos los datos que vamos a enviar al servidor
    let data = new FormData()
    data.append('zone_id', this.selectedZoneID.toString())

    // enviamos al servidor el comando para cambiar de zona
    this.server.update(
      'director-change-zones',
      data,
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          // cambiamos la zona actual por la nueva
          this.home.zoneName = result.data.name
          this.home.zoneID = result.data.id
        } 

        // damos retroalimentacion al usuario del resultado de esta operacion
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'director-change-zones', 
            result.meta.return_code
          )
        ) // this.toastManager.showServiceErrorText
      } // (response: Response)
    ) // this.server.update
  } // onZoneSelectionChanged(selectedZoneID)
} // export class HomeComponent implements OnInit
