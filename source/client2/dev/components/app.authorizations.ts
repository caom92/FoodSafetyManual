import { Component, OnInit } from '@angular/core'
import { MzModalService } from 'ngx-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { ProgressModalComponent } from './modal.please.wait'

// Componente que define el comportamiento de la pagina que despliega una lista 
// de las bitacoras que estan pendientes de revision
@Component({
  templateUrl: '../templates/app.authorizations.html'
})
export class AuthorizationListComponent implements OnInit
{
  // Bandera que indica si el usuario tiene bitacoras pendientes de revision
  hasPendingLogs = true

  // La lista de bitacoras pendientes de revision
  waitingLogs = []

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private toastManager: ToastService,
    private langManager: LanguageService,
    private modalManager: MzModalService
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    this.server.update(
      'list-unapproved-logs-of-user',
      new FormData(),
      (response: any) => {
        // revisamos si el servidor respondio exitosamente
        if (response.meta.return_code == 0) {
          // si lo hizo, recuperamos la lista de bitacoras pendientes
          this.waitingLogs = response.data.waiting.logs

          // activamos la bandera que indica si el usuario tiene bitacoras 
          // pendientes o no
          this.hasPendingLogs = this.waitingLogs.length > 0
        } else {
          // si el servidor respondio con un mensaje de error, notificamos al 
          // usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-unapproved-logs-of-user',
              response.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // ngOnInit(): void

  // Esta funcion se invoca cuando el usuario hace clic en alguno de los 
  // botones de aprovacion de bitacora
  // [in]   logID: el ID de la bitacora la cual el usuario desea aprovar
  onApproveButtonClick(logID: number): void { 
    // primero desplegamos el modal de progreso
    let modal = this.modalManager.open(ProgressModalComponent)

    // preparamos los datos que enviaremos al servidor
    let data = new FormData()
    data.append('captured_log_id', logID.toString())
    data.append('date', this.home.getFormattedDate())
    
    // enviamos la peticion al servidor para que autorice la bitacora 
    // seleccionada
    this.server.update(
      'approve-log',
      data,
      (response: any) => {
        // cuando el servidor responde, quitamos el modal de progreso
        modal.instance.modalComponent.closeModal()

        // damos retroalimentacion al usuario de la respuesta obtenida
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'approve-log', response.meta.return_code
          )
        )

        // revisamos si la respuesta del servidor fue exitosa
        if (response.meta.return_code == 0) {
          // si lo fue, buscamos en el arreglo de bitacoras pendientes la 
          // bitacora que recien fue aprovada
          for (let l in this.waitingLogs) {
            // cuando encontramos la bitacora en el arreglo...
            if (this.waitingLogs[l].captured_log_id == logID) {
              // la removemos del arreglo
              this.waitingLogs.splice(parseInt(l), 1)

              // actualizamos el numero de bitacoras pendientes
              this.home.numPendingAuthorizations = this.waitingLogs.length

              // y actualizamos la activacion de la bandera 
              this.hasPendingLogs = this.waitingLogs.length > 0
              break
            } // if (this.waitingLogs[l].captured_log_id == logID)
          } // for (let l in this.waitingLogs)
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // onApproveButtonClick(logID: number): void
    
  // Esta funcion se invoca cuando el usuario hace clic en alguno de los 
  // botones de rechazo de bitacora
  // [in]   logID: el ID de la bitacora la cual el usuario desea rechazar
  onRejectButtonClick(logID: number): void {
    // primero desplegamos el modal de progreso
    let modal = this.modalManager.open(ProgressModalComponent)

    // preparamos los datos que enviaremos al servidor
    let data = new FormData()
    data.append('captured_log_id', logID.toString())
    
    // enviamos la peticion al servidor para que autorice la bitacora 
    // seleccionada
    this.server.update(
      'reject-log',
      data,
      (response: any) => {
        // cuando el servidor responde, quitamos el modal de progreso
        modal.instance.modalComponent.closeModal()

        // damos retroalimentacion al usuario de la respuesta obtenida
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'reject-log', response.meta.return_code
          )
        )

        // revisamos si la respuesta del servidor fue exitosa
        if (response.meta.return_code == 0) {
          // si lo fue, buscamos en el arreglo de bitacoras pendientes la 
          // bitacora que recien fue rechazada
          for (let l in this.waitingLogs) {
            // cuando encontramos la bitacora en el arreglo...
            if (this.waitingLogs[l].captured_log_id == logID) {
              // la removemos del arreglo
              this.waitingLogs.splice(parseInt(l), 1)

              // actualizamos el numero de bitacoras pendientes
              this.home.numPendingAuthorizations = this.waitingLogs.length

              // y actualizamos la activacion de la bandera 
              this.hasPendingLogs = this.waitingLogs.length > 0
              break
            } // if (this.waitingLogs[l].captured_log_id == logID)
          } // for (let l in this.waitingLogs)
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  }

  // Esta funcion se invoca cuando el usuario hace clic en alguno de los 
  // botones de revision de bitacora
  // [in]   logID: el ID de la bitacora la cual el usuario desea revisar
  onReviewButtonClick(logID: number): void {
  }

  // Esta funcion se invoca cuando el usuario hace clic en el boton de 
  // reordenar la lista de bitacoras pendientes
  onSortButtonClick() {
    // como las bitacoras ya vienen ordenadas del servidor, simplemente es 
    // cuestion de revertir su orden
    this.waitingLogs.reverse()
  }
}