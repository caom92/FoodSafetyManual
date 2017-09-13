// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UIRouterModule } from "@uirouter/angular"
import { MaterializeModule } from 'ng2-materialize'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { HttpModule } from '@angular/http'

// Importamos los componentes de cada pagina de nuestra aplicacion
import { HomeComponent } from './app.home'
import { LogInComponent } from './app.login'
import { EditProfileComponent } from './app.edit.profile'
import { ReportProblemComponent } from './app.report.problem'
import { ProgressModalComponent } from './app.please.wait'

// Importamos los servicios que van a ser necesitados por cada pagina del 
// sistema
import { uiRouterConfigFn } from '../services/ui.router.config'
import { KeysPipe } from '../services/app.keys'
import { ClickStopPropagationDirective } from '../directives/app.stop.propagation'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'

// Declaramos el modulo raiz que indica el inicio de nuestra aplicacion
@NgModule({
  // declaramos los modulos globales que vamos a importar
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
      config: uiRouterConfigFn,
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
        },
        {
          name: 'report-problem',
          url: '/report-problem',
          component: ReportProblemComponent
        }
      ],
      useHash: true,
      otherwise: '/edit-profile'
    })
  ],
  // declaramos los servicios globales
  providers: [
    HomeElementsService,
    BackendService,
    ToastService,
    LanguageService
  ],
  // declaramos los componentes que va a utilizar nuestro sistema
  declarations: [
    ClickStopPropagationDirective,
    HomeComponent,
    LogInComponent,
    EditProfileComponent,
    KeysPipe,
    ReportProblemComponent,
    ProgressModalComponent
  ],
  entryComponents: [
    ProgressModalComponent
  ],
  // indicamos cual es el componente raiz
  bootstrap: [ HomeComponent ]
})
export class RootModule { 
  constructor(
    private home: HomeElementsService,
    private langManager: LanguageService
  ) {
  }
}
