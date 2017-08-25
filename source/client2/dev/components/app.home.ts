import { Component, OnInit } from '@angular/core'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { HomeElementsService } from '../services/app.home'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.home.html',
})
export class HomeComponent implements OnInit
{
  constructor(
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private home: HomeElementsService
  ) {
  }

  // Esta funcion se ejecuta al iniciar la pagina
  ngOnInit() {
    // si no hay ningun idioma definimo, definimos el idioma español por defecto
    if (localStorage.lang === undefined) {
      localStorage.lang = 'es'
    }

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
          if (!result.data) {
            // si el usuario no ha iniciado sesion, desactivamos la bandera y 
            // redireccionamos a la pantalla de inicio de sesion
            localStorage.is_logged_in = false
            this.router.go('login')
          } else {
            // de lo contrario, permitimos la navegacion
            localStorage.is_logged_in = true
            if (localStorage.role_name == 'Director') {
              this.server.update(
                'list-zones',
                new FormData(),
                (response: Response) => {
                  let result = JSON.parse(response['_body'].toString())
                  if (result.meta.return_code == 0) {
                    this.home.zones = result.data
                    this.home.displayZoneMenu()
                  } else {
                    // si algo ocurrio con la comunicacion con el servidor, 
                    // desplegamos un mensaje de error al usuario
                    this.toastManager.showServiceErrorText(
                      'list-zones', 
                      result.meta
                    )
                  }
                }
              )
            }
          }
        } else {
          // si hubo un problema con la comunicacion con el servidor 
          // desplegamos un mensaje de error al usuario 
          this.toastManager.showServiceErrorText('check-session', result.meta)
        }
      }
    )
  }

  // Esta funcion se ejecuta cuando el usuario cambio el idioma de la pagina
  onLanguageButtonClicked(lang) {
    localStorage.lang = lang
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
          localStorage.is_logged_in = false
          this.home.hideZoneMenu()
          this.router.go('login')
        } else {
          // si hubo un problema con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          this.toastManager.showServiceErrorText('check-session', result.meta)
        }
      }
    )
  }

  // Esta funcion se invoca cuando el usuario cambio de zona
  // [in]   selectedZone (uint): el ID de la zona elegida por el usuario
  onZoneSelectionChanged(selectedZoneID) {
    // instanciamos los datos que vamos a enviar al servidor
    let data = new FormData()
    data.append('zone_id', selectedZoneID)

    // enviamos al servidor el comando para cambiar de zona
    this.server.update(
      'director-change-zones',
      data,
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          // cambiamos la zona actual por la nueva
          localStorage.zone_name = result.data.name
          localStorage.zone_id = result.data.id

          // damos retroalimentacion al usuario
          this.toastManager.showText('zoneChanged')
        } else {
          // si hubo un problema con la comunicacion con el servidor
          // le anunciamos al usuario
          this.toastManager.showServiceErrorText(
            'director-change-zones', 
            result.meta
          )
        }
      }
    )
  }
}
