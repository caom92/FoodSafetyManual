import { UserInfoModalComponent } from './modal.user.info'
import { Component, OnInit, Input, ComponentRef } from '@angular/core'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { MzModalService, MzBaseModal } from 'ng2-materialize'
import { UsersComponent } from './app.users'
import { ProgressModalComponent } from './modal.please.wait';

@Component({
  templateUrl: '../templates/modal.user.info.edit.html'
})
export class EditUserInfoModalComponent extends UserInfoModalComponent {
  @Input()
  userIdx: number

  private passwordEditionForm: FormGroup
  private usernameEditionForm: FormGroup
  private progressModal: ComponentRef<MzBaseModal>

  constructor(
    langManager: LanguageService,
    formBuilder: FormBuilder,
    server: BackendService,
    toastManager: ToastService,
    modalManager: MzModalService
  ) {
    super(langManager, formBuilder, server, toastManager, modalManager)
  }

  ngOnInit(): void {
    this.userData = this.callingComponent.users[this.userIdx]
    this.initForm()
    super.init()
    this.retrieveSupervisorsList()
    this.initPrivileges()
  }

  initPrivileges(): void {
    this.server.update(
      'list-privileges', new FormData(), this.onListPrivilegesResponse
    )
  }

  private readonly onListPrivilegesResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        this.privileges = response.data

        let data = new FormData()
        data.append('user_id', this.callingComponent.users[this.userIdx].id)
        this.server.update('get-privileges-of-employee', data,
          this.onGetPrivilegesOfEmployeeResponse
        )
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'list-privileges', response.meta.return_code
        ))
      }
    }
  
  private readonly onGetPrivilegesOfEmployeeResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        this.programs = response.data
        for (let program of this.programs)
          for (let module of program.modules)
            for (let log of module.logs)
              this.selectedPrivileges[log.name] = {
                logID: log.id,
                privilegeID: log.privilege_id
              }
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'get-privileges-of-employee', response.meta.return_code
        ))
      }
    }

  initForm(): void {
    this.passwordEditionForm = this.getPasswordEditionForm()
    this.usernameEditionForm = this.getUsernameEditionForm()
    this.userForm = this.getUserInfoEditionForm()

    this.selectedZoneId = this.userData.zone_id
    this.selectedRole = {
      id: this.userData.id,
      name: this.userData.role_name
    }

    if (this.userData.role_name == 'Employee') {
      let data = new FormData()
      data.append('user_id', this.userData.id)
      this.server.update('get-employee-info', data,
        this.onGetEmployeeInfoResponse
      )
    }
  }

  private getPasswordEditionForm(): FormGroup {
    return this.formBuilder.group(
      {
        oldPassword: [ null, Validators.compose([
          Validators.required, Validators.minLength(6)
        ])],
        newPassword: [ null, Validators.compose([
          Validators.minLength(6)
        ])],
        newPasswordConfirmation: [ null, Validators.compose([
          Validators.minLength(6)
        ])]
      }, 
      {
        validator: (form: FormGroup) => {
          const password = form.controls.newPassword.value 
          const passwordConfirmation = 
            form.controls.newPasswordConfirmation.value
          return (password === passwordConfirmation) ?
            null : { arePasswordsDifferent: true}
        }
      }
    )
  }

  private getUsernameEditionForm(): FormGroup {
    return this.formBuilder.group({
      newUsername: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  private getUserInfoEditionForm(): FormGroup {
    return this.formBuilder.group({
      employeeID: [ this.userData.employee_num, 
        Validators.required 
      ],
      firstName: [ this.userData.first_name, 
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])
      ],
      lastName: [ this.userData.last_name, 
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ]) 
      ],
      role: [ this.userData.role_id, Validators.required ],
      zone: [ this.userData.zone_id, Validators.required ],
      username: [ 
        {
          value: this.userData.login_name, 
          disabled: true
        },
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]) 
      ]
    })
  }

  private readonly onGetEmployeeInfoResponse: (response: any) => void = 
    (response: any) => {
      if (response.meta.return_code == 0) {
        this.userData.supervisor_id = this.selectedSupervisorID = 
          response.data.supervisor_id
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'get-employee-info', response.meta.return_code
        ))
      }
    }

  onEditFormSubmit(): void {
    const data = new FormData()
    data.append('user_id', this.userData.id)
    data.append('first_name', this.userForm.controls.firstName.value)
    data.append('last_name', this.userForm.controls.lastName.value)
    data.append('employee_num', this.userForm.controls.employeeID.value)
    this.progressModal = this.modalManager.open(ProgressModalComponent)
    this.server.update('edit-user-info', data, this.onEditUserInfoResponse)
  }

  private readonly onEditUserInfoResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        this.callingComponent.users[this.userIdx].first_name = 
          this.userForm.controls.firstName.value
        this.callingComponent.users[this.userIdx].last_name =
          this.userForm.controls.lastName.value
        this.callingComponent.users[this.userIdx].employee_num = 
          this.userForm.controls.employeeID.value

        const data = new FormData()
        data.append('user_id', this.userData.id)
        data.append('zone_id', this.userForm.controls.zone.value)
        this.server.update('edit-user-zone', data, this.onEditUserZoneResponse)
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'edit-user-info', response.meta.return_code
        ))
        this.progressModal.instance.modalComponent.close()
      }
    }
  
  private readonly onEditUserZoneResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        const newRoleId = this.userForm.controls.role.value
        const newRole = this.getRoleNameByIdFromArray(newRoleId, this.userRoles)
        const isEmployee = newRole == 'Employee'

        const data = new FormData()
        data.append('user_id', this.userData.id)
        data.append('role_id', newRoleId)
        if (isEmployee) {
          data.append('supervisor_id', this.selectedSupervisorID.toString())
        }
        this.server.update('edit-user-role', data, this.onEditUserRoleResponse)
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'edit-user-zone', response.meta.return_code
        ))
        this.progressModal.instance.modalComponent.close()
      }
    }

  private readonly onEditUserRoleResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        const newRoleId = this.userForm.controls.role.value
        const newRole = this.getRoleNameByIdFromArray(newRoleId, this.userRoles)
        const isSupervisor = newRole == 'Supervisor'
        const isEmployee = newRole == 'Employee'

        if (isEmployee || isSupervisor) {
          const data = new FormData()
          data.append('user_id', this.userData.id)

          let j = 0
          for (let i in this.selectedPrivileges) {
            data.append(
              `privileges[${ j }][log_id]`, this.selectedPrivileges[i].logID
            )
            data.append(
              `privileges[${ j++ }][privilege_id]`, 
              this.selectedPrivileges[i].privilegeID
            )
          }

          this.server.update('edit-user-privileges', data, 
            this.onEditUserPrivilegesResponse
          )
        } else {
          this.toastManager.showText(this.langManager.getServiceMessage(
            'edit-user-role', response.meta.return_code
          ))
          this.progressModal.instance.modalComponent.close()
          this.modalComponent.close()
        }
      } else {
        this.toastManager.showText(this.langManager.getServiceMessage(
          'edit-user-role', response.meta.return_code
        ))      
        this.progressModal.instance.modalComponent.close()
      }
    }

  private readonly onEditUserPrivilegesResponse: (response: any) => void =
    (response: any) => {
      if (response.meta.return_code == 0) {
        const newRoleId = this.userForm.controls.role.value
        const newRole = this.getRoleNameByIdFromArray(newRoleId, this.userRoles)
        const isEmployee = newRole == 'Employee'

        if (isEmployee) {
          const data = new FormData()
          data.append('assignments[0][employee_id]', this.userData.id)
          data.append(
            'assignments[0][supervisor_id]', 
            this.selectedSupervisorID.toString()
          )
          this.server.update('assign-employees-to-supervisors', data,
            this.onAssignEmployeesToSupervisors
          )
        } else {
          this.toastManager.showText(this.langManager.getServiceMessage(
            'edit-user-privileges', response.meta.return_code
          ))
          this.progressModal.instance.modalComponent.close()
          this.modalComponent.close()
        }
      } 
    }

  private readonly onAssignEmployeesToSupervisors: (response: any) => void =
    (response: any) => {
      this.toastManager.showText(this.langManager.getServiceMessage(
        'assign-employees-to-supervisors', response.meta.return_code
      ))
      if (response.meta.return_code == 0) {
        this.progressModal.instance.modalComponent.close()
        this.modalComponent.close()
      }
    }

  private onPasswordEditionFormSubmit(): void {
    const data = new FormData()
    data.append('password', this.passwordEditionForm.controls.oldPassword.value)
    data.append(
      'new_password', this.passwordEditionForm.controls.newPassword.value
    )
    data.append('user_id', this.userData.id)
    this.progressModal = this.modalManager.open(ProgressModalComponent)
    this.server.update('change-password', data, this.onChangePasswordResponse)
  }

  private readonly onChangePasswordResponse: (response: any) => void =
    (response: any) => {
      this.progressModal.instance.modalComponent.close()
      this.toastManager.showText(this.langManager.getServiceMessage(
        'change-password', response.meta.return_code
      ))
    }

  private onUsernameEditionFormSubmit(): void {
    const data = new FormData()
    data.append('password', this.usernameEditionForm.controls.password.value)
    data.append('new_username', this.usernameEditionForm.controls.newUsername.value)
    data.append('user_id', this.userData.id)
    this.progressModal = this.modalManager.open(ProgressModalComponent)
    this.server.update('change-username', data, this.onChangeUsernameResponse)
  }

  private readonly onChangeUsernameResponse: (response: any) => void =
    (response: any) => {
      this.progressModal.instance.modalComponent.close()
      this.toastManager.showText(this.langManager.getServiceMessage(
        'change-username', response.meta.return_code
      ))

      if (response.meta.return_code == 0) {
        this.callingComponent.users[this.userIdx].login_name = 
        this.userData.login_name = 
          this.usernameEditionForm.controls.newUsername.value
      }
    }
}