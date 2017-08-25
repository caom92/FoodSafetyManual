import { Component, OnInit } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { StateService } from '@uirouter/angular'
import { ToastService } from '../services/app.toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  templateUrl: '../templates/app.edit.profile.html'
})
export class EditProfileComponent implements OnInit
{
  username = localStorage.login_name
  employeeID = localStorage.employee_num
  fullName = `${ localStorage.first_name } ${ localStorage.last_name }`
  passwordEditionForm: FormGroup  
  usernameEditionForm: FormGroup
  passwordEditionFormMessages = {
    newPassword: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 6 caracteres'
    },
    newPasswordConfirmation: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 6 caracteres'
    },
    oldPassword: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 6 caracteres'
    }
  }
  usernameEditionFormMessages = {
    newUsername: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 3 caracteres'
    },
    password: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 6 caracteres'
    }
  }

  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private router: StateService,
    private toastManager: ToastService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.home.displaySideNav()
    this.home.userFullName = this.fullName
    this.passwordEditionForm = this.formBuilder.group({
      oldPassword: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      newPasswordConfirmation: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]) ],
      newPassword: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]) ]
    })
    this.usernameEditionForm = this.formBuilder.group({
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

  onPasswordEditionFormSubmit() {
    let data = new FormData()
    data.append('user_id', localStorage.user_id)
    data.append('password', this.passwordEditionForm.value.oldPassword)
    data.append('new_password', this.passwordEditionForm.value.newPassword)
    this.server.update(
      'change-password',
      data,
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          this.toastManager.showText('passwordChanged')
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toastManager.showServiceErrorText('change-password', result.meta)
        }
      }
    )
  }

  onUsernameEditionFormSubmit() {
    let newUsername = this.usernameEditionForm.value.newUsername
    let data = new FormData()
    data.append('new_username', newUsername)
    data.append('password', this.usernameEditionForm.value.password)
    this.server.update(
      'change-username',
      data,
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          this.toastManager.showText('usernameChanged')
          localStorage.username = newUsername
          this.username = newUsername
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toastManager.showServiceErrorText('change-username', result.meta)
        }
      }
    )
  }
}