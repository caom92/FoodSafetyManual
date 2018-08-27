import { Component } from '@angular/core'
import { StateService } from '@uirouter/angular'
import { MzModalService } from 'ng2-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
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

  // El ID del supervisor a quien seran transferidos los empleados seleccionados
  targetSupervisorID: number = null

  // La lista de supervisores de la zona elegida
  supervisors = []

  // La lista de empleados del supervisor elegido
  employees = []

  // La lita de empleados elegidos para ser transferidos
  selectedEmployees = []

  // El constructor del componente donde importamos todos los servicios 
  // requeridos
  constructor(
    private langManager: LanguageService,
    private home: HomeElementsService,
    private modalManager: MzModalService,
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService
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

    // limpiamos la lista de empleados en caso de que el usuario haya elegido 
    // una zona anteriormente
    this.employees = []

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

          // agregamos un control adicional para controlar cuales empleados 
          // fueron elegidos por el usuario
          for (let i = 0; i < this.employees.length; ++i) {
            this.employees[i].checked = false
          }

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

  // Esta funcion se invoca cuando el usuario hace clic en la caja de seleccion 
  // de uno de los empleados
  onEmployeeChecked(employeeIdx: number, wasChecked: boolean): void {
    this.employees[employeeIdx].checked = wasChecked
  } // onEmployeeChecked(employee: any, wasChecked: boolean): void

  // Esta funcion es invocada cuando el usuario hace clic en el boton de 
  // transferir empleados a otro supervisor
  onTransferEmployeesButtonClick(): void {
    // preaparamos los datos que seran enviados al servidor
    let data = new FormData()
    for (let i = 0, j = 0; i < this.employees.length; ++i) {
      if (this.employees[i].checked) {
        data.append('assignments[' + j +'][employee_id]', (this.employees[i].id).toString())
        data.append('assignments[' + j +'][supervisor_id]', (this.targetSupervisorID).toString())
        j++
      }
    }
  
    // desplegamos el modal de espera
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor
    this.server.update(
      'assign-employees-to-supervisors',
      data,
      (response: any) => {
        // cuando el servidor responda, cerramos el modal de espera
        modal.instance.modalComponent.close()

        // notificamos al usuario de la respuesta obtenida
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'assign-employees-to-supervisors',
            response.meta.return_code
          )
        )

        // si el servidor respondio de forma exitosa, recargamos la pagina para 
        // reflejar los cambios realizados
        if (response.meta.return_code == 0) {
          this.router.reload()
        }
      } // (response: any)
    ) // this.server.update
  } // onTransferEmployeesButtonClick(): void

  // Esta funcion se invoca cuando el usuario hace clic en la caja de seleccion 
  // que marca todos los empleados del supervisor mostrados en la pantalla
  onSelectAllEmployeesCheck(wasChecked: boolean): void {
    for (let i = 0; i < this.employees.length; ++i) {
      this.employees[i].checked = wasChecked
    }
  } // onSelectAllEmployeesCheck(wasChecked: boolean): void
} // export class SupervisorsComponent
