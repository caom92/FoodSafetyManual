import { UserInfoModalComponent } from './modal.user.info'
import { Component, OnInit, Input } from '@angular/core'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { MzModalService } from 'ng2-materialize'
import { UsersComponent } from './app.users'
import { ProgressModalComponent } from './modal.please.wait';

@Component({
  templateUrl: '../templates/modal.user.info.edit.html'
})
export class EditUserInfoModalComponent extends UserInfoModalComponent {
  @Input()
  userIdx: number

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
      'list-privileges',
      new FormData(),
      (response: any) => {
        if (response.meta.return_code == 0) {
          this.privileges = response.data

          let data = new FormData()
          data.append('user_id', this.callingComponent.users[this.userIdx].id)
          this.server.update(
            'get-privileges-of-employee',
            data,
            (response: any) => {
              if (response.meta.return_code == 0) {
                this.programs = response.data
                for (let program of this.programs) {
                  for (let module of program.modules) {
                    for (let log of module.logs) {
                      this.selectedPrivileges[log.name] = {
                        logID: log.id,
                        privilegeID: log.privilege_id
                      }
                    }
                  }
                }
              } else {
                this.toastManager.showText(
                  this.langManager.getServiceMessage(
                    'get-privileges-of-employee',
                    response.meta.return_code
                  )
                )
              }
            }
          )
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
      employeeID: [ 
        {
          value: this.userData.employee_num,
          disabled: true
        }, 
        Validators.required 
      ],
      firstName: [ 
        {
          value: this.userData.first_name,
          disabled: true
        }, 
        Validators.compose([
          Validators.required,
          Validators.maxLength(255)
        ])
      ],
      lastName: [ 
        {
          value: this.userData.last_name,
          disabled: true
        }, 
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
      ],
      password: [ null, Validators.compose([
        Validators.minLength(6)
      ]) ],
      passwordConfirmation: [ null, Validators.compose([
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
    this.selectedRole = {
      id: this.userData.id,
      name: this.userData.role_name
    }
    this.selectedZoneId = this.userData.zone_id

    if (this.userData.role_name == 'Employee') {
      let data = new FormData()
      data.append('user_id', this.userData.id)
      this.server.update(
        'get-employee-info',
        data,
        (response: any) => {
          if (response.meta.return_code == 0) {
            this.userData.supervisor_id = 
              this.selectedSupervisorID = 
                response.data.supervisor_id
          } else {
            this.langManager.getServiceMessage(
              'get-employee-info', response.meta.return_code
            )
          }
        }
      )
    }
  }

  onEditFormSubmit(): void {
    // change-password
    const newPassword = this.userForm.controls.password.value
    const newRoleId = this.userForm.controls.role.value
    const newRole = this.getRoleNameByIdFromArray(newRoleId, this.userRoles)
    const newZoneId = this.userForm.controls.zone.value
    const isEmployee = newRole == 'Employee'
    const isSupervisor = newRole == 'Supervisor'

    let data = new FormData()
    data.append('user_id', this.userData.id)
    data.append('zone_id', newZoneId)
    const modal = this.modalManager.open(ProgressModalComponent)
    this.server.update('edit-user-zone', data,
      (response: any) => {
        if (response.meta.return_code == 0) {
          data = new FormData()
          data.append('user_id', this.userData.id)
          data.append('role_id', newRoleId)

          if (newRole == 'Employee') {
            data.append('supervisor_id', this.selectedSupervisorID.toString())
          }
          
          this.server.update('edit-user-role', data, 
            (response: any) => {
              if (response.meta.return_code == 0) {
                if (isEmployee || isSupervisor) {
                  data = new FormData()
                  data.append('user_id', this.userData.id)
                  
                  let privileges = []
                  let j = 0
                  for (let i in this.selectedPrivileges) {
                    data.append(
                      `privileges[${ j }][log_id]`, 
                      this.selectedPrivileges[i].logID
                    )
                    data.append(
                      `privileges[${ j++ }][privilege_id]`,
                      this.selectedPrivileges[i].privilegeID
                    )
                  }

                  this.server.update('edit-user-privileges', data, 
                    (response: any) => {
                      if (response.meta.return_code == 0) {
                        if (isEmployee) {
                          data = new FormData()
                          data.append(
                            'assignments[0][employee_id]', 
                            this.userData.id
                          )
                          data.append(
                            'assignments[0][supervisor_id]',
                            this.selectedSupervisorID.toString()
                          )
                          this.server.update(
                            'assign-employees-to-supervisors',
                            data,
                            (response: any) => {
                              if (response.meta.return_code == 0) {
                                this.toastManager.showText(
                                  'Datos del usuario editados con exito'
                                )
                                modal.instance.modalComponent.close()
                                this.modalComponent.close()
                              } else {
                                this.toastManager.showText(
                                  this.langManager.getServiceMessage(
                                    'assign-employees-to-supervisors', 
                                    response.meta.return_code
                                  )
                                )
                              }
                            }
                          )
                        } else {
                          this.toastManager.showText(
                            'Dato del usuario editados con exito'
                          )
                          modal.instance.modalComponent.close()
                          this.modalComponent.close()
                        }
                      } 
                    }
                  )
                } else {
                  this.toastManager.showText(
                    'Dato del usuario editados con exito'
                  )
                  modal.instance.modalComponent.close()
                  this.modalComponent.close()
                }
              } else {
                this.toastManager.showText(this.langManager.getServiceMessage(
                  'edit-user-role', response.meta.return_code
                ))      
                modal.instance.modalComponent.close()
              }
            }
          )
        } else {
          this.toastManager.showText(this.langManager.getServiceMessage(
            'edit-user-zone', response.meta.return_code
          ))
          modal.instance.modalComponent.close()
        }
      }
    )
  }
}