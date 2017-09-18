import { Injectable } from '@angular/core'

// Este servicio incluye todos los elementos y banderas encontrados en el 
// componente de la pantalla principal para que sean accedidos y modificados 
// por otros componentes 
@Injectable()
export class HomeElementsService
{
  // Bandera que indica si se debe desplegar el menu lateral
  private _showSideNav = false
  get showSideNav() {
    return this._showSideNav
  }

  // Despliega el menu lateral
  displaySideNav() {
    this._showSideNav = true
  }

  // Oculta el menu lateral
  hideSideNav() {
    this._showSideNav = false
  }

  // Bandera que indica si se debe desplegar el menu de zonas
  private _showZoneMenu = false
  get showZoneMenu() {
    return this._showZoneMenu
  }

  // Despliega el menu de zonas
  displayZoneMenu() {
    this._showZoneMenu = true
  }

  // Oculta el menu de zonas
  hideZoneMenu() {
    this._showZoneMenu = false
  }

  private _showSpinner = true
  get showSpinner() {
    return this._showSpinner
  }
  
  displaySpinner() {
    this._showSpinner = true
  }

  hideSpinner() {
    this._showSpinner = false
  }

  // El ID del usuario que tiene registrado en la base de datos
  private _userID: number = 
    (localStorage.user_id !== undefined) ?
      localStorage.user_id
      : null
  set userID(value: number) {
    this._userID = value
    localStorage.user_id = value
  }
  get userID() {
    return this._userID
  }

  // El nombre del rol del usuario
  private _roleName: string = 
    (localStorage.role_name !== undefined) ?
      localStorage.role_name
      : null
  set roleName(value: string) {
    this._roleName = value
    localStorage.role_name = value
  }
  get roleName() {
    return this._roleName
  }

  // El numero de indentificacion del empleado en la empresa
  private _employeeNum: string = 
    (localStorage.employee_num !== undefined) ?
      localStorage.employee_num
      : null
  set employeeNum(value: string) {
    this._employeeNum = value
    localStorage.employee_num = value
  }
  get employeeNum() {
    return this._employeeNum
  }

  // El nombre completo del usuario que sera desplegado en el menu lateral
  private _userFullName: string = 
    (localStorage.user_full_name !== undefined) ?
      localStorage.user_full_name
      : null
  set userFullName(value: string) {
    this._userFullName = value
    localStorage.user_full_name = value
  }
  get userFullName() {
    return this._userFullName
  }

  // El nombre de cuenta del usuario para iniciar sesion
  private _loginName: string = 
    (localStorage.login_name !== undefined) ?
      localStorage.login_name
      : null
  set loginName(value: string) {
    this._loginName = value
    localStorage.login_name = value
  }
  get loginName() {
    return this._loginName
  }

  // Informacion de la compañia
  private _company = {
    name: (localStorage.company_name !== undefined) ? 
      localStorage.company_name : null,
    logo: (localStorage.company_logo !== undefined) ? 
      localStorage.company_logo : null,
    address: (localStorage.company_address !== undefined) ? 
      localStorage.company_address : null
  }
  set companyName(value: string) {
    this._company.name = value
    localStorage.company_name = value
  }
  set companyLogo(value: string) {
    this._company.logo = value
    localStorage.company_logo = value
  }
  set companyAddress(value: string) {
    this._company.address = value
    localStorage.company_address = value
  }
  get company() {
    return this._company
  }

  // Informacion de la zona del usuario
  private _zone = {
    id: (localStorage.zone_id !== undefined) ? 
      localStorage.zone_id : null,
    name: (localStorage.zone_name !== undefined) ? 
      localStorage.zone_name : null
  }
  set zoneID(value: number) {
    this._zone.id = value
    localStorage.zone_id = value
  }
  set zoneName(value: string) {
    this._zone.name = value
    localStorage.zone_name = value
  }
  get zone() {
    return this._zone
  }

  // Los permisos de acceso que el usuario tiene para las bitacoras del sistema
  private _privileges: object = 
    (localStorage.privileges !== undefined) ?
      JSON.parse(localStorage.privileges)
      : null
  set privileges(value: object) {
    this._privileges = value
    localStorage.privileges = JSON.stringify(value)
  }
  get privileges() {
    return this._privileges
  }

  // La lista de zonas que seran desplegadas en el menu de zonas
  private _zones = 
    (localStorage.zone_list !== undefined) ?
      JSON.parse(localStorage.zone_list)
      : []
  set zones(value: Array<object>) {
    this._zones = value
    localStorage.zone_list = JSON.stringify(value)
  }
  get zones() {
    return this._zones
  }

  // La lista de bitacoras que estan registradas en el sistema
  private _logs = 
    (localStorage.log_list !== undefined) ?
      JSON.parse(localStorage.log_list)
      : []
  set logs(value: Array<object>) {
    this._logs = value
    localStorage.log_list = JSON.stringify(value)
  }
  get logs() {
    return this._logs
  }

  // La lista de programas a los cuales el usuario tiene acceso
  private _programs: object = 
    (localStorage.programs !== undefined) ?
      JSON.parse(localStorage.programs)
      : []
  set programs(value: object) {
    this._programs = value
    localStorage.programs = JSON.stringify(value)
  }
  get programs() {
    return this._programs
  }

  // El numero de autorizaciones pendientes de revisar por el supervisor
  numPendingAuthorizations: number = 0

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de empleado
  initProgramsMenu(): void {
    this.programs = this.privileges[this.zone.name]
  }

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de supervisor
  initSupervisorMenu(server, toastManager): void {
    // esta funcion solicitara al servidor el numero de autorizaciones 
    // pendientes
    let getNumPendingAuthorizations = () => {
      server.update(
        'get-num-pending-logs',
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            // si el usuario tiene nuevas autorizaciones pendientes, hay que 
            // notificarle en la pantalla
            if (response.data > this.numPendingAuthorizations) {
              // asegurate de mostrar el mensaje en el idioma que el usuario 
              // haya elegido
              if (localStorage.lang == 'en') {
                toastManager.showText(
                  `${ response.data - this.numPendingAuthorizations} new pending authorizations`
                )
              } else {
                toastManager.showText(
                  `${ response.data - this.numPendingAuthorizations} nuevas autorizaciones pendientes`
                )
              }
            }

            // actualizamos el numero de autorizaciones pendientes
            this.numPendingAuthorizations = response.data
          } else {
            // si algo ocurrio con la comunicacion con el servidor, 
            // desplegamos un mensaje de error al usuario
            toastManager.showServiceErrorText(
              'get-num-pending-logs', 
              response.meta
            ) // toastManager.showServiceErrorText
          } // if (result.meta.return_code == 0)
        } // (response: Response)
      ) // server.update
    } // let getNumPendingAuthorizations

    // desplegamos las opciones del menu lateral
    this.initProgramsMenu()

    // recuperamos del servidor el numero de autorizaciones pendientes
    getNumPendingAuthorizations()

    // indicamos que cada minuto volveremos a recuperar las autorizaciones 
    // pendientes del servidor
    setInterval(getNumPendingAuthorizations, 60000)
  }

  // Realiza los procesos necesarios para desplegar en la aplicacion las 
  // opciones apropiadas que corresponden a un usuario con el rol de director
  initZoneMenu(server, toastManager): void {
    // si el usuario es un director, desplegamos el menu de zonas pidiendolas 
    // del servidor
    server.update(
      'list-zones',
      new FormData(),
      (response: any) => {
        if (response.meta.return_code == 0) {
          // desplegamos el menu de zonas
          this.zones = response.data
          this.displayZoneMenu()
        } else {
          // si algo ocurrio con la comunicacion con el servidor, 
          // desplegamos un mensaje de error al usuario
          toastManager.showServiceErrorText(
            'list-zones', 
            response.meta
          ) // toastManager.showServiceErrorText
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // server.update
  } // setupDirectorApp(server, toastManager)

  // Retorna la fecha de hoy en una cadena con formato AAAA-MM-DD
  getFormattedDate(): string {
    // primero obtenemos la fecha de hoy 
    let today = new Date()

    // luego obtenemos el año, el mes y el dia individualmente como cadenas
    let year = today.getUTCFullYear().toString()
    let month = (today.getMonth() + 1).toString()
    let day = today.getUTCDate().toString()

    // el mes y el dia no estan precedidos por un 0 cuando son valores menores 
    // a 10, para corregir esto, le agregamos el 0 al principio y luego 
    // recuperamos los ultimos 2 caracteres; si el valor es menor a 10, 
    // agregarle el 0 hara que la cadena tenga solo 2 caracteres, por lo que la 
    // funcion slice() retornara la cadena completa, en cambio si el valor es 
    // mayor a 10, agregarle el 0 hara que la cadena tenga 3 caracteres y la 
    // funcion slice retornara los ultimos 2 caracteres, borrando el cero que 
    // le habiamos agregado
    month = ('0' + month).slice(-2)
    day = ('0' + day).slice(-2)

    // retornamos la cadena de fecha formateada
    return `${ year }-${ month }-${ day }`
  }
} // export class HomeElementsService