import { Component, OnInit, Input } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { ProgressModalComponent } from './modal.please.wait'
import { ChangeDetectorRef } from '@angular/core'

type SimpleServerArrayElement = {
  id: number,
  name: string
}

type ProgramElement = {
  id: number,
  name: string,
  modules: Array<{
    id: number,
    name: string,
    logs: Array<SimpleServerArrayElement>
  }>
}

// El componente del modal donde el administrador puede 
// una bitacora
@Component({
  templateUrl: '../templates/modal.user.info.html'
})
export class UserInfoModalComponent extends MzBaseModal implements OnInit
{
  // Bandera que indica si los datos ingresados en el formulario son todos 
  // validos
  isFormValid: boolean = false

  selectedProgram: ProgramElement = {
    id: 0,
    name: '',
    modules: []
  }

  // La lista de roles de usuario
  userRoles: Array<SimpleServerArrayElement> = []

  // La lista de supervisores de la zona que el usuario ha elegido
  supervisors: Array<{
    id: number,
    full_name: string
  }> = []

  // La lista de zonas
  zones: Array<SimpleServerArrayElement> = []

  // La lista de bitacoras organizadas por programas y modulos
  programs: Array<ProgramElement> = []

  userForm: FormGroup = null

  selectedZone: SimpleServerArrayElement = {
    id: 0,
    name: ''
  }

  selectedRole: SimpleServerArrayElement = {
    id: 0,
    name: ''
  }

  // Constructor del componente donde importaremos una instancia del servicio 
  // de idioma
  constructor(
    private langManager: LanguageService,
    private formBuilder: FormBuilder,
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private modalManager: MzModalService,
    private changeDetector: ChangeDetectorRef
  ) {
    super() // invocamos el constructor de la clase padre
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      program: [ null ],
      role: [ null, Validators.required ],
      zone: [ null, Validators.required ]
    })

    // recuperamos la lista de roles del servidor
    this.server.update(
      'list-user-roles',
      new FormData(),
      (response: any) => {
        // revisamos si el servidor respondio de forma exitosa
        if (response.meta.return_code == 0) {
          // si asi fue, guardamos la lista recuperada
          this.userRoles = response.data
        } else {
          // si el servidor respondio con un error, notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-user-roles',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update

    // recuperamos la lista de zonas del servidor
    this.server.update(
      'list-zones',
      new FormData(),
      (response: any) => {
        // revisamos si el servidor respondio de forma exitosa
        if (response.meta.return_code == 0) {
          // si asi fue, guardamos la lista recuperada
          this.zones = response.data
        } else {
          // si el servidor respondio con un error, notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-zones',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update

    // recuperamos la lista de bitacoras del servidor
    this.server.update(
      'list-programs-modules-logs',
      new FormData(),
      (response: any) => {
        // revisamos si el servidor respondio de forma exitosa
        if (response.meta.return_code == 0) {
          // si asi fue, guardamos la lista recuperada
          this.programs = response.data
        } else {
          // si el servidor respondio con un error, notificamos al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-programs-modules-logs',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // ngOnInit(): void

  onRoleSelected(): void {
    this.selectedRole = 
      <SimpleServerArrayElement>this.userForm.controls.role.value

    if (this.selectedZone.id > 0) {
      this.retrieveSupervisorsList()
    }
  }

  onZoneSelected(): void {
    this.selectedZone = 
      <SimpleServerArrayElement>this.userForm.controls.zone.value

    if (this.selectedRole.id > 0) {
      this.retrieveSupervisorsList()
    }
  }

  retrieveSupervisorsList(): void {
    let data: FormData = new FormData()
    data.append('zone_id', this.selectedZone.id.toString())

    this.server.update(
      'list-supervisors-by-zone',
      data,
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.supervisors = response.data
        } else {
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-supervisors-by-zone',
              response.meta.return_code
            )
          )
        } // if (response.meta.return_code == 0)
      } // (response: any)
    ) // this.server.update
  } // retrieveSupervisorsList(): void

  onProgramSelected(): void {
    // $('.collapsible').collapsible('destroy')
    this.selectedProgram.modules = []
    this.changeDetector.detectChanges()
    this.selectedProgram = <ProgramElement>this.userForm.controls.program.value
    this.changeDetector.detectChanges()
  }
} // export class UserInfoModalComponent extends MzBaseModal implements OnInit