// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule, Injector } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UIRouterModule, UIRouter, TransitionService, Transition } from "@uirouter/angular"
import { MaterializeModule } from 'ng2-materialize'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { HttpModule } from '@angular/http'

// Importamos los componentes de cada pagina de nuestra aplicacion
import { HomeComponent } from './app.home'
import { LogInComponent } from './app.login'
import { EditProfileComponent } from './app.edit.profile'
import { ClickStopPropagationDirective } from '../directives/app.stop.propagation'

// Declaramos el modulo raiz que indica el inicio de nuestra aplicacion
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    UIRouterModule.forRoot({
      // hay que configurar ui-router para poder redireccionar al usuario 
      // dependiendo si la sesion esta iniciada o no
      config: function(router: UIRouter, injector: Injector) {
        // ui-router tiene un mecanismo que nos permite ejecutar codigo cuando 
        // se cambia de un estado a otro, en este caso, onStart se ejecuta 
        // despues de salir del estado anterior y antes de entrar al estado 
        // siguiente, el detalle con esta funcion es que siempre debe retornar 
        // ya sea un booleano que indique si la navegacion al sig. se debe 
        // llevar a cabo o se debe detener, o una instancia del estado al cual 
        // se va a redireccionar el usuario; debido a esto, la funcion debe 
        // ejecutarse de forma sincrona, lo que es incompatible con la interfaz 
        // HTTP que podemos utilizar para revisar el cookie de sesion en el 
        // servidor. Debido a esto y al hecho de que, de hacerlo asi, se 
        // revisaria el cookie de sesion cada que se navega a una nueva pagina, 
        // no revisamos el cookie de sesion en esta funcion y en cambio 
        // revisamos una variable local
        router.transitionService.onStart(
          // activamos el callback de transferencia cuando se navega a 
          // cualquier estado
          { to: '*' },
          function(transition: Transition) {
            // obtenemos una instancia del servicio que maneja los estados, 
            // ademas de una copia del estado anterior y una del estado 
            // siguiente
            const stateService = transition.router.stateService
            let from = transition.$from()
            let to = transition.$to()

            // iniciamos ciertas banderas que nos diran de donde viene y a 
            // donde va el usuario
            let isComingFromOutside = from.name.length == 0
            let isComingFromLogIn = from.name == 'login'
            let isGoingToLogIn = to.name == 'login'

            // una funcion que revisa si el usuario ya inicio sesion o no
            let isLoggedIn = () => {
              return (
                sessionStorage.is_logged_in !== undefined 
                && sessionStorage.is_logged_in !== 'false'
              )
            }

            // si el usuario viene de alguna pagina externa y quiere ir a 
            // cualquier pagina que no sea la de inicio de sesion
            // revisamos si la sesion esta iniciada
            if (
              (isComingFromOutside && !isGoingToLogIn)
              || (isComingFromLogIn && !isGoingToLogIn)
            ) {
              // si la sesion esta iniciada, permitimos la navegacion y en caso 
              // contrario, redireccionamos a la pantalla de inicio de sesion
              return (isLoggedIn()) ? true : stateService.target('login')
            }

            // si el usuario viene de alguna pagina externa y quiere ir a la 
            // pagina de inicio de sesion, o si viene de cualquier pagina 
            // interna y quiere navegar a la pagina de inicio de sesion, 
            // revisamos si la sesion esta iniciada
            if (
              (isComingFromOutside && isGoingToLogIn)
              || (!isComingFromOutside && isGoingToLogIn)
            ) {
              // si la sesion esta iniciada, redireccionamos a la pantalla del 
              // perfil del usuario o, en caso contrario, permitimos la 
              // navegacion
              return (isLoggedIn()) ? stateService.target('edit-profile') : true
            }

            // en cualquier otro caso, permitimos la navegacion
            return true
          }  
        )
      },
      states: [
        {
          name: 'login',
          url: '/login',
          component: LogInComponent
        },
        {
          name: 'edit-profile',
          url: '/edit-profile',
          component: EditProfileComponent
        }
      ],
      useHash: true,
      otherwise: '/edit-profile'
    })
  ],
  providers: [],
  declarations: [
    ClickStopPropagationDirective,
    HomeComponent,
    LogInComponent,
    EditProfileComponent
  ],
  bootstrap: [ HomeComponent ]
})
export class RootModule { }
