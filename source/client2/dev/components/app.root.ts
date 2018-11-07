// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UIRouterModule } from '@uirouter/angular'
import { MaterializeModule } from 'ngx-materialize'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { PubSubModule } from 'angular2-pubsub'
import { LocalizationModule, LocaleService, TranslationService as TService, L10nLoader } from 'angular-l10n'

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
import { DragulaModule, DragulaService } from 'ng2-dragula'
import { LogService } from '../services/app.logs'
import { MenuService } from '../services/app.menu'
import { ToastsService } from '../services/app.toasts'
import { TranslationService } from '../services/app.translation'
import { AreaManagerService } from '../services/app.area.manager'
import { languageConfig } from '../functions/l10n-config'
import { HttpClientModule } from '@angular/common/http'

import { MenuModule } from './menu/menu.module'
import { DocumentModule } from './document-viewer/document.module'
import { ProductDataModule } from './product-data/product-data.module'

import { GMPPackingHandWashingInventoryModule } from './inventories/gmp-packing-hand-washing/gmp-packing-hand-washing.module'
import { GMPPackingColdRoomTempInventoryModule } from './inventories/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp.module'
import { GMPDocControlDocControlInventoryModule } from './inventories/gmp-doc-control-doc-control/gmp-doc-control-doc-control.module'
import { GMPPackingScaleCalibrationInventoryModule } from './inventories/gmp-packing-scale-calibration/gmp-packing-scale-calibration.module'
import { GMPPackingScissorsKnivesInventoryModule } from './inventories/gmp-packing-scissors-knives/gmp-packing-scissors-knives.module'
import { GMPPackingThermoCalibrationInventoryModule } from './inventories/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration.module'
import { GMPPackingPreopInventoryModule } from './inventories/gmp-packing-preop/gmp-packing-preop.module'
import { GAPPackingPreopInventoryModule } from './inventories/gap-packing-preop/gap-packing-preop.module'
import { GMPPackingGlassBrittleInventoryModule } from './inventories/gmp-packing-glass-brittle/gmp-packing-glass-brittle.module'
import { GMPPackingOzoneWaterInventoryModule } from './inventories/gmp-packing-ozone-water/gmp-packing-ozone-water.module'
import { GMPSelfInspectionPestControlInventoryModule } from './inventories/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control.module'
import { GAPPackingPreopAuthorizationModule } from './logs/gap-packing-preop/gap-packing-preop-authorization.module'
import { GAPOthersUnusualOccurrenceAuthorizationModule } from './logs/gap-others-unusual-occurrence/gap-others-unusual-occurrence-authorization.module'
import { GMPDocControlDocControlAuthorizationModule } from './logs/gmp-doc-control-doc-control/gmp-doc-control-doc-control-authorization.module'
import { GMPOthersUnusualOccurrenceAuthorizationModule } from './logs/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-authorization.module'
import { GMPPackingAgedProductAuthorizationModule } from './logs/gmp-packing-aged-product/gmp-packing-aged-product-authorization.module'
import { GMPPackingATPTestingAuthorizationModule } from './logs/gmp-packing-atp-testing/gmp-packing-atp-testing-authorization.module'
import { GMPPackingColdRoomTempAuthorizationModule } from './logs/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-authorization.module'
import { GMPPackingFinishedProductAuthorizationModule } from './logs/gmp-packing-finished-product/gmp-packing-finished-product-authorization.module'
import { GMPPackingGlassBrittleAuthorizationModule } from './logs/gmp-packing-glass-brittle/gmp-packing-glass-brittle-authorization.module'
import { GMPPackingHandWashingAuthorizationModule } from './logs/gmp-packing-hand-washing/gmp-packing-hand-washing-authorization.module'
import { GMPPackingOzoneWaterAuthorizationModule } from './logs/gmp-packing-ozone-water/gmp-packing-ozone-water-authorization.module'
import { GMPPackingPreopAuthorizationModule } from './logs/gmp-packing-preop/gmp-packing-preop-authorization.module'
import { GMPPackingScaleCalibrationAuthorizationModule } from './logs/gmp-packing-scale-calibration/gmp-packing-scale-calibration-authorization.module'
import { GMPPackingScissorsKnivesAuthorizationModule } from './logs/gmp-packing-scissors-knives/gmp-packing-scissors-knives-authorization.module'
import { GMPPackingThermoCalibrationAuthorizationModule } from './logs/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-authorization.module'
import { GMPSelfInspectionPestControlAuthorizationModule } from './logs/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-authorization.module'
import { GAPOthersUnusualOccurrenceCaptureModule } from './capture/gap-others-unusual-occurrence/gap-others-unusual-occurrence-capture.module'
import { GAPPackingPreopCaptureModule } from './capture/gap-packing-preop/gap-packing-preop-capture.module'
import { GMPDocControlDocControlCaptureModule } from './capture/gmp-doc-control-doc-control/gmp-doc-control-doc-control-capture.module'
import { GMPOthersUnusualOccurrenceCaptureModule } from './capture/gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-capture.module'
import { GMPPackingAgedProductCaptureModule } from './capture/gmp-packing-aged-product/gmp-packing-aged-product-capture.module'
import { GMPPackingATPTestingCaptureModule } from './capture/gmp-packing-atp-testing/gmp-packing-atp-testing-capture.module'
import { GMPPackingColdRoomTempCaptureModule } from './capture/gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-capture.module'
import { GMPPackingFinishedProductCaptureModule } from './capture/gmp-packing-finished-product/gmp-packing-finished-product-capture.module'
import { GMPPackingGlassBrittleCaptureModule } from './capture/gmp-packing-glass-brittle/gmp-packing-glass-brittle-capture.module'
import { GMPPackingHandWashingCaptureModule } from './capture/gmp-packing-hand-washing/gmp-packing-hand-washing-capture.module'
import { GMPPackingOzoneWaterCaptureModule } from './capture/gmp-packing-ozone-water/gmp-packing-ozone-water-capture.module'
import { GMPPackingPreopCaptureModule } from './capture/gmp-packing-preop/gmp-packing-preop-capture.module'
import { GMPPackingScaleCalibrationCaptureModule } from './capture/gmp-packing-scale-calibration/gmp-packing-scale-calibration-capture.module'
import { GMPPackingScissorsKnivesCaptureModule } from './capture/gmp-packing-scissors-knives/gmp-packing-scissors-knives-capture.module'
import { GMPPackingThermoCalibrationCaptureModule } from './capture/gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-capture.module'
import { GMPSelfInspectionPestControlCaptureModule } from './capture/gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-capture.module'

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
    DocumentModule,
    MenuModule,
    ProductDataModule,
    GAPOthersUnusualOccurrenceCaptureModule,
    GAPPackingPreopCaptureModule,
    GMPDocControlDocControlCaptureModule,
    GMPOthersUnusualOccurrenceCaptureModule,
    GMPPackingAgedProductCaptureModule,
    GMPPackingATPTestingCaptureModule,
    GMPPackingColdRoomTempCaptureModule,
    GMPPackingFinishedProductCaptureModule,
    GMPPackingGlassBrittleCaptureModule,
    GMPPackingHandWashingCaptureModule,
    GMPPackingOzoneWaterCaptureModule,
    GMPPackingPreopCaptureModule,
    GMPPackingScaleCalibrationCaptureModule,
    GMPPackingScissorsKnivesCaptureModule,
    GMPPackingThermoCalibrationCaptureModule,
    GMPSelfInspectionPestControlCaptureModule,
    GAPOthersUnusualOccurrenceAuthorizationModule,
    GAPPackingPreopAuthorizationModule,
    GMPDocControlDocControlAuthorizationModule,
    GMPOthersUnusualOccurrenceAuthorizationModule,
    GMPPackingAgedProductAuthorizationModule,
    GMPPackingATPTestingAuthorizationModule,
    GMPPackingColdRoomTempAuthorizationModule,
    GMPPackingFinishedProductAuthorizationModule,
    GMPPackingGlassBrittleAuthorizationModule,
    GMPPackingHandWashingAuthorizationModule,
    GMPPackingOzoneWaterAuthorizationModule,
    GMPPackingPreopAuthorizationModule,
    GMPPackingScaleCalibrationAuthorizationModule,
    GMPPackingScissorsKnivesAuthorizationModule,
    GMPPackingThermoCalibrationAuthorizationModule,
    GMPSelfInspectionPestControlAuthorizationModule,
    GMPPackingHandWashingInventoryModule,
    GMPPackingColdRoomTempInventoryModule,
    GMPDocControlDocControlInventoryModule,
    GMPPackingScaleCalibrationInventoryModule,
    GMPPackingScissorsKnivesInventoryModule,
    GMPPackingThermoCalibrationInventoryModule,
    GMPPackingPreopInventoryModule,
    GAPPackingPreopInventoryModule,
    GMPPackingGlassBrittleInventoryModule,
    GMPPackingOzoneWaterInventoryModule,
    GMPSelfInspectionPestControlInventoryModule,
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
      otherwise: '/menu/'
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
    AreaManagerService,
    AlertController,
    LogService,
    MenuService,
    ToastsService,
    TranslationService,
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
    public translation: TService,
    public l10nLoader: L10nLoader
  ) {
    this.l10nLoader.load()
    /*this.locale.addConfiguration()
      .addLanguages(['en', 'es'])
      .setCookieExpiration(30)
      .defineLanguage('es')

    this.translation.addConfiguration()
      .addProvider('./assets/locale-')

    this.translation.translationChanged.subscribe(
      () => {
        window.setTimeout(() => {
          $('select').material_select()
        }, 100)
      }
    )

    this.translation.init()*/
  }
}
