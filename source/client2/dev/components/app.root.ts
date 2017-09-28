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
import { LogListComponent } from './app.log.list'
import { InventoryListComponent } from './app.inventory.list'
import { AuthorizationListComponent } from './app.authorizations'
import { LogFootersComponent } from './app.log.footers'
import { SupervisorsComponent } from './app.supervisors'
import { SignaturesComponent } from './app.signatures'
import { ZonesComponent } from './app.zones'

// Importamos el cargador de bitácoras

import { LogLoaderComponent } from './app.log.loader.component'

// Importamos los componentes de las bitácoras
import { GMPPackingPreopItemComponent } from './gmp.packing.preop.item.component'
import { GMPPackingPreopTypeComponent } from './gmp.packing.preop.type.component'
import { GMPPackingPreopAreaComponent } from './gmp.packing.preop.area.component'
import { GMPPackingPreopLogComponent } from './gmp.packing.preop.log.component'
import { ReportLoaderCard } from './report.loader.card.component'
import { LogHeaderComponent } from './app.log.header'

// Importamos los componentes de los modales
import { ProgressModalComponent } from './modal.please.wait'
import { EditFooterModalComponent } from './modal.edit.footers'
import { EditSignatureModalComponent } from './modal.edit.signature'
import { ZoneInfoModalComponent } from './modal.zone.info'

// Importamos los servicios que van a ser necesitados por cada pagina del 
// sistema
import { uiRouterConfigFn } from '../functions/ui.router.config'
import { KeysPipe } from '../pipes/app.keys'
import { ClickStopPropagationDirective } from '../directives/app.stop.propagation'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { DateTimeService } from '../services/app.time'

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
        },
        {
          name: 'log-selection',
          url: '/log-selection/:program/:module',
          component: LogListComponent
        },
        {
          name: 'log-view',
          url: '/log/:suffix',
          component: LogLoaderComponent
        },
        {
          name: 'inventory-selection',
          url: '/inventory-selection/:program/:module',
          component: InventoryListComponent
        },
        {
          name: 'pending-authorizations-list',
          url: '/pending-authorizations-list',
          component: AuthorizationListComponent
        },
        {
          name: 'log-footers',
          url: '/log-footers',
          component: LogFootersComponent
        },
        {
          name: 'supervisors',
          url: '/supervisors',
          component: SupervisorsComponent
        },
        {
          name: 'signatures',
          url: '/signatures',
          component: SignaturesComponent
        },
        {
          name: 'zones',
          url: '/zones',
          component: ZonesComponent
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
    LanguageService,
    DateTimeService
  ],
  // declaramos los componentes que va a utilizar nuestro sistema
  declarations: [
    ClickStopPropagationDirective,
    HomeComponent,
    LogInComponent,
    EditProfileComponent,
    KeysPipe,
    ReportProblemComponent,
    ProgressModalComponent,
    LogListComponent,
    InventoryListComponent,
    AuthorizationListComponent,
    LogFootersComponent,
    EditFooterModalComponent,
    SupervisorsComponent,
    SignaturesComponent,
    ZonesComponent,
    EditSignatureModalComponent,
    ZoneInfoModalComponent,
    LogLoaderComponent,
    ReportLoaderCard,
    GMPPackingPreopItemComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopLogComponent,
    LogHeaderComponent
  ],
  // declaramos cualquier componente que sera inyectado dinamicamente
  entryComponents: [
    ProgressModalComponent,
    EditFooterModalComponent,
    EditSignatureModalComponent,
    ZoneInfoModalComponent
  ],
  // indicamos cual es el componente raiz
  bootstrap: [ HomeComponent ]
})
export class RootModule { 
  // Constructor del modulo raiz importa aquellos servicios que seran globales 
  // para todos los demas modulos
  constructor(
    private home: HomeElementsService,
    private langManager: LanguageService
  ) {
  }
}
