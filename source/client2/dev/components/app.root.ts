// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterializeModule } from 'ngx-materialize'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { PubSubModule } from 'angular2-pubsub'
import { LocalizationModule, LocaleService, TranslationService, L10nLoader } from 'angular-l10n'

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
import { UsersComponent } from './app.users'
import { CAPAFormComponent } from './capa/log/capa-log.component'
import { CAPACaptureComponent } from './capa/capture/capa-capture.component'
import { CAPAList } from './capa/list/capa-list.component'
import { CAPAReportViewer } from './capa/report/viewer/capa-report-viewer.component'
import { CAPAReportLoader } from './capa/report/loader/capa-report-loader.component'
import { CAPAReport } from './capa/report/report/capa-report.component'
import { DynamicComponentContainerDirective } from '../directives/dynamic.container'

// Importamos los componentes de los modales
import { ProgressModalComponent } from './modal.please.wait'
import { EditFooterModalComponent } from './modal.edit.footers'
import { EditSignatureModalComponent } from './modal.edit.signature'
import { ZoneInfoModalComponent } from './modal.zone.info'
import { UserInfoModalComponent } from './modal.user.info'
import { EditUserInfoModalComponent } from './modal.user.info.edit'

// Importamos los servicios que van a ser necesitados por cada pagina del 
// sistema
import { KeysPipe } from '../pipes/app.keys'
import { ClickStopPropagationDirective } from '../directives/app.stop.propagation'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { BackendAPIService } from '../services/backend-api.service'
import { DataResolverService } from '../services/data-resolver.service'
import { FormUtilService } from '../services/form-util.service'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { DateTimeService } from '../services/time.service'
import { LoaderService, KoiLoader } from '../services/app.loaders'
import { InventoryService } from '../services/inventory.service'
import { AlertComponent } from '../services/alert/app.alert.component'
import { AlertController } from '../services/alert/app.alert'
import { DragulaModule, DragulaService } from 'ng2-dragula'
import { FlattenService } from '../services/flatten.service'
import { LogService } from '../services/log.service'
import { MenuService } from '../services/app.menu'
import { CAPAService } from '../services/capa.service'
import { ToastsService } from '../services/app.toasts'
import { TranslationConfigService } from '../services/translation-config.service'
import { AreaManagerService } from '../services/app.area.manager'
import { languageConfig } from '../functions/l10n-config'
import { HttpClientModule } from '@angular/common/http'
import { RootRoutingModule } from './app-routing.root'

// Declaramos el modulo raiz que indica el inicio de nuestra aplicacion
@NgModule({
  // declaramos los modulos globales que vamos a importar
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragulaModule.forRoot(),
    LocalizationModule.forRoot(languageConfig),
    MaterializeModule.forRoot(),
    PubSubModule.forRoot(),
    RootRoutingModule
  ],
  // declaramos los servicios globales
  providers: [
    HomeElementsService,
    BackendService,
    BackendAPIService,
    DataResolverService,
    FormUtilService,
    ToastService,
    LanguageService,
    DateTimeService,
    LoaderService,
    InventoryService,
    AreaManagerService,
    AlertController,
    FlattenService,
    LogService,
    MenuService,
    CAPAService,
    ToastsService,
    TranslationConfigService,
    DragulaService
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
    KoiLoader,
    AlertComponent,
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
    UsersComponent,
    UserInfoModalComponent,
    EditUserInfoModalComponent,
    CAPAFormComponent,
    CAPAList,
    CAPACaptureComponent,
    CAPAReportViewer,
    CAPAReportLoader,
    CAPAReport,
    DynamicComponentContainerDirective
  ],
  // declaramos cualquier componente que sera inyectado dinamicamente
  entryComponents: [
    ProgressModalComponent,
    KoiLoader,
    AlertComponent,
    EditFooterModalComponent,
    EditSignatureModalComponent,
    ZoneInfoModalComponent,
    UserInfoModalComponent,
    EditUserInfoModalComponent
  ],
  // indicamos cual es el componente raiz
  bootstrap: [ HomeComponent ]
})
export class RootModule {
  // Constructor del modulo raiz importa aquellos servicios que seran globales 
  // para todos los demas modulos
  constructor(
    private home: HomeElementsService,
    private langManager: LanguageService,
    public locale: LocaleService,
    public translation: TranslationService,
    public l10nLoader: L10nLoader
  ) {
    this.l10nLoader.load()
  }
}
