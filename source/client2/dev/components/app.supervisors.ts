import { Component } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LanguageService } from '../services/app.language'
import { MzModalService, MzBaseModal } from 'ng2-materialize'
import { ProgressModalComponent } from './modal.please.wait'

// Este componente defie el comportamiento de la pantalla donde el usuario 
// administra supervisores
@Component({
  templateUrl: '../templates/app.supervisors.html'
})
export class SupervisorsComponent
{
  // Bandera que indica si debemos desplegar el mensaje de advertencia de que 
  // no hay supervisores o no
  showNoSupervisorsWarning: boolean = false
  
  // Bandera que indica si debemos desplegar el mensaje de advertencia de que 
  // no hay empleados o no
  showNoEmployeesWarning: boolean = false

  // El ID de la zona seleccionada de la lista de seleccion
  selectedZoneID: number = null

  // El ID del supervisor seleccionado de la lista de seleccion
  selectedSupervisorID: number = null

  // La lista de supervisores de la zona elegida
  supervisors = []

  // La lista de empleados del supervisor elegido
  employees = []

  // El constructor del componente donde importamos todos los servicios 
  // requeridos
  constructor(
    private langManager: LanguageService,
    private home: HomeElementsService,
    private modalManager: MzModalService,
    private server: BackendService,
    private toastManager: ToastService
  ) {
  }

  // Esta funcion se invoca cuando el usuario selecciona una zona de la lista 
  // de seleccion
  onZoneSelected(): void {
    // apagamos la bandera de advertencia para que no se despliegue mientras se 
    // recuperan los datos del servidor
    this.showNoSupervisorsWarning = false

    // apagamos esta otra bandera en caso de que el usuario este cambiando de 
    // zona tras haber elegido un supervisor sin empleados
    this.showNoEmployeesWarning = false

    // preparamos los datos que seran enviados al servidor
    let data = new FormData()
    data.append('zone_id', this.selectedZoneID.toString())

    // desplegamos el modal de espera
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor para recuperar la lista de supervisores
    this.server.update(
      'list-supervisors-by-zone',
      data,
      (response: any) => {
        // cuando el servidor responde, cerramos el modal de espera
        modal.instance.modalComponent.close()

        // si el servidor respondio exitosamente...
        if (response.meta.return_code == 0) {
          // guardamos la lista de supervisores recuperada
          this.supervisors = response.data

          // y encendemos la bandera de mostrar la advertencia de no 
          // supervisores
          this.showNoSupervisorsWarning = true
        } else {
          // en caso de que el servidor haya respondido con un error, 
          // notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-supervisors-by-zone',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // onZoneSelected()

  // Esta funcion es invocada cuando un supervisor es elegido de la lista de 
  // seleccion
  onSupervisorSelected(): void {
    // apagamos la bandera que muestra la bandera para que no se despliegue 
    // mientras se recuperan los datos del servidor
    this.showNoEmployeesWarning = false

    // preparamos los datos que seran enviados al servidor
    let data = new FormData()
    data.append('supervisor_id', this.selectedSupervisorID.toString())

    // mostramos el modal de espera
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor para recuperar la lista de empleados del
    // supervisor elegido
    this.server.update(
      'list-employees-of-supervisor',
      data,
      (response: any) => {
        // cuando el servidor responda, cerramos el modal de espera
        modal.instance.modalComponent.close()
        
        // si el servidor respondio de forma exitosa...
        if (response.meta.return_code == 0) {
          // almacenamos la lista de empleados recuperada
          this.employees = response.data

          // encendemos la bandera de mostrar advertencia de no empleados
          this.showNoEmployeesWarning = true
        } else {
          // en caso de que el servidor responda con un error, notificamos al 
          // usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-employees-of-supervisor',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // onSupervisorSelected()
} // export class SupervisorsComponent