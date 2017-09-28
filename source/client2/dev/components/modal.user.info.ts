import { Component, OnInit, Input } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { ProgressModalComponent } from './modal.please.wait'

// El componente del modal donde el administrador puede 
// una bitacora
@Component({
  templateUrl: '../templates/modal.user.info.html'
})
export class UserInfoModalComponent extends MzBaseModal implements OnInit
{
  // Constructor del componente donde importaremos una instancia del servicio 
  // de idioma
  constructor(
    private langManager: LanguageService,
    private formBuilder: FormBuilder,
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private modalManager: MzModalService
  ) {
    super() // invocamos el constructor de la clase padre
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
  }
}