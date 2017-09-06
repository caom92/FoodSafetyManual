import { Injectable } from '@angular/core'

// Este servicio incluye todos los elementos y banderas encontrados en el 
// componente de la pantalla principal para que sean accedidos y modificados 
// por otros componentes 
@Injectable()
export class HomeElementsService
{
  // Bandera que indica si se debe desplegar el menu lateral
  showSideNav = true

  // Bandera que indica si se debe desplegar el menu de zonas
  showZoneMenu = false

  // La lista de zonas que seran desplegadas en el menu de zonas
  zones = []

  // El nombre completo del usuario que sera desplegado en el menu lateral
  userFullName: string = null

  // El nombre del rol del usuario
  roleName: string = null

  // La lista de programas a los cuales el usuario tiene acceso
  programs: object = null

  // El numero de autorizaciones pendientes de revisar por el supervisor
  numPendingAuthorizations: number = 0

  // Despliega el menu lateral
  displaySideNav() {
    this.showSideNav = true
  }

  // Oculta el menu lateral
  hideSideNav() {
    this.showSideNav = false
  }

  // Despliega el menu de zonas
  displayZoneMenu() {
    this.showZoneMenu = true
  }

  // Oculta el menu de zonas
  hideZoneMenu() {
    this.showZoneMenu = false
  }

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de empleado
  setupEmployeeApp() {
    let privileges = JSON.parse(localStorage.privileges)
    this.programs = privileges[localStorage.zone_name]
  }

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de supervisor
  setupSupervisorApp(server, toastManager) {
    // esta funcion solicitara al servidor el numero de autorizaciones 
    // pendientes
    let getNumPendingAuthorizations = () => {
      server.update(
        'get-num-pending-logs',
        new FormData(),
        (response: Response) => {
          let result = JSON.parse(response['_body'].toString())
          if (result.meta.return_code == 0) {
            // si el usuario tiene nuevas autorizaciones pendientes, hay que 
            // notificarle en la pantalla
            if (result.data > this.numPendingAuthorizations) {
              // asegurate de mostrar el mensaje en el idioma que el usuario 
              // haya elegido
              if (localStorage.lang == 'en') {
                toastManager.showText(
                  `${ result.data - this.numPendingAuthorizations} new pending authorizations`
                )
              } else {
                toastManager.showText(
                  `${ result.data - this.numPendingAuthorizations} nuevas autorizaciones pendientes`
                )
              }
            }

            // actualizamos el numero de autorizaciones pendientes
            this.numPendingAuthorizations = result.data
          } else {
            // si algo ocurrio con la comunicacion con el servidor, 
            // desplegamos un mensaje de error al usuario
            toastManager.showServiceErrorText(
              'get-num-pending-logs', 
              result.meta
            ) // toastManager.showServiceErrorText
          } // if (result.meta.return_code == 0)
        } // (response: Response)
      ) // server.update
    } // let getNumPendingAuthorizations

    // desplegamos las opciones del menu lateral
    this.setupEmployeeApp()

    // recuperamos del servidor el numero de autorizaciones pendientes
    getNumPendingAuthorizations()

    // indicamos que cada minuto volveremos a recuperar las autorizaciones 
    // pendientes del servidor
    setInterval(getNumPendingAuthorizations, 60000)
  }

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de director
  setupDirectorApp(server, toastManager) {
    // si el usuario es un director, desplegamos el menu de zonas pidiendolas 
    // del servidor
    server.update(
      'list-zones',
      new FormData(),
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          // desplegamos el menu de zonas
          this.zones = result.data
          this.displayZoneMenu()
        } else {
          // si algo ocurrio con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          toastManager.showServiceErrorText(
            'list-zones', 
            result.meta
          ) // toastManager.showServiceErrorText
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // server.update
  } // setupDirectorApp(server, toastManager)
} // export class HomeElementsService