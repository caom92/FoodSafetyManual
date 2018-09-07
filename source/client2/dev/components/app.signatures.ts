import { Component } from '@angular/core'
import { MzModalService } from 'ngx-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { EditSignatureModalComponent } from './modal.edit.signature'
import { ProgressModalComponent } from './modal.please.wait'

// Este componente defie el comportamiento de la pantalla donde el usuario 
// administra las firmas de los supervisores
@Component({
  templateUrl: '../templates/app.signatures.html'
})
export class SignaturesComponent
{
  // Bandera que indica si debemos desplegar el mensaje de advertencia de que 
  // no hay supervisores o no
  showNoSupervisorsWarning: boolean = false

  // El ID de la zona seleccionada de la lista de seleccion
  selectedZoneID: number = null

  // La lista de supervisores de la zona elegida
  signatures = []

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

    // preparamos los datos que seran enviados al servidor
    let data = new FormData()
    data.append('zone_id', this.selectedZoneID.toString())

    // desplegamos el modal de espera
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor para recuperar la lista de supervisores
    this.server.update(
      'list-signatures-by-zone',
      data,
      (response: any) => {
        // cuando el servidor responde, cerramos el modal de espera
        modal.instance.modalComponent.closeModal()

        // si el servidor respondio exitosamente...
        if (response.meta.return_code == 0) {
          // guardamos la lista de supervisores recuperada
          this.signatures = response.data

          // y encendemos la bandera de mostrar la advertencia de no 
          // supervisores
          this.showNoSupervisorsWarning = true
        } else {
          // en caso de que el servidor haya respondido con un error, 
          // notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-signatures-by-zone',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // onZoneSelected()

  // Esta funcion se invoca cuando el usuario hace clic en el boton de editar 
  // la firma de un supervisor
  onEditButtonClick(supervisor: any): void {
    // desplegamos el modal donde el usuario podra subir el archivo de la firma 
    // pasandole los datos del supervisor
    this.modalManager.open(EditSignatureModalComponent, {
      supervisorID: supervisor.id,
      supervisorName: supervisor.full_name
    })
  } // onEditButtonClick(supervisor: any): void
} // export class SupervisorsComponent