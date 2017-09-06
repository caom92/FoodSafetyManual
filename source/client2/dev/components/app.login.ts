import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { HomeElementsService } from '../services/app.home'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  templateUrl: '../templates/app.login.html',
})
export class LogInComponent implements OnInit 
{
  // Interfaz que representa el contenido y las reglas de validacion del 
  // formulario de captura
  userLogInInfo: FormGroup

  // Lista de los mensajes de error a desplegar en la pantalla cuando el 
  // formulario de captura sea invalida
  formErrorMessages = {
    username: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 3 caracteres'
    },
    password: {
      required: 'Este campo es obligatorio',
      minlength: 'Este campo debe tener al menos 6 caracteres'
    }
  }

  // El constructor de este componente
  // haremos uso de la interfaz del servidor y del constructor de formularios
  constructor(
    private server: BackendService, 
    private formBuilder: FormBuilder,
    private toastManager: ToastService,
    private router: StateService,
    private home: HomeElementsService
  ) {
  }

  // Almacena los datos recuperados del servidor al momento de iniciar sesion 
  // en localStorage
  private mapUserDataToLocalStorage(userData) {
    localStorage.user_id = userData.user_id
    localStorage.role_id = userData.role_id
    localStorage.role_name = userData.role_name
    localStorage.exclusive_access = userData.exclusive_access
    localStorage.employee_num = userData.employee_num
    localStorage.first_name = userData.first_name
    localStorage.last_name = userData.last_name
    localStorage.login_name = userData.login_name
    localStorage.company = userData.company
    localStorage.logo = userData.logo
    localStorage.address = userData.address

    if (userData.zone_id !== undefined) {
      localStorage.zone_id = userData.zone_id
      localStorage.zone_name = userData.zone_name
    }

    if (userData.privileges !== undefined) {
      localStorage.privileges = JSON.stringify(userData.privileges)
    }

    if (userData.zone_list !== undefined) {
      localStorage.zone_list = JSON.stringify(userData.zone_list)
    }

    if (userData.log_list !== undefined) {
      localStorage.log_list = JSON.stringify(userData.log_list)
    }
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit() {
    // indicamos que esta es la pagina de inicio de sesion
    this.home.hideSideNav()

    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes
    this.userLogInInfo = this.formBuilder.group({
      username: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })

    // cuando el usuario quiere entrar a la pantalla de inicio de sesion, hay 
    // que revisar si el usuario aun no haya iniciado sesion para permitirle 
    // entrar a esta pagina
    this.server.update(
      'check-session', 
      new FormData(), 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          if (result.data) {
            // si el usuario ya inicio sesion hay que redireccionar al usuario 
            // a la pagina principal
            localStorage.is_logged_in = true
            this.router.go('edit-profile')
          } else {
            // si el usuario no hay iniciado sesion, permitimos al usuario 
            // entrar a esta pagina
            localStorage.is_logged_in = false
          }
        } else {
          // si algo ocurrio con la comunicacion con el servidor, desplegamos 
          // un mensaje de error al usuario
          this.toastManager.showServiceErrorText('check-session', result.meta)
        }
      }
    )
  }

  // Esta funcion es invocada cuando el usuario hace clic en el boton de enviar
  // en el formulario de captura
  onLogInFormSubmit() {
    // guardamos los datos ingresados por el usuario en el formulario en una 
    // instancia de FormData
    let formData = new FormData()
    formData.append('username', this.userLogInInfo.value.username)
    formData.append('password', this.userLogInInfo.value.password)

    // enviamos los datos al servidor
    this.server.update(
      'login', 
      formData, 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          // si el usuario logro iniciar sesion exitosamente, guardamos los 
          // datos retornados por el servidor y activamos la bandera que indica 
          // que iniciamos sesion
          localStorage.is_logged_in = true
          this.mapUserDataToLocalStorage(result.data)
          this.home.roleName = localStorage.role_name

          // dependiendo del rol del usuario, se deben mostrar diferentes 
          // opciones en la aplicacion
          switch (localStorage.role_name) {
            case 'Employee':
            case 'Manager':
              this.home.initProgramsMenu()
            break

            case 'Supervisor':
              this.home.initProgramsMenu()
              this.home.initSupervisorMenu(this.server, this.toastManager)
            break

            case 'Director':
              this.home.initProgramsMenu()
              this.home.initZoneMenu(this.server, this.toastManager)
            break
          }

          // indicamos al usuario que ha iniciado
          this.toastManager.showText('loggedIn')
          this.router.go('edit-profile')
        } else {
          // si hubo un problema con la conexion del servidor, desplegamos un 
          // mensaje de error al usuario
          this.toastManager.showServiceErrorText('login', result.meta)
        }
      }
    )
  } // onLogInFormSubmit
} // class LogInComponent