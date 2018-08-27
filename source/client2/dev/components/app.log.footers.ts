import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MzModalService } from 'ng2-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { EditFooterModalComponent } from './modal.edit.footers'
import { ProgressModalComponent } from './modal.please.wait'

// Componente que define el comportamiento de la pantalla donde se listan los 
// pies de pagina de las bitacoras
@Component({
  templateUrl: '../templates/app.log.footers.html'
})
export class LogFootersComponent
{
  // El ID de la zona a cuyas bitacoras seran editadas
  selectedZoneID: number = null

  // La lista de modulos a elegir por el usuario
  modules = []

  // La lista de bitacoras a elegir por el usuario
  logs = []

  // El ID del modulo elegido por el usuario
  selectedModuleID: number = null

  // Bandera que indica si vamos a mostrar la tabla en la pantalla o no
  showTable: boolean = false

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private toastManager: ToastService,
    private formBuilder: FormBuilder,
    private langManager: LanguageService,
    private modalManager: MzModalService
  ) {
  }

  // Esta funcion se invoca cuando el usuario selecciona una zona de la lista 
  // de seleccion
  onZoneSelected(): void {
    // si el usuario ya elegio un modulo previamente, actualizamos la tabla con 
    // los pies de pagina de ese modulo pero en la nueva zona
    if (this.selectedModuleID != null) {
      this.onModuleSelected()
    }
  }

  // Esta funcion se invoca cuando el usuario selecciona un modulo de la lista 
  // de seleccion
  onModuleSelected(): void {
    // preparamos los datos que van a ser enviados al servidor
    let data = new FormData()
    data.append('zone_id', this.selectedZoneID.toString())
    data.append('module_id', this.selectedModuleID.toString())

    // mostramos el modal de progreso
    let modal = this.modalManager.open(ProgressModalComponent)
    
    // enviamos la peticion al servidor para recuperar los pies de pagina de 
    // las bitacoras del modulo y zona seleccionados
    this.server.update(
      'list-report-footers',
      data,
      (response: any) => {
        // una vez que el servidor responde, cerramos el modal de progreso
        modal.instance.modalComponent.close()

        // revisamos si el servidor respondio con exito o no
        if (response.meta.return_code == 0) {
          // si la respuesta fue exitosa, mostramos la tabla con las bitacoras 
          // y sus pies de pagina correspondientes
          this.showTable = true
          this.logs = response.data
        } else {
          // si el servidor respondio con un error, notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-report-footers',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // onModuleSelected(): void 

  // Esta funcion se invoca cuando el usuario hace clic en el boton para editar 
  // el pie de pagina de una de las bitacoras de la tabla
  onEditButtonClick(footer): void {
    // Invocamos el modal de edicion de pies de pagina pasandole como 
    // parametros los pies de pagina de la bitacora elegida 
    this.modalManager.open(EditFooterModalComponent, {
      footerID: footer.id,
      log: footer.log_name,
      zone: footer.zone_name,
      footerPDF: footer.pdf_footer,
      footerHTML: footer.html_footer
    })
  }
}