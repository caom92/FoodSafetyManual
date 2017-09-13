import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  templateUrl: '../templates/app.login.html',
})
export class LogInComponent implements OnInit 
{
  // Interfaz que representa el contenido y las reglas de validacion del 
  // formulario de captura
  userLogInInfo: FormGroup

  // El constructor de este componente
  // haremos uso de la interfaz del servidor y del constructor de formularios
  constructor(
    private server: BackendService, 
    private formBuilder: FormBuilder,
    private toastManager: ToastService,
    private router: StateService,
    private home: HomeElementsService,
    private langManager: LanguageService
  ) {
  }

  // Almacena los datos recuperados del servidor al momento de iniciar sesion 
  // para ser utilizados mas adelante
  private storeUserData(userData) {
    this.home.userID = userData.user_id
    this.home.roleName = userData.role_name
    this.home.employeeNum = userData.employee_num
    this.home.userFullName = `${userData.first_name} ${userData.last_name}`
    this.home.loginName = userData.login_name
    this.home.companyName = userData.company
    this.home.companyLogo = userData.logo
    this.home.companyAddress = userData.address

    if (userData.zone_id !== undefined) {
      this.home.zoneID = userData.zone_id
      this.home.zoneName = userData.zone_name
    }

    if (userData.privileges !== undefined) {
      this.home.privileges = userData.privileges
    }

    if (userData.zone_list !== undefined) {
      this.home.zones = userData.zone_list
    }

    if (userData.log_list !== undefined) {
      this.home.logs = userData.log_list
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
          // si hubo un problema con la comunicacion con el servidor debemos 
          // notificar al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'check-session', result.meta.return_code
            )
          )
        }
      } // (response: Response)
    ) // this.server.update
  } // ngOnInit()

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
          this.storeUserData(result.data)

          // dependiendo del rol del usuario, se deben mostrar diferentes 
          // opciones en la aplicacion
          switch (this.home.roleName) {
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

          // indicamos al usuario que ha iniciado sesion
          this.toastManager.showText(
            this.langManager.getServiceMessage('login', result.meta.return_code)
          )
          this.home.displaySideNav()
          this.router.go('edit-profile')
        } else {
          // si hubo un problema con la conexion del servidor, desplegamos un 
          // mensaje de error al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage('login', result.meta.return_code)
          )
        } // if (result.meta.return_code == 0)
      } // (response: Response)
    ) // this.server.update
  } // onLogInFormSubmit
} // class LogInComponent