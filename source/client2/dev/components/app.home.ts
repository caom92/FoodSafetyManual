import { Component, OnInit } from '@angular/core'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.home.html',
  providers: [
    BackendService,
    ToastService
  ]
})
export class HomeComponent implements OnInit
{
  isDirector = false
  zones = []
  userFullName = null

  constructor(
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService
  ) {
  }

  // Esta funcion se ejecuta al iniciar la pagina
  ngOnInit() {
    // si no hay ningun idioma definimo, definimos el idioma español por defecto
    if (localStorage.lang === undefined) {
      localStorage.lang = 'es'
    }

    // si el usuario no ha iniciado sesion, coloca la bandera como falso
    if (sessionStorage.is_logged_in === undefined) {
      sessionStorage.is_logged_in = false
    }

    // idealmente, cuando el usuario navega a la pagina, deberiamos revisar el 
    // cookie de sesion en el servidor, sin embargo, como esta es una operacion 
    // asincrona, no se ajusta al modo de trabajo de ui-router, por lo que por 
    // lo pronto dependeremos de sessionStorage
    // this.server.update(
    //   'check-session', 
    //   new FormData(), 
    //   (response: Response) => {
    //     let result = JSON.parse(response['_body'].toString())
    //     if (result.meta.return_code == 0) {
    //       if (!result.data) {
    //         this.router.go('login')
    //       } else {
    //         localStorage.is_logged_in = true
    //       }
    //     } else {
    //       this.toastManager.showServiceErrorText('check-session', result.meta)
    //     }
    //   }
    // )
  }

  // Esta funcion se ejecuta cuando el usuario cambio el idioma de la pagina
  onLanguageButtonClicked(lang) {
    localStorage.lang = lang
  }
}
