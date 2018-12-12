import { Component, OnInit, Input } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ngx-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { ActivatedRoute } from '@angular/router'
import { ProgressModalComponent } from './modal.please.wait'
import { UsersComponent } from './app.users'


type SimpleServerArrayElement = {
  id: number,
  name: string
}

type PrivilegeArrayElement = {
  id: number,
  privilege_id: number,
  name: string
}

type ProgramElement = {
  id: number,
  name: string,
  modules: Array<{
    id: number,
    name: string,
    logs: Array<PrivilegeArrayElement>
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

  privileges: Array<SimpleServerArrayElement> = []

  userForm: FormGroup = null

  selectedZoneId: number = null

  selectedRole: SimpleServerArrayElement = {
    id: 0, name: ''
  }

  selectedPrivileges: any = {}

  selectedSupervisorID: number = null

  @Input()
  callingComponent: UsersComponent

  userData: any = null

  // Constructor del componente donde importaremos una instancia del servicio 
  // de idioma
  constructor(
    protected langManager: LanguageService,
    protected formBuilder: FormBuilder,
    protected server: BackendService,
    protected toastManager: ToastService,
    protected modalManager: MzModalService
  ) {
    super() // invocamos el constructor de la clase padre
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    this.initForm()
    this.init()
    this.initPrivileges()
  } // ngOnInit(): void

  init(): void {
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
          this.zones = response.data.sort((a, b) => (a as any).name < (b as any).name ? -1 : (a as any).name > (b as any).name ? 1 : 0)
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
  }

  initPrivileges(): void {
    this.server.update(
      'list-privileges',
      new FormData(),
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.privileges = response.data

          // recuperamos la lista de bitacoras del servidor
          this.server.update(
            'list-programs-modules-logs',
            new FormData(),
            (response: any) => {
              // revisamos si el servidor respondio de forma exitosa
              if (response.meta.return_code == 0) {
                // si asi fue, guardamos la lista recuperada
                this.programs = response.data
                for (let program of this.programs) {
                  for (let module of program.modules) {
                    for (let log of module.logs) {
                      this.selectedPrivileges[program.name + ' ' + log.name] = {
                      //this.selectedPrivileges[log.name] = {
                        logID: log.id,
                        privilegeID: this.privileges[0].id
                      }
                    }
                  }
                }
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
        } else {
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'list-privileges',
              response.meta.return_code
            )
          )
        }
      }
    )
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      employeeID: [ null, Validators.required ],
      firstName: [ null, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      lastName: [ null, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ]) ],
      role: [ null, Validators.required ],
      zone: [ null, Validators.required ],
      username: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]) ],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]) ],
      passwordConfirmation: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]) ]
    }, {
      validator: (form: FormGroup) => {
        let password = form.controls.password.value 
        let passwordConfirmation = form.controls.passwordConfirmation.value
        return (password === passwordConfirmation) ?
          null : { arePasswordsDifferent: true}
      }
    })
  }

  onRoleSelected(): void {
    this.selectedRole.id = <number>this.userForm.controls.role.value
    this.selectedRole.name = this.getRoleNameByIdFromArray(
      this.selectedRole.id,
      this.userRoles
    )

    if (this.selectedZoneId > 0) {
      this.retrieveSupervisorsList()
    }
  }

  onZoneSelected(): void {
    this.selectedZoneId = <number>this.userForm.controls.zone.value

    if (this.selectedRole.id > 0) {
      this.retrieveSupervisorsList()
    }
  }

  retrieveSupervisorsList(): void {
    let data: FormData = new FormData()
    data.append('zone_id', this.selectedZoneId.toString())

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

  onFormSubmit(): void {
    let data = new FormData()
    data.append('employee_num', this.userForm.controls.employeeID.value.toString())
    data.append('first_name', this.userForm.controls.firstName.value)
    data.append('last_name', this.userForm.controls.lastName.value)
    data.append('role_id', this.userForm.controls.role.value)
    data.append('login_name', this.userForm.controls.username.value)
    data.append('login_password', this.userForm.controls.password.value)
    data.append('zone_id', this.userForm.controls.zone.value)
    let roleName = 
      this.getRoleNameByIdFromArray(data.get('role_id'), this.userRoles)

    if (this.selectedRole.name == 'Employee') {
      data.append('supervisor_id', this.selectedSupervisorID.toString())
    }

    if (
      this.selectedRole.name == 'Employee' 
      || this.selectedRole.name == 'Supervisor'
    ) {
      let i = 0
      for (let p in this.selectedPrivileges) {
        let privilege = this.selectedPrivileges[p]
        data.append(`privileges[${ i }][log_id]`, privilege.logID.toString())
        data.append(
          `privileges[${ i++ }][privilege_id]`, 
          privilege.privilegeID.toString()
        )
      }
    }

    let modal = this.modalManager.open(ProgressModalComponent)
    this.server.update(
      'add-user',
      data,
      (response: any) => {
        modal.instance.modalComponent.closeModal()
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'add-user',
            response.meta.return_code
          )
        )

        if (response.meta.return_code == 0) {
          this.callingComponent.users.push({
            user_id: response.data,
            employee_num: data.get('employee_num'),
            first_name: data.get('first_name'),
            last_name: data.get('last_name'),
            role_id: data.get('first_name'),
            role_name: roleName,
            login_name: data.get('login_name'),
            zone_id: data.get('zone_id')
          })
          this.modalComponent.closeModal()
        }
      }
    )
  }

  getRoleNameByIdFromArray(
    id: any, roles: Array<SimpleServerArrayElement>
  ): string {
    for (let role of roles) {
      if (role.id == id) {
        return role.name
      }
    }
    return null
  }
} // export class UserInfoModalComponent extends MzBaseModal implements OnInit