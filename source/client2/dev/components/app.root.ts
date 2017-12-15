// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UIRouterModule } from "@uirouter/angular"
import { MaterializeModule } from 'ng2-materialize'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

// https://www.npmjs.com/package/angular2-pubsub
import { PubSubModule } from 'angular2-pubsub'

import { TranslationModule, LocaleService, TranslationService as TService } from 'angular-l10n'

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

// Importamos el cargador de reportes

import { DynamicComponentContainerDirective } from '../directives/dynamic.container'

import { ReportTab } from './app.reports'

import { ReportDisplayer } from './app.report.displayer.component'

import { ReportLoader } from './app.report.loader.component'

// Importamos el cargador de bitácoras

import { LogLoaderComponent } from './app.log.loader.component'

// Importamos los componentes de las bitácoras

// GMP Packing Preop

// Bitácora

import { GMPPackingPreopItemComponent } from './gmp/packing/preop/log/gmp.packing.preop.item.component'
import { GMPPackingPreopTypeComponent } from './gmp/packing/preop/log/gmp.packing.preop.type.component'
import { GMPPackingPreopAreaComponent } from './gmp/packing/preop/log/gmp.packing.preop.area.component'
import { GMPPackingPreopLogComponent } from './gmp/packing/preop/log/gmp.packing.preop.log.component'

// Reporte

import { GMPPackingPreopReportComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.component'
import { GMPPackingPreopReportAreaComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.area.component'
import { GMPPackingPreopReportTypeComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.type.component'
import { GMPPackingPreopReportItemComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.item.component'

// GMP Packing Scale Calibration

// Inventario

import { GMPPackingScaleCalibrationInventoryComponent } from '../components/inventories/gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScaleCalibrationInventoryItemComponent } from '../components/inventories/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.inventory.item'
import { GMPPackingScaleCalibrationInventoryListComponent } from '../components/inventories/gmp-packing-scale-calibration/list/gmp.packing.scale.calibration.inventory.list'
//import { GMPPackingScaleCalibrationAddItemComponent } from '../components/inventories/gmp-packing-scale-calibration/add-item/gmp.packing.scale.calibration.add.item'

// Genericos

import { ReportLoaderCard } from './report.loader.card.component'
import { LogHeaderComponent } from './app.log.header'

// Importamos los componentes de los modales
import { ProgressModalComponent } from './modal.please.wait'
import { EditFooterModalComponent } from './modal.edit.footers'
import { EditSignatureModalComponent } from './modal.edit.signature'
import { ZoneInfoModalComponent } from './modal.zone.info'
import { UserInfoModalComponent } from './modal.user.info'

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
import { LoaderService, KoiLoader } from '../services/app.loaders'
import { InventoryService } from '../services/app.inventory'
import { AlertComponent } from '../services/alert/app.alert.component'
import { AlertController } from '../services/alert/app.alert'
import { DragulaModule } from 'ng2-dragula/components/dragular.module';
import { TabLogLoaderComponent } from './logs/log.loader';

// Declaramos el modulo raiz que indica el inicio de nuestra aplicacion
@NgModule({
  // declaramos los modulos globales que vamos a importar
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DragulaModule,
    TranslationModule.forRoot(),
    MaterializeModule.forRoot(),
    PubSubModule.forRoot(),
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
        },
        {
          name: 'users',
          url: '/users',
          component: UsersComponent
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
    DateTimeService,
    LoaderService,
    InventoryService,
    AlertController
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
    DynamicComponentContainerDirective,
    LogLoaderComponent,
    ReportTab,
    ReportDisplayer,
    ReportLoader,
    ReportLoaderCard,
    GMPPackingPreopItemComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopLogComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingScaleCalibrationInventoryItemComponent,
    GMPPackingScaleCalibrationInventoryListComponent,
    //GMPPackingScaleCalibrationAddItemComponent,
    LogHeaderComponent,
    TabLogLoaderComponent
  ],
  // declaramos cualquier componente que sera inyectado dinamicamente
  entryComponents: [
    ReportDisplayer,
    ProgressModalComponent,
    KoiLoader,
    AlertComponent,
    EditFooterModalComponent,
    EditSignatureModalComponent,
    ZoneInfoModalComponent,
    GMPPackingPreopReportComponent,
    UserInfoModalComponent
  ],
  // indicamos cual es el componente raiz
  bootstrap: [HomeComponent]
})
export class RootModule {
  // Constructor del modulo raiz importa aquellos servicios que seran globales 
  // para todos los demas modulos
  constructor(
    private home: HomeElementsService,
    private langManager: LanguageService,
    public locale: LocaleService,
    public translation: TService
  ) {
    this.locale.addConfiguration()
      .addLanguages(['en', 'es'])
      .setCookieExpiration(30)
      .defineLanguage('es');

    this.translation.addConfiguration()
      .addProvider('./assets/locale-');

    this.translation.init()
  }
}
