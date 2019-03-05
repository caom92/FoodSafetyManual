import { Component, OnInit } from '@angular/core'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { LogService } from '../services/app.logs'
import { ToastService } from '../services/app.toast'

// Componente que define el comportamiento de la pagina que despliega una lista 
// de las bitacoras que estan pendientes de revision
@Component({
  templateUrl: '../templates/app.authorizations.html'
})
export class AuthorizationListComponent implements OnInit {
  // La lista de bitacoras pendientes de revision
  waitingLogs = []

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private toastManager: ToastService,
    private langManager: LanguageService,
    private logService: LogService
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
    this.logService.approve(logID).then(success => {
      let deleteID = this.waitingLogs.findIndex((x => x.captured_log_id == logID))
      this.waitingLogs.splice(deleteID, 1)
      this.home.numPendingAuthorizations = this.waitingLogs.length
    }, error => {

    })
  }

  // Esta funcion se invoca cuando el usuario hace clic en alguno de los 
  // botones de rechazo de bitacora
  // [in]   logID: el ID de la bitacora la cual el usuario desea rechazar
  onRejectButtonClick(logID: number): void {
    this.logService.reject(logID).then(success => {
      let deleteID = this.waitingLogs.findIndex((x => x.captured_log_id == logID))
      this.waitingLogs.splice(deleteID, 1)
      this.home.numPendingAuthorizations = this.waitingLogs.length
    }, error => {

    })
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