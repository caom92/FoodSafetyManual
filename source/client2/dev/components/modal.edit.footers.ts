import { Component } from '@angular/core'
import { MzBaseModal, MzModalComponent } from 'ng2-materialize'
import { LanguageService } from '../services/app.language'
import { HomeElementsService } from '../services/app.home'

// El componente del modal donde el usuario puede editar los pies de pagina de 
// una bitacora
@Component({
  templateUrl: '../templates/modal.edit.footers.html'
})
export class EditFooterModalComponent extends MzBaseModal 
{
  // Las opciones de configuracion del modal
  modalOptions = {
  }

  // El nombre de la zona cuyo pie de pagina sera editado
  zone: string = this.home.tempStorage.zone

  // El nombre de la bitacora cuyo pie de pagina sera editado
  log: string = this.home.tempStorage.log

  // Constructor del componente donde importaremos una instancia del servicio 
  // de idioma
  constructor(
    private home: HomeElementsService,
    private langManager: LanguageService
  ) {
    super() // invocamos el constructor de la clase padre
  }
}