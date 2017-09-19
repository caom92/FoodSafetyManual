import { Component } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LanguageService } from '../services/app.language'
import { MzModalService, MzBaseModal } from 'ng2-materialize'
import { ProgressModalComponent } from './modal.please.wait'

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
}