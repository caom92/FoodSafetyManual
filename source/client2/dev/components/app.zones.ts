import { Component } from '@angular/core'
import { MzModalService } from 'ngx-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { ZoneInfoModalComponent } from './modal.zone.info'

// Este componente describe el comportamiento de la pagina donde el usuario 
// administra la informacion de las zonas
@Component({
  templateUrl: '../templates/app.zones.html'
})
export class ZonesComponent
{
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

  // Esta funcion se invoca cuando el usuario hace clic en el boton de agregar 
  // una zona nueva
  onNewZoneButtonClick(): void {
    // invocamos el modal de editar informacion de zona, pero sin pasarle 
    // ningun argumento para que se maneje como un formulario en blanco
    this.modalManager.open(ZoneInfoModalComponent)
  }

  // Esta funcion se invoca cuando el usuario hace clic en el boton para editar 
  // una zona existente
  onEditZoneButtonClick(zone: any): void {
    // invocamos el modal de editar informacion ce zona pasandole como 
    // argumentos los datos de la zona cuya informacion sera editada
    this.modalManager.open(ZoneInfoModalComponent, {
      zoneID: zone.id,
      zoneName: zone.name,
      companyName: zone.company_name,
      address: zone.address
    })
  }
}