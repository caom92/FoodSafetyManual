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

import { GMPPackingPreopItemComponent } from '../components/logs/gmp-packing-preop/item/gmp.packing.preop.item'
import { GMPPackingPreopTypeComponent } from '../components/logs/gmp-packing-preop/type/gmp.packing.preop.type'
import { GMPPackingPreopAreaComponent } from '../components/logs/gmp-packing-preop/area/gmp.packing.preop.area'
import { GMPPackingPreopLogComponent } from '../components/logs/gmp-packing-preop/log/gmp.packing.preop.log'

import { GMPPackingPreopAuthorizationComponent } from '../components/logs/gmp-packing-preop/authorization/gmp.packing.preop.authorization'

import { GMPPackingPreopInventoryManagerComponent } from '../components/inventories/gmp-packing-preop/manager/gmp.packing.preop.inventory.manager'
import { GMPPackingPreopInventoryComponent } from '../components/inventories/gmp-packing-preop/inventory/gmp.packing.preop.inventory'
import { GMPPackingPreopInventoryItemComponent } from '../components/inventories/gmp-packing-preop/item/gmp.packing.preop.inventory.item'
import { GMPPackingPreopInventoryListComponent } from '../components/inventories/gmp-packing-preop/list/gmp.packing.preop.inventory.list'
import { GMPPackingPreopAreaInventoryComponent } from '../components/inventories/gmp-packing-preop/area-inventory/gmp.packing.preop.area.inventory'
import { GMPPackingPreopAreaInventoryListComponent } from '../components/inventories/gmp-packing-preop/area-list/gmp.packing.preop.area.inventory.list'
import { GMPPackingPreopAreaInventoryAreaComponent } from '../components/inventories/gmp-packing-preop/area/gmp.packing.preop.area.inventory.area'
import { GMPPackingPreopAddAreaComponent } from '../components/inventories/gmp-packing-preop/add-area/gmp.packing.preop.add.area'
//import { GMPPackingPreopEditAreaComponent } from '../components/inventories/gmp-packing-preop/edit-area/gmp.packing.preop.edit.area'
import { GMPPackingPreopAddItemComponent } from '../components/inventories/gmp-packing-preop/add-item/gmp.packing.preop.add.item'

import { GMPPackingPreopReportComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.component'
import { GMPPackingPreopReportAreaComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.area.component'
import { GMPPackingPreopReportTypeComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.type.component'
import { GMPPackingPreopReportItemComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.item.component'

// GAP Packing Preop

import { GAPPackingPreopInventoryManagerComponent } from '../components/inventories/gap-packing-preop/manager/gap.packing.preop.inventory.manager'
import { GAPPackingPreopInventoryComponent } from '../components/inventories/gap-packing-preop/inventory/gap.packing.preop.inventory'
import { GAPPackingPreopInventoryItemComponent } from '../components/inventories/gap-packing-preop/item/gap.packing.preop.inventory.item'
import { GAPPackingPreopInventoryListComponent } from '../components/inventories/gap-packing-preop/list/gap.packing.preop.inventory.list'
import { GAPPackingPreopAreaInventoryComponent } from '../components/inventories/gap-packing-preop/area-inventory/gap.packing.preop.area.inventory'
import { GAPPackingPreopAreaInventoryListComponent } from '../components/inventories/gap-packing-preop/area-list/gap.packing.preop.area.inventory.list'
import { GAPPackingPreopAreaInventoryAreaComponent } from '../components/inventories/gap-packing-preop/area/gap.packing.preop.area.inventory.area'
import { GAPPackingPreopAddAreaComponent } from '../components/inventories/gap-packing-preop/add-area/gap.packing.preop.add.area'
import { GAPPackingPreopAddItemComponent } from '../components/inventories/gap-packing-preop/add-item/gap.packing.preop.add.item'

// GMP Packing Scale Calibration

// Inventario

import { GMPPackingScaleCalibrationInventoryComponent } from '../components/inventories/gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScaleCalibrationInventoryItemComponent } from '../components/inventories/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.inventory.item'
import { GMPPackingScaleCalibrationInventoryListComponent } from '../components/inventories/gmp-packing-scale-calibration/list/gmp.packing.scale.calibration.inventory.list'
import { GMPPackingScaleCalibrationAddItemComponent } from '../components/inventories/gmp-packing-scale-calibration/add-item/gmp.packing.scale.calibration.add.item'

// GMP Packing Hand Washing

import { GMPPackingHandWashingLogComponent } from '../components/logs/gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingHandWashingItemComponent } from '../components/logs/gmp-packing-hand-washing/item/gmp.packing.hand.washing.item'

import { GMPPackingHandWashingAuthorizationComponent } from '../components/logs/gmp-packing-hand-washing/authorization/gmp.packing.hand.washing.authorization'

import { GMPPackingHandWashingInventoryComponent } from '../components/inventories/gmp-packing-hand-washing/inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingHandWashingInventoryItemComponent } from '../components/inventories/gmp-packing-hand-washing/item/gmp.packing.hand.washing.inventory.item'
import { GMPPackingHandWashingInventoryListComponent } from '../components/inventories/gmp-packing-hand-washing/list/gmp.packing.hand.washing.inventory.list'
import { GMPPackingHandWashingAddItemComponent } from '../components/inventories/gmp-packing-hand-washing/add-item/gmp.packing.hand.washing.add.item'

// GMP Packing Thermo Calibration

import { GMPPackingThermoCalibrationLogComponent } from '../components/logs/gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPPackingThermoCalibrationItemComponent } from '../components/logs/gmp-packing-thermo-calibration/item/gmp.packing.thermo.calibration.item'

import { GMPPackingThermoCalibrationAuthorizationComponent } from '../components/logs/gmp-packing-thermo-calibration/authorization/gmp.packing.thermo.calibration.authorization'

import { GMPPackingThermoCalibrationInventoryComponent } from '../components/inventories/gmp-packing-thermo-calibration/inventory/gmp.packing.thermo.calibration.inventory'
import { GMPPackingThermoCalibrationInventoryItemComponent } from '../components/inventories/gmp-packing-thermo-calibration/item/gmp.packing.thermo.calibration.inventory.item'
import { GMPPackingThermoCalibrationInventoryListComponent } from '../components/inventories/gmp-packing-thermo-calibration/list/gmp.packing.thermo.calibration.inventory.list'
import { GMPPackingThermoCalibrationAddItemComponent } from '../components/inventories/gmp-packing-thermo-calibration/add-item/gmp.packing.thermo.calibration.add.item'

// GMP Packing Scale Calibration

import { GMPPackingScaleCalibrationLogComponent } from '../components/logs/gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GMPPackingScaleCalibrationTypeComponent } from '../components/logs/gmp-packing-scale-calibration/type/gmp.packing.scale.calibration.type'
import { GMPPackingScaleCalibrationItemComponent } from '../components/logs/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.item'

import { GMPPackingScaleCalibrationAuthorizationComponent } from '../components/logs/gmp-packing-scale-calibration/authorization/gmp.packing.scale.calibration.authorization'

// GMP Packing Scissors Knives

import { GMPPackingScissorsKnivesLogComponent } from '../components/logs/gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { GMPPackingScissorsKnivesItemComponent } from '../components/logs/gmp-packing-scissors-knives/item/gmp.packing.scissors.knives.item'

import { GMPPackingScissorsKnivesAuthorizationComponent } from '../components/logs/gmp-packing-scissors-knives/authorization/gmp.packing.scissors.knives.authorization'

import { GMPPackingScissorsKnivesInventoryComponent } from '../components/inventories/gmp-packing-scissors-knives/inventory/gmp.packing.scissors.knives.inventory'
import { GMPPackingScissorsKnivesInventoryItemComponent } from '../components/inventories/gmp-packing-scissors-knives/item/gmp.packing.scissors.knives.inventory.item'
import { GMPPackingScissorsKnivesInventoryListComponent } from '../components/inventories/gmp-packing-scissors-knives/list/gmp.packing.scissors.knives.inventory.list'
import { GMPPackingScissorsKnivesAddItemComponent } from '../components/inventories/gmp-packing-scissors-knives/add-item/gmp.packing.scissors.knives.add.item'

// GMP Packing Glass Brittle

import { GMPPackingGlassBrittleLogComponent } from '../components/logs/gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingGlassBrittleAreaComponent } from '../components/logs/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleItemComponent } from '../components/logs/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.item'

import { GMPPackingGlassBrittleAuthorizationComponent } from '../components/logs/gmp-packing-glass-brittle/authorization/gmp.packing.glass.brittle.authorization'

import { GMPPackingGlassBrittleInventoryManagerComponent } from '../components/inventories/gmp-packing-glass-brittle/manager/gmp.packing.glass.brittle.inventory.manager'
import { GMPPackingGlassBrittleInventoryComponent } from '../components/inventories/gmp-packing-glass-brittle/inventory/gmp.packing.glass.brittle.inventory'
import { GMPPackingGlassBrittleInventoryItemComponent } from '../components/inventories/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.inventory.item'
import { GMPPackingGlassBrittleInventoryListComponent } from '../components/inventories/gmp-packing-glass-brittle/list/gmp.packing.glass.brittle.inventory.list'
import { GMPPackingGlassBrittleAreaInventoryComponent } from '../components/inventories/gmp-packing-glass-brittle/area-inventory/gmp.packing.glass.brittle.area.inventory'
import { GMPPackingGlassBrittleAreaInventoryAreaComponent } from '../components/inventories/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area.inventory.area'
import { GMPPackingGlassBrittleAreaInventoryListComponent } from '../components/inventories/gmp-packing-glass-brittle/area-list/gmp.packing.glass.brittle.area.inventory.list'
import { GMPPackingGlassBrittleAddAreaComponent } from '../components/inventories/gmp-packing-glass-brittle/add-area/gmp.packing.glass.brittle.add.area'
import { GMPPackingGlassBrittleAddItemComponent } from '../components/inventories/gmp-packing-glass-brittle/add-item/gmp.packing.glass.brittle.add.item'

// GMP Packing Cold Room Temp

import { GMPPackingColdRoomTempLogComponent } from '../components/logs/gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'
import { GMPPackingColdRoomTempItemComponent } from '../components/logs/gmp-packing-cold-room-temp/item/gmp.packing.cold.room.temp.item'

import { GMPPackingColdRoomTempAuthorizationComponent } from '../components/logs/gmp-packing-cold-room-temp/authorization/gmp.packing.cold.room.temp.authorization'

import { GMPPackingColdRoomTempInventoryComponent } from '../components/inventories/gmp-packing-cold-room-temp/inventory/gmp.packing.cold.room.temp.inventory'
import { GMPPackingColdRoomTempInventoryItemComponent } from '../components/inventories/gmp-packing-cold-room-temp/item/gmp.packing.cold.room.temp.inventory.item'
import { GMPPackingColdRoomTempInventoryListComponent } from '../components/inventories/gmp-packing-cold-room-temp/list/gmp.packing.cold.room.temp.inventory.list'
import { GMPPackingColdRoomTempAddItemComponent } from '../components/inventories/gmp-packing-cold-room-temp/add-item/gmp.packing.cold.room.temp.add.item'

// GMP Packing Self Inspection Pest Control

import { GMPSelfInspectionPestControlLogComponent } from '../components/logs/gmp-self-inspection-pest-control/log/gmp.self.inspection.pest.control.log'
import { GMPSelfInspectionPestControlAreaComponent } from '../components/logs/gmp-self-inspection-pest-control/area/gmp.self.inspection.pest.control.area'
import { GMPSelfInspectionPestControlItemComponent } from '../components/logs/gmp-self-inspection-pest-control/item/gmp.self.inspection.pest.control.item'

//import { GMPSelfInspectionPestControlAuthorizationComponent } from '../components/logs/gmp-self-inspection-pest-control/authorization/gmp.self.inspection.pest.control.authorization'

// Genericos

import { ReportLoaderCard } from './report.loader.card.component'
//import { LogHeaderComponent } from './app.log.header'

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
import { DragulaModule } from 'ng2-dragula/components/dragular.module';
import { TabLogLoaderComponent } from './logs/log.loader';
import { LogTabsPage } from '../components/logs/log-tabs/log.tabs.page'
import { LogHeaderComponent } from '../components/logs/log-header/log.header'
import { LogService } from '../services/app.logs'
import { ToastsService } from '../services/app.toasts'
import { TranslationService } from '../services/app.translation'
import { AuthorizationLoader } from './authorizations/authorization-loader/authorization.loader.component'
import { InventoryLoaderComponent } from './inventories/inventories'
import { AreaManagerService } from '../services/app.area.manager';
import { GAPOthersUnusualOccurrenceLogComponent } from './logs/gap-others-unusual-occurrence/log/gap.others.unusual.occurrence.log';
import { GMPOthersUnusualOccurrenceLogComponent } from './logs/gmp-others-unusual-occurrence/log/gmp.others.unusual.occurrence.log';
import { GMPPackingAgedProductLogComponent } from './logs/gmp-packing-aged-product/log/gmp.packing.aged.product.log';
import { GMPDocControlDocControlLogComponent } from './logs/gmp-doc-control-doc-control/log/gmp.doc.control.doc.control.log';

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
          url: '/log-view/:suffix',
          component: LogLoaderComponent
        },
        {
          name: 'log',
          url: '/log/:suffix',
          component: LogTabsPage
        },
        {
          name: 'authorizations',
          url: '/authorizations/:suffix/:report_id',
          component: AuthorizationLoader
        },
        {
          name: 'inventory-selection',
          url: '/inventory-selection/:program/:module',
          component: InventoryListComponent
        },
        {
          name: 'inventory',
          url: '/inventory/:suffix/:name',
          component: InventoryLoaderComponent
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
    AreaManagerService,
    AlertController,
    LogService,
    ToastsService,
    TranslationService
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
    GMPPackingPreopAuthorizationComponent,
    GMPPackingPreopInventoryManagerComponent,
    GMPPackingPreopInventoryComponent,
    GMPPackingPreopInventoryItemComponent,
    GMPPackingPreopInventoryListComponent,
    GMPPackingPreopAreaInventoryComponent,
    GMPPackingPreopAreaInventoryAreaComponent,
    GMPPackingPreopAreaInventoryListComponent,
    GMPPackingPreopAddItemComponent,
    GMPPackingPreopAddAreaComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    GAPPackingPreopInventoryManagerComponent,
    GAPPackingPreopInventoryComponent,
    GAPPackingPreopInventoryItemComponent,
    GAPPackingPreopInventoryListComponent,
    GAPPackingPreopAreaInventoryComponent,
    GAPPackingPreopAreaInventoryListComponent,
    GAPPackingPreopAreaInventoryAreaComponent,
    GAPPackingPreopAddAreaComponent,
    GAPPackingPreopAddItemComponent,
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingScaleCalibrationInventoryItemComponent,
    GMPPackingScaleCalibrationInventoryListComponent,
    GMPPackingScaleCalibrationAddItemComponent,
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent,
    GMPPackingHandWashingAuthorizationComponent,
    GMPPackingHandWashingInventoryComponent,
    GMPPackingHandWashingInventoryItemComponent,
    GMPPackingHandWashingInventoryListComponent,
    GMPPackingHandWashingAddItemComponent,
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingThermoCalibrationItemComponent,
    GMPPackingThermoCalibrationAuthorizationComponent,
    GMPPackingThermoCalibrationInventoryComponent,
    GMPPackingThermoCalibrationInventoryItemComponent,
    GMPPackingThermoCalibrationInventoryListComponent,
    GMPPackingThermoCalibrationAddItemComponent,
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScaleCalibrationTypeComponent,
    GMPPackingScaleCalibrationItemComponent,
    GMPPackingScaleCalibrationAuthorizationComponent,
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent,
    GMPPackingScissorsKnivesAuthorizationComponent,
    GMPPackingScissorsKnivesInventoryComponent,
    GMPPackingScissorsKnivesInventoryItemComponent,
    GMPPackingScissorsKnivesInventoryListComponent,
    GMPPackingScissorsKnivesAddItemComponent,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent,
    GMPPackingGlassBrittleAuthorizationComponent,
    GMPPackingGlassBrittleInventoryManagerComponent,
    GMPPackingGlassBrittleInventoryComponent,
    GMPPackingGlassBrittleInventoryItemComponent,
    GMPPackingGlassBrittleInventoryListComponent,
    GMPPackingGlassBrittleAreaInventoryComponent,
    GMPPackingGlassBrittleAreaInventoryAreaComponent,
    GMPPackingGlassBrittleAreaInventoryListComponent,
    GMPPackingGlassBrittleAddAreaComponent,
    GMPPackingGlassBrittleAddItemComponent,
    GMPPackingColdRoomTempLogComponent,
    GMPPackingColdRoomTempItemComponent,
    GMPPackingColdRoomTempAuthorizationComponent,
    GMPPackingColdRoomTempInventoryComponent,
    GMPPackingColdRoomTempInventoryItemComponent,
    GMPPackingColdRoomTempInventoryListComponent,
    GMPPackingColdRoomTempAddItemComponent,
    GMPSelfInspectionPestControlLogComponent,
    GMPSelfInspectionPestControlAreaComponent,
    GMPSelfInspectionPestControlItemComponent,
    GAPOthersUnusualOccurrenceLogComponent,
    GMPOthersUnusualOccurrenceLogComponent,
    GMPPackingAgedProductLogComponent,
    GMPDocControlDocControlLogComponent,
    LogTabsPage,
    AuthorizationLoader,
    LogHeaderComponent,
    InventoryLoaderComponent,
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
    UserInfoModalComponent,
    EditUserInfoModalComponent,
    GMPPackingPreopLogComponent,
    GMPPackingHandWashingLogComponent,
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingColdRoomTempLogComponent,
    GMPSelfInspectionPestControlLogComponent,
    GAPOthersUnusualOccurrenceLogComponent,
    GMPOthersUnusualOccurrenceLogComponent,
    GMPPackingAgedProductLogComponent,
    GMPDocControlDocControlLogComponent,
    GMPPackingPreopAuthorizationComponent,
    GMPPackingHandWashingAuthorizationComponent,
    GMPPackingThermoCalibrationAuthorizationComponent,
    GMPPackingScaleCalibrationAuthorizationComponent,
    GMPPackingScissorsKnivesAuthorizationComponent,
    GMPPackingGlassBrittleAuthorizationComponent,
    GMPPackingColdRoomTempAuthorizationComponent,
    GMPPackingPreopInventoryManagerComponent,
    GMPPackingGlassBrittleInventoryManagerComponent,
    GAPPackingPreopInventoryManagerComponent,
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingHandWashingInventoryComponent,
    GMPPackingThermoCalibrationInventoryComponent,
    GMPPackingScissorsKnivesInventoryComponent,
    GMPPackingColdRoomTempInventoryComponent,
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
