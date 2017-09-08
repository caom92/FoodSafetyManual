import { Component, OnInit } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { StateService } from '@uirouter/angular'
import { ToastService } from '../services/app.toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LanguageService } from '../services/app.language'

// Componente que define el comportamiento de la pagina de editar perfil de 
// usuario
@Component({
  templateUrl: '../templates/app.edit.profile.html'
})
export class EditProfileComponent implements OnInit
{
  // Interfaz que representa el contenido y las reglas de validacion del 
  // formulario para editar la contraseña
  passwordEditionForm: FormGroup  

  // Interfaz que representa el contenido y las reglas de validacion del 
  // formulario para editar el nombre de usuario
  usernameEditionForm: FormGroup

  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private router: StateService,
    private toastManager: ToastService,
    private formBuilder: FormBuilder,
    private langManager: LanguageService
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit() {
    // desplegamos el menu lateral de navegacion
    this.home.displaySideNav()

    // inicializamos las reglas de validacion del formulario de edicion de 
    // contraseña
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

    // hacemos lo mismo para el formulario de edicion de nombre de usuario
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

  // Esta funcion es invocada cada vez que se hace clic en el boton de enviar 
  // del formulario de edicion de contraseña
  onPasswordEditionFormSubmit() {
    // recuperamos los datos capturados en el formulario
    let data = new FormData()
    data.append('user_id', this.home.userID.toString())
    data.append('password', this.passwordEditionForm.value.oldPassword)
    data.append('new_password', this.passwordEditionForm.value.newPassword)

    // los enviamos al servidor
    this.server.update(
      'change-password',
      data,
      (response: Response) => {
        // convertimos el resultado en JSON 
        let result = JSON.parse(response['_body'].toString())

        // damos retroalimentacion al usuario del resultado de esta opreacion
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'change-password', 
            result.meta.return_code
          )
        )
      } // (response: Response)
    ) // this.server.update
  } // onPasswordEditionFormSubmit()

  // Esta funcion es invocada cada vez que se hace clic en el boton de enviar 
  // del formulario de edicion de nombre de usuario
  onUsernameEditionFormSubmit() {
    // primero recuperamos los datos capturados del formulario
    let newUsername = this.usernameEditionForm.value.newUsername
    let data = new FormData()
    data.append('new_username', newUsername)
    data.append('password', this.usernameEditionForm.value.password)

    // luego los enviamos al servidor
    this.server.update(
      'change-username',
      data,
      (response: Response) => {
        // convertimos la respuesta en un JSON
        let result = JSON.parse(response['_body'].toString())

        // si el cambio se realizo con exito en la base de datos, hay que 
        // actualizar la copia que tenemos en memoria local
        if (result.meta.return_code == 0) {
          this.home.loginName = newUsername
        }
        
        // damos retroalimentacion al usuario del resultado de esta operacion
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'change-username', result.meta.return_code
          )
        )
      } // (response: Response)
    ) // this.server.update
  } // onUsernameEditionFormSubmit()
} // export class EditProfileComponent implements OnInit