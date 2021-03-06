import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage'
import { DragulaModule } from 'ng2-dragula'
import { LocalNotifications } from '@ionic-native/local-notifications'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { EditProfile } from '../pages/edit-profile/edit-profile'
import { ModulesPage } from '../pages/modules/modules'
import { LogsPage } from '../pages/logs/logs'
import { LogHeaderComponent } from '../pages/logs/log-header/log.header'

// GMP Packing Preop

import { LogTabsPage } from '../pages/logs/log-tabs/log.tabs.page'
import { GMPPackingPreopLogComponent } from '../pages/logs/gmp-packing-preop/log/gmp.packing.preop.log'
import { GMPPackingPreopAreaComponent } from '../pages/logs/gmp-packing-preop/area/gmp.packing.preop.area'
import { GMPPackingPreopTypeComponent } from '../pages/logs/gmp-packing-preop/type/gmp.packing.preop.type'
import { GMPPackingPreopItemComponent } from '../pages/logs/gmp-packing-preop/item/gmp.packing.preop.item'

import { GMPPackingPreopAuthorizationComponent } from '../pages/logs/gmp-packing-preop/authorization/gmp.packing.preop.authorization'

import { GMPPackingPreopReportComponent } from '../pages/reports/gmp-packing-preop/report/gmp.packing.preop.report'
import { GMPPackingPreopReportAreaComponent } from '../pages/reports/gmp-packing-preop/area/gmp.packing.preop.area'
import { GMPPackingPreopReportTypeComponent } from '../pages/reports/gmp-packing-preop/type/gmp.packing.preop.type'
import { GMPPackingPreopReportItemComponent } from '../pages/reports/gmp-packing-preop/item/gmp.packing.preop.item'
//import { GMPPackingPreopReportLoader } from '../pages/reports/gmp-packing-preop/loader/gmp.packing.preop.report.loader'
//import { GMPPackingPreopReportDisplayer } from '../pages/reports/gmp-packing-preop/displayer/gmp.packing.preop.report.displayer'

import { GMPPackingPreopInventoryManagerComponent } from '../pages/inventories/gmp-packing-preop/manager/gmp.packing.preop.inventory.manager'
import { GMPPackingPreopInventoryComponent } from '../pages/inventories/gmp-packing-preop/inventory/gmp.packing.preop.inventory'
import { GMPPackingPreopInventoryItemComponent } from '../pages/inventories/gmp-packing-preop/item/gmp.packing.preop.inventory.item'
import { GMPPackingPreopInventoryListComponent } from '../pages/inventories/gmp-packing-preop/list/gmp.packing.preop.inventory.list'
import { GMPPackingPreopAreaInventoryComponent } from '../pages/inventories/gmp-packing-preop/area-inventory/gmp.packing.preop.area.inventory'
import { GMPPackingPreopAreaInventoryListComponent } from '../pages/inventories/gmp-packing-preop/area-list/gmp.packing.preop.area.inventory.list'
import { GMPPackingPreopAreaInventoryAreaComponent } from '../pages/inventories/gmp-packing-preop/area/gmp.packing.preop.area.inventory.area'
import { GMPPackingPreopAddAreaComponent } from '../pages/inventories/gmp-packing-preop/add-area/gmp.packing.preop.add.area'
import { GMPPackingPreopEditAreaComponent } from '../pages/inventories/gmp-packing-preop/edit-area/gmp.packing.preop.edit.area'
import { GMPPackingPreopAddItemComponent } from '../pages/inventories/gmp-packing-preop/add-item/gmp.packing.preop.add.item'

// GAP Packing Preop

import { GAPPackingPreopLogComponent } from '../pages/logs/gap-packing-preop/log/gap.packing.preop.log'
import { GAPPackingPreopAreaComponent } from '../pages/logs/gap-packing-preop/area/gap.packing.preop.area'
import { GAPPackingPreopTypeComponent } from '../pages/logs/gap-packing-preop/type/gap.packing.preop.type'
import { GAPPackingPreopItemComponent } from '../pages/logs/gap-packing-preop/item/gap.packing.preop.item'

import { GAPPackingPreopReportComponent } from '../pages/reports/gap-packing-preop/report/gap.packing.preop.report'
import { GAPPackingPreopReportAreaComponent } from '../pages/reports/gap-packing-preop/area/gap.packing.preop.report.area'
import { GAPPackingPreopReportTypeComponent } from '../pages/reports/gap-packing-preop/type/gap.packing.preop.report.type'
import { GAPPackingPreopReportItemComponent } from '../pages/reports/gap-packing-preop/item/gap.packing.preop.report.item'
//import { GAPPackingPreopReportLoader } from '../pages/reports/gap-packing-preop/loader/gap.packing.preop.report.loader'
//import { GAPPackingPreopReportDisplayer } from '../pages/reports/gap-packing-preop/displayer/gap.packing.preop.report.displayer'

import { GAPPackingPreopInventoryManagerComponent } from '../pages/inventories/gap-packing-preop/manager/gap.packing.preop.inventory.manager'
import { GAPPackingPreopInventoryComponent } from '../pages/inventories/gap-packing-preop/inventory/gap.packing.preop.inventory'
import { GAPPackingPreopInventoryItemComponent } from '../pages/inventories/gap-packing-preop/item/gap.packing.preop.inventory.item'
import { GAPPackingPreopInventoryListComponent } from '../pages/inventories/gap-packing-preop/list/gap.packing.preop.inventory.list'
import { GAPPackingPreopAreaInventoryComponent } from '../pages/inventories/gap-packing-preop/area-inventory/gap.packing.preop.area.inventory'
import { GAPPackingPreopAreaInventoryListComponent } from '../pages/inventories/gap-packing-preop/area-list/gap.packing.preop.area.inventory.list'
import { GAPPackingPreopAreaInventoryAreaComponent } from '../pages/inventories/gap-packing-preop/area/gap.packing.preop.area.inventory.area'
import { GAPPackingPreopAddAreaComponent } from '../pages/inventories/gap-packing-preop/add-area/gap.packing.preop.add.area'
import { GAPPackingPreopEditAreaComponent } from '../pages/inventories/gap-packing-preop/edit-area/gap.packing.preop.edit.area'
import { GAPPackingPreopAddItemComponent } from '../pages/inventories/gap-packing-preop/add-item/gap.packing.preop.add.item'

// GMP Packing Hand Washing

import { GMPPackingHandWashingLogComponent } from '../pages/logs/gmp-packing-hand-washing/log/gmp.packing.hand.washing.log'
import { GMPPackingHandWashingItemComponent } from '../pages/logs/gmp-packing-hand-washing/item/gmp.packing.hand.washing.item'

import { GMPPackingHandWashingAuthorizationComponent } from '../pages/logs/gmp-packing-hand-washing/authorization/gmp.packing.hand.washing.authorization'

import { GMPPackingHandWashingReportComponent } from '../pages/reports/gmp-packing-hand-washing/report/gmp.packing.hand.washing.report'
import { GMPPackingHandWashingReportItemComponent } from '../pages/reports/gmp-packing-hand-washing/item/gmp.packing.hand.washing.item'
//import { GMPPackingHandWashingReportLoader } from '../pages/reports/gmp-packing-hand-washing/loader/gmp.packing.hand.washing.report.loader'
//import { GMPPackingHandWashingReportDisplayer } from '../pages/reports/gmp-packing-hand-washing/displayer/gmp.packing.hand.washing.report.displayer'

import { GMPPackingHandWashingInventoryComponent } from '../pages/inventories/gmp-packing-hand-washing/inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingHandWashingInventoryItemComponent } from '../pages/inventories/gmp-packing-hand-washing/item/gmp.packing.hand.washing.inventory.item'
import { GMPPackingHandWashingInventoryListComponent } from '../pages/inventories/gmp-packing-hand-washing/list/gmp.packing.hand.washing.inventory.list'
import { GMPPackingHandWashingAddItemComponent } from '../pages/inventories/gmp-packing-hand-washing/add-item/gmp.packing.hand.washing.add.item'

// GMP Packing Glass Brittle

import { GMPPackingGlassBrittleLogComponent } from '../pages/logs/gmp-packing-glass-brittle/log/gmp.packing.glass.brittle.log'
import { GMPPackingGlassBrittleAreaComponent } from '../pages/logs/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleItemComponent } from '../pages/logs/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.item'

import { GMPPackingGlassBrittleAuthorizationComponent } from '../pages/logs/gmp-packing-glass-brittle/authorization/gmp.packing.glass.brittle.authorization'

import { GMPPackingGlassBrittleReportComponent } from '../pages/reports/gmp-packing-glass-brittle/report/gmp.packing.glass.brittle.report'
import { GMPPackingGlassBrittleReportAreaComponent } from '../pages/reports/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area'
import { GMPPackingGlassBrittleReportItemComponent } from '../pages/reports/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.item'
//import { GMPPackingGlassBrittleReportLoader } from '../pages/reports/gmp-packing-glass-brittle/loader/gmp.packing.glass.brittle.report.loader'
//import { GMPPackingGlassBrittleReportDisplayer } from '../pages/reports/gmp-packing-glass-brittle/displayer/gmp.packing.glass.brittle.report.displayer'

import { GMPPackingGlassBrittleInventoryManagerComponent } from '../pages/inventories/gmp-packing-glass-brittle/manager/gmp.packing.glass.brittle.inventory.manager'
import { GMPPackingGlassBrittleInventoryComponent } from '../pages/inventories/gmp-packing-glass-brittle/inventory/gmp.packing.glass.brittle.inventory'
import { GMPPackingGlassBrittleInventoryItemComponent } from '../pages/inventories/gmp-packing-glass-brittle/item/gmp.packing.glass.brittle.inventory.item'
import { GMPPackingGlassBrittleInventoryListComponent } from '../pages/inventories/gmp-packing-glass-brittle/list/gmp.packing.glass.brittle.inventory.list'
import { GMPPackingGlassBrittleAreaInventoryComponent } from '../pages/inventories/gmp-packing-glass-brittle/area-inventory/gmp.packing.glass.brittle.area.inventory'
import { GMPPackingGlassBrittleAreaInventoryAreaComponent } from '../pages/inventories/gmp-packing-glass-brittle/area/gmp.packing.glass.brittle.area.inventory.area'
import { GMPPackingGlassBrittleAreaInventoryListComponent } from '../pages/inventories/gmp-packing-glass-brittle/area-list/gmp.packing.glass.brittle.area.inventory.list'
import { GMPPackingGlassBrittleAddAreaComponent } from '../pages/inventories/gmp-packing-glass-brittle/add-area/gmp.packing.glass.brittle.add.area'
import { GMPPackingGlassBrittleEditAreaComponent } from '../pages/inventories/gmp-packing-glass-brittle/edit-area/gmp.packing.glass.brittle.edit.area'
import { GMPPackingGlassBrittleAddItemComponent } from '../pages/inventories/gmp-packing-glass-brittle/add-item/gmp.packing.glass.brittle.add.item'

// GMP Packing Scale Calibtration

import { GMPPackingScaleCalibrationLogComponent } from '../pages/logs/gmp-packing-scale-calibration/log/gmp.packing.scale.calibration.log'
import { GMPPackingScaleCalibrationTypeComponent } from '../pages/logs/gmp-packing-scale-calibration/type/gmp.packing.scale.calibration.type'
import { GMPPackingScaleCalibrationItemComponent } from '../pages/logs/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.item'

import { GMPPackingScaleCalibrationAuthorizationComponent } from '../pages/logs/gmp-packing-scale-calibration/authorization/gmp.packing.scale.calibration.authorization'

import { GMPPackingScaleCalibrationReportComponent } from '../pages/reports/gmp-packing-scale-calibration/report/gmp.packing.scale.calibration.report'
import { GMPPackingScaleCalibrationReportTypeComponent } from '../pages/reports/gmp-packing-scale-calibration/type/gmp.packing.scale.calibration.report.type'
import { GMPPackingScaleCalibrationReportItemComponent } from '../pages/reports/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.report.item'
//import { GMPPackingScaleCalibrationReportLoader } from '../pages/reports/gmp-packing-scale-calibration/loader/gmp.packing.scale.calibration.report.loader'
//import { GMPPackingScaleCalibrationReportDisplayer } from '../pages/reports/gmp-packing-scale-calibration/displayer/gmp.packing.scale.calibration.report.displayer'

import { GMPPackingScaleCalibrationInventoryComponent } from '../pages/inventories/gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'
import { GMPPackingScaleCalibrationInventoryItemComponent } from '../pages/inventories/gmp-packing-scale-calibration/item/gmp.packing.scale.calibration.inventory.item'
import { GMPPackingScaleCalibrationInventoryListComponent } from '../pages/inventories/gmp-packing-scale-calibration/list/gmp.packing.scale.calibration.inventory.list'
import { GMPPackingScaleCalibrationAddItemComponent } from '../pages/inventories/gmp-packing-scale-calibration/add-item/gmp.packing.scale.calibration.add.item'

// GMP Packing Scissors Knives

import { GMPPackingScissorsKnivesLogComponent } from '../pages/logs/gmp-packing-scissors-knives/log/gmp.packing.scissors.knives.log'
import { GMPPackingScissorsKnivesItemComponent } from '../pages/logs/gmp-packing-scissors-knives/item/gmp.packing.scissors.knives.item'

import { GMPPackingScissorsKnivesAuthorizationComponent } from '../pages/logs/gmp-packing-scissors-knives/authorization/gmp.packing.scissors.knives.authorization'

import { GMPPackingScissorsKnivesReportComponent } from '../pages/reports/gmp-packing-scissors-knives/report/gmp.packing.scissors.knives.report'
import { GMPPackingScissorsKnivesReportItemComponent } from '../pages/reports/gmp-packing-scissors-knives/item/gmp.packing.scissors.knives.report.item'
//import { GMPPackingScissorsKnivesReportLoader } from '../pages/reports/gmp-packing-scissors-knives/loader/gmp.packing.scissors.knives.report.loader'
//import { GMPPackingScissorsKnivesReportDisplayer } from '../pages/reports/gmp-packing-scissors-knives/displayer/gmp.packing.scissors.knives.report.displayer'

import { GMPPackingScissorsKnivesInventoryComponent } from '../pages/inventories/gmp-packing-scissors-knives/inventory/gmp.packing.scissors.knives.inventory'
import { GMPPackingScissorsKnivesInventoryItemComponent } from '../pages/inventories/gmp-packing-scissors-knives/item/gmp.packing.scissors.knives.inventory.item'
import { GMPPackingScissorsKnivesInventoryListComponent } from '../pages/inventories/gmp-packing-scissors-knives/list/gmp.packing.scissors.knives.inventory.list'
import { GMPPackingScissorsKnivesAddItemComponent } from '../pages/inventories/gmp-packing-scissors-knives/add-item/gmp.packing.scissors.knives.add.item'

// GMP Packing Thermo Calibration

import { GMPPackingThermoCalibrationLogComponent } from '../pages/logs/gmp-packing-thermo-calibration/log/gmp.packing.thermo.calibration.log'
import { GMPPackingThermoCalibrationItemComponent } from '../pages/logs/gmp-packing-thermo-calibration/item/gmp.packing.thermo.calibration.item'

import { GMPPackingThermoCalibrationAuthorizationComponent } from '../pages/logs/gmp-packing-thermo-calibration/authorization/gmp.packing.thermo.calibration.authorization'

import { GMPPackingThermoCalibrationReportComponent } from '../pages/reports/gmp-packing-thermo-calibration/report/gmp.packing.thermo.calibration.report'
import { GMPPackingThermoCalibrationReportItemComponent } from '../pages/reports/gmp-packing-thermo-calibration/item/gmp.packing.thermo.calibration.report.item'
//import { GMPPackingThermoCalibrationReportLoader } from '../pages/reports/gmp-packing-thermo-calibration/loader/gmp.packing.thermo.calibration.report.loader'
//import { GMPPackingThermoCalibrationReportDisplayer } from '../pages/reports/gmp-packing-thermo-calibration/displayer/gmp.packing.thermo.calibration.report.displayer'

import { GMPPackingThermoCalibrationInventoryComponent } from '../pages/inventories/gmp-packing-thermo-calibration/inventory/gmp.packing.thermo.calibration.inventory'
import { GMPPackingThermoCalibrationInventoryItemComponent } from '../pages/inventories/gmp-packing-thermo-calibration/item/gmp.packing.thermo.calibration.inventory.item'
import { GMPPackingThermoCalibrationInventoryListComponent } from '../pages/inventories/gmp-packing-thermo-calibration/list/gmp.packing.thermo.calibration.inventory.list'
import { GMPPackingThermoCalibrationAddItemComponent } from '../pages/inventories/gmp-packing-thermo-calibration/add-item/gmp.packing.thermo.calibration.add.item'

// GMP Packing Cold Room Temp

import { GMPPackingColdRoomTempLogComponent } from '../pages/logs/gmp-packing-cold-room-temp/log/gmp.packing.cold.room.temp.log'
import { GMPPackingColdRoomTempItemComponent } from '../pages/logs/gmp-packing-cold-room-temp/item/gmp.packing.cold.room.temp.item'

import { GMPPackingColdRoomTempAuthorizationComponent } from '../pages/logs/gmp-packing-cold-room-temp/authorization/gmp.packing.cold.room.temp.authorization'

import { GMPPackingColdRoomTempReportComponent } from '../pages/reports/gmp-packing-cold-room-temp/report/gmp.packing.cold.room.temp.report'
import { GMPPackingColdRoomTempReportItemComponent } from '../pages/reports/gmp-packing-cold-room-temp/item/gmp.packing.cold.room.temp.report.item'
//import { GMPPackingColdRoomTempReportLoader } from '../pages/reports/gmp-packing-cold-room-temp/loader/gmp.packing.cold.room.temp.report.loader'
//import { GMPPackingColdRoomTempReportDisplayer } from '../pages/reports/gmp-packing-cold-room-temp/displayer/gmp.packing.cold.room.temp.report.displayer'

import { GMPPackingColdRoomTempInventoryComponent } from '../pages/inventories/gmp-packing-cold-room-temp/inventory/gmp.packing.cold.room.temp.inventory'
import { GMPPackingColdRoomTempInventoryItemComponent } from '../pages/inventories/gmp-packing-cold-room-temp/item/gmp.packing.cold.room.temp.inventory.item'
import { GMPPackingColdRoomTempInventoryListComponent } from '../pages/inventories/gmp-packing-cold-room-temp/list/gmp.packing.cold.room.temp.inventory.list'
import { GMPPackingColdRoomTempAddItemComponent } from '../pages/inventories/gmp-packing-cold-room-temp/add-item/gmp.packing.cold.room.temp.add.item'

// GMP Packing Self Inspection Pest Control

import { GMPSelfInspectionPestControlReportComponent } from '../pages/reports/gmp-self-inspection-pest-control/report/gmp.self.inspection.pest.control.report'
import { GMPSelfInspectionPestControlReportAreaComponent } from '../pages/reports/gmp-self-inspection-pest-control/area/gmp.self.inspection.pest.control.area'
import { GMPSelfInspectionPestControlReportItemComponent } from '../pages/reports/gmp-self-inspection-pest-control/item/gmp.self.inspection.pest.control.item'

import { GMPSelfInspectionPestControlAreaInventoryComponent } from '../pages/inventories/gmp-self-inspection-pest-control/area-inventory/gmp.self.inspection.pest.control.area.inventory'
import { GMPSelfInspectionPestControlAreaInventoryAreaComponent } from '../pages/inventories/gmp-self-inspection-pest-control/area/gmp.self.inspection.pest.control.area.inventory.area'
import { GMPSelfInspectionPestControlAreaInventoryListComponent } from '../pages/inventories/gmp-self-inspection-pest-control/area-list/gmp.self.inspection.pest.control.area.inventory.list'

import { GMPSelfInspectionPestControlInventoryManagerComponent } from '../pages/inventories/gmp-self-inspection-pest-control/manager/gmp.self.inspection.pest.control.inventory.manager'
import { GMPSelfInspectionPestControlInventoryComponent } from '../pages/inventories/gmp-self-inspection-pest-control/inventory/gmp.self.inspection.pest.control.inventory'
import { GMPSelfInspectionPestControlInventoryItemComponent } from '../pages/inventories/gmp-self-inspection-pest-control/item/gmp.self.inspection.pest.control.inventory.item'
import { GMPSelfInspectionPestControlInventoryListComponent } from '../pages/inventories/gmp-self-inspection-pest-control/list/gmp.self.inspection.pest.control.inventory.list'
import { GMPSelfInspectionPestControlAddAreaComponent } from '../pages/inventories/gmp-self-inspection-pest-control/add-area/gmp.self.inspection.pest.control.add.area'
import { GMPSelfInspectionPestControlEditAreaComponent } from '../pages/inventories/gmp-self-inspection-pest-control/edit-area/gmp.self.inspection.pest.control.edit.area'
import { GMPSelfInspectionPestControlAddItemComponent } from '../pages/inventories/gmp-self-inspection-pest-control/add-item/gmp.self.inspection.pest.control.add.item'

//GMP Document Control

import { GMPDocControlDocControlInventoryComponent } from '../pages/inventories/gmp-doc-control-doc-control/inventory/gmp.doc.control.doc.control.inventory'
import { GMPDocControlDocControlInventoryItemComponent } from '../pages/inventories/gmp-doc-control-doc-control/item/gmp.doc.control.doc.control.inventory.item'
import { GMPDocControlDocControlInventoryListComponent } from '../pages/inventories/gmp-doc-control-doc-control/list/gmp.doc.control.doc.control.inventory.list'
import { GMPDocControlDocControlAddItemComponent } from '../pages/inventories/gmp-doc-control-doc-control/add-item/gmp.doc.control.doc.control.add.item'

// Authorizations

import { AuthorizationCardComponent } from '../pages/authorizations/authorization-card/authorization.card.component'
import { AuthorizationCardListComponent } from '../pages/authorizations/authorization-card-list/authorization.card.list.component'

// Pending Logs

import { PendingCardComponent } from '../pages/pending-logs/pending-card/pending.card.component'
import { PendingCardListComponent } from '../pages/pending-logs/pending-card-list/pending.card.list.component'

// Tabs

import { ManualTab } from '../pages/manual/manual'
import { ReportTab } from '../pages/reports/reports'

// Other Loaders

import { ManualUploadComponent } from '../pages/manual/manual-upload/manual.upload'

import { InventoryLoaderComponent } from '../pages/inventories/inventories'

import { LocalizationModule, LocaleService, TranslationService as TService } from 'angular-l10n'

import { DynamicComponentContainerDirective } from '../directives/dynamic.container'
import { HideFabDirective } from "../directives/hide.fab"

import { AuthorizationLoader } from '../pages/authorizations/authorization-loader/authorization.loader.component'

// Services

import { DateTimeService } from '../services/app.time'
import { BackendService } from '../services/app.backend'
import { TranslationService } from '../services/app.translation'
import { ToastsService } from '../services/app.toasts'
import { LoaderService } from '../services/app.loaders'
import { LogService } from '../services/app.logs'
import { InventoryService } from '../services/app.inventory'
import { AreaManagerService } from '../services/app.area.manager'
import { ReportLoader } from '../pages/reports/loader/report.loader'
import { ReportHeaderComponent } from '../pages/reports/report-header/report.header'
import { GMPOthersUnusualOccurrenceReportComponent } from '../pages/reports/gmp-others-unusual-occurrence/report/gmp.others.unusual.occurrence.report';
import { GAPOthersUnusualOccurrenceReportComponent } from '../pages/reports/gap-others-unusual-occurrence/report/gap.others.unusual.occurrence.report';
import { GMPPackingAgedProductReportComponent } from '../pages/reports/gmp-packing-aged-product/report/gmp.packing.aged.product.report';
import { GMPPackingFinishedProductReportComponent } from '../pages/reports/gmp-packing-finished-product/report/gmp.packing.finished.product.report';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditProfile,
    ModulesPage,
    LogsPage,
    ManualTab,
    ManualUploadComponent,
    ReportTab,
    InventoryLoaderComponent,
    DynamicComponentContainerDirective,
    HideFabDirective,
    LogHeaderComponent,
    ReportHeaderComponent,
    AuthorizationCardComponent,
    AuthorizationCardListComponent,
    AuthorizationLoader,
    ReportLoader,
    PendingCardComponent,
    PendingCardListComponent,
    LogTabsPage,
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent,
    GMPPackingPreopAuthorizationComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    //GMPPackingPreopReportLoader,
    //GMPPackingPreopReportDisplayer,
    GMPPackingPreopInventoryManagerComponent,
    GMPPackingPreopInventoryComponent,
    GMPPackingPreopInventoryItemComponent,
    GMPPackingPreopInventoryListComponent,
    GMPPackingPreopAreaInventoryComponent,
    GMPPackingPreopAreaInventoryAreaComponent,
    GMPPackingPreopAreaInventoryListComponent,
    GMPPackingPreopAddAreaComponent,
    GMPPackingPreopEditAreaComponent,
    GMPPackingPreopAddItemComponent,
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent,
    GMPPackingHandWashingAuthorizationComponent,
    GMPPackingHandWashingReportComponent,
    GMPPackingHandWashingReportItemComponent,
    //GMPPackingHandWashingReportLoader,
    //GMPPackingHandWashingReportDisplayer,
    GMPPackingHandWashingInventoryComponent,
    GMPPackingHandWashingInventoryItemComponent,
    GMPPackingHandWashingInventoryListComponent,
    GMPPackingHandWashingAddItemComponent,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent,
    GMPPackingGlassBrittleAuthorizationComponent,
    GMPPackingGlassBrittleReportComponent,
    GMPPackingGlassBrittleReportAreaComponent,
    GMPPackingGlassBrittleReportItemComponent,
    //GMPPackingGlassBrittleReportLoader,
    //GMPPackingGlassBrittleReportDisplayer,
    GMPPackingGlassBrittleInventoryManagerComponent,
    GMPPackingGlassBrittleInventoryComponent,
    GMPPackingGlassBrittleInventoryItemComponent,
    GMPPackingGlassBrittleInventoryListComponent,
    GMPPackingGlassBrittleAreaInventoryComponent,
    GMPPackingGlassBrittleAreaInventoryAreaComponent,
    GMPPackingGlassBrittleAreaInventoryListComponent,
    GMPPackingGlassBrittleAddAreaComponent,
    GMPPackingGlassBrittleEditAreaComponent,
    GMPPackingGlassBrittleAddItemComponent,
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScaleCalibrationTypeComponent,
    GMPPackingScaleCalibrationItemComponent,
    GMPPackingScaleCalibrationAuthorizationComponent,
    GMPPackingScaleCalibrationReportComponent,
    GMPPackingScaleCalibrationReportTypeComponent,
    GMPPackingScaleCalibrationReportItemComponent,
    //GMPPackingScaleCalibrationReportLoader,
    //GMPPackingScaleCalibrationReportDisplayer,
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingScaleCalibrationInventoryItemComponent,
    GMPPackingScaleCalibrationInventoryListComponent,
    GMPPackingScaleCalibrationAddItemComponent,
    GAPPackingPreopLogComponent,
    GAPPackingPreopAreaComponent,
    GAPPackingPreopTypeComponent,
    GAPPackingPreopItemComponent,
    GAPPackingPreopReportComponent,
    GAPPackingPreopReportAreaComponent,
    GAPPackingPreopReportTypeComponent,
    GAPPackingPreopReportItemComponent,
    //GAPPackingPreopReportLoader,
    //GAPPackingPreopReportDisplayer,
    GAPPackingPreopInventoryManagerComponent,
    GAPPackingPreopInventoryComponent,
    GAPPackingPreopInventoryItemComponent,
    GAPPackingPreopInventoryListComponent,
    GAPPackingPreopAreaInventoryComponent,
    GAPPackingPreopAreaInventoryAreaComponent,
    GAPPackingPreopAreaInventoryListComponent,
    GAPPackingPreopAddAreaComponent,
    GAPPackingPreopEditAreaComponent,
    GAPPackingPreopAddItemComponent,
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent,
    GMPPackingScissorsKnivesAuthorizationComponent,
    GMPPackingScissorsKnivesReportComponent,
    GMPPackingScissorsKnivesReportItemComponent,
    //GMPPackingScissorsKnivesReportLoader,
    //GMPPackingScissorsKnivesReportDisplayer,
    GMPPackingScissorsKnivesInventoryComponent,
    GMPPackingScissorsKnivesInventoryItemComponent,
    GMPPackingScissorsKnivesInventoryListComponent,
    GMPPackingScissorsKnivesAddItemComponent,
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingThermoCalibrationItemComponent,
    GMPPackingThermoCalibrationAuthorizationComponent,
    GMPPackingThermoCalibrationReportComponent,
    GMPPackingThermoCalibrationReportItemComponent,
    //GMPPackingThermoCalibrationReportLoader,
    //GMPPackingThermoCalibrationReportDisplayer,
    GMPPackingThermoCalibrationInventoryComponent,
    GMPPackingThermoCalibrationInventoryItemComponent,
    GMPPackingThermoCalibrationInventoryListComponent,
    GMPPackingThermoCalibrationAddItemComponent,
    GMPPackingColdRoomTempLogComponent,
    GMPPackingColdRoomTempItemComponent,
    GMPPackingColdRoomTempAuthorizationComponent,
    GMPPackingColdRoomTempReportComponent,
    GMPPackingColdRoomTempReportItemComponent,
    //GMPPackingColdRoomTempReportLoader,
    //GMPPackingColdRoomTempReportDisplayer,
    GMPPackingColdRoomTempInventoryComponent,
    GMPPackingColdRoomTempInventoryItemComponent,
    GMPPackingColdRoomTempInventoryListComponent,
    GMPPackingColdRoomTempAddItemComponent,
    GMPSelfInspectionPestControlReportComponent,
    GMPSelfInspectionPestControlReportAreaComponent,
    GMPSelfInspectionPestControlReportItemComponent,
    GMPSelfInspectionPestControlInventoryManagerComponent,
    GMPSelfInspectionPestControlInventoryComponent,
    GMPSelfInspectionPestControlInventoryItemComponent,
    GMPSelfInspectionPestControlInventoryListComponent,
    GMPSelfInspectionPestControlAreaInventoryComponent,
    GMPSelfInspectionPestControlAreaInventoryAreaComponent,
    GMPSelfInspectionPestControlAreaInventoryListComponent,
    GMPSelfInspectionPestControlAddAreaComponent,
    GMPSelfInspectionPestControlEditAreaComponent,
    GMPSelfInspectionPestControlAddItemComponent,
    GMPDocControlDocControlInventoryComponent,
    GMPDocControlDocControlInventoryItemComponent,
    GMPDocControlDocControlInventoryListComponent,
    GMPDocControlDocControlAddItemComponent,
    GMPOthersUnusualOccurrenceReportComponent,
    GAPOthersUnusualOccurrenceReportComponent,
    GMPPackingAgedProductReportComponent,
    GMPPackingFinishedProductReportComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    DragulaModule,
    LocalizationModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['localstorage', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditProfile,
    ModulesPage,
    LogsPage,
    ManualTab,
    ManualUploadComponent,
    ReportTab,
    InventoryLoaderComponent,
    LogHeaderComponent,
    ReportHeaderComponent,
    AuthorizationCardComponent,
    AuthorizationCardListComponent,
    AuthorizationLoader,
    ReportLoader,
    PendingCardComponent,
    PendingCardListComponent,
    LogTabsPage,
    GMPPackingPreopLogComponent,
    GMPPackingPreopAreaComponent,
    GMPPackingPreopTypeComponent,
    GMPPackingPreopItemComponent,
    GMPPackingPreopAuthorizationComponent,
    GMPPackingPreopReportComponent,
    GMPPackingPreopReportAreaComponent,
    GMPPackingPreopReportTypeComponent,
    GMPPackingPreopReportItemComponent,
    //GMPPackingPreopReportLoader,
    //GMPPackingPreopReportDisplayer,
    GMPPackingPreopInventoryManagerComponent,
    GMPPackingPreopInventoryComponent,
    GMPPackingPreopInventoryItemComponent,
    GMPPackingPreopInventoryListComponent,
    GMPPackingPreopAreaInventoryComponent,
    GMPPackingPreopAreaInventoryAreaComponent,
    GMPPackingPreopAreaInventoryListComponent,
    GMPPackingPreopAddAreaComponent,
    GMPPackingPreopEditAreaComponent,
    GMPPackingPreopAddItemComponent,
    GMPPackingHandWashingLogComponent,
    GMPPackingHandWashingItemComponent,
    GMPPackingHandWashingAuthorizationComponent,
    GMPPackingHandWashingReportComponent,
    GMPPackingHandWashingReportItemComponent,
    //GMPPackingHandWashingReportLoader,
    //GMPPackingHandWashingReportDisplayer,
    GMPPackingHandWashingInventoryComponent,
    GMPPackingHandWashingInventoryItemComponent,
    GMPPackingHandWashingInventoryListComponent,
    GMPPackingHandWashingAddItemComponent,
    GMPPackingGlassBrittleLogComponent,
    GMPPackingGlassBrittleAreaComponent,
    GMPPackingGlassBrittleItemComponent,
    GMPPackingGlassBrittleAuthorizationComponent,
    GMPPackingGlassBrittleReportComponent,
    GMPPackingGlassBrittleReportAreaComponent,
    GMPPackingGlassBrittleReportItemComponent,
    //GMPPackingGlassBrittleReportLoader,
    //GMPPackingGlassBrittleReportDisplayer,
    GMPPackingGlassBrittleInventoryManagerComponent,
    GMPPackingGlassBrittleInventoryComponent,
    GMPPackingGlassBrittleInventoryItemComponent,
    GMPPackingGlassBrittleInventoryListComponent,
    GMPPackingGlassBrittleAreaInventoryComponent,
    GMPPackingGlassBrittleAreaInventoryAreaComponent,
    GMPPackingGlassBrittleAreaInventoryListComponent,
    GMPPackingGlassBrittleAddAreaComponent,
    GMPPackingGlassBrittleEditAreaComponent,
    GMPPackingGlassBrittleAddItemComponent,
    GMPPackingScaleCalibrationLogComponent,
    GMPPackingScaleCalibrationTypeComponent,
    GMPPackingScaleCalibrationItemComponent,
    GMPPackingScaleCalibrationAuthorizationComponent,
    GMPPackingScaleCalibrationReportComponent,
    GMPPackingScaleCalibrationReportTypeComponent,
    GMPPackingScaleCalibrationReportItemComponent,
    //GMPPackingScaleCalibrationReportLoader,
    //GMPPackingScaleCalibrationReportDisplayer,
    GMPPackingScaleCalibrationInventoryComponent,
    GMPPackingScaleCalibrationInventoryItemComponent,
    GMPPackingScaleCalibrationInventoryListComponent,
    GMPPackingScaleCalibrationAddItemComponent,
    GAPPackingPreopLogComponent,
    GAPPackingPreopAreaComponent,
    GAPPackingPreopTypeComponent,
    GAPPackingPreopItemComponent,
    GAPPackingPreopReportComponent,
    GAPPackingPreopReportAreaComponent,
    GAPPackingPreopReportTypeComponent,
    GAPPackingPreopReportItemComponent,
    //GAPPackingPreopReportLoader,
    //GAPPackingPreopReportDisplayer,
    GAPPackingPreopInventoryManagerComponent,
    GAPPackingPreopInventoryComponent,
    GAPPackingPreopInventoryItemComponent,
    GAPPackingPreopInventoryListComponent,
    GAPPackingPreopAreaInventoryComponent,
    GAPPackingPreopAreaInventoryAreaComponent,
    GAPPackingPreopAddAreaComponent,
    GAPPackingPreopEditAreaComponent,
    GAPPackingPreopAddItemComponent,
    GMPPackingScissorsKnivesLogComponent,
    GMPPackingScissorsKnivesItemComponent,
    GMPPackingScissorsKnivesAuthorizationComponent,
    GMPPackingScissorsKnivesReportComponent,
    GMPPackingScissorsKnivesReportItemComponent,
    //GMPPackingScissorsKnivesReportLoader,
    //GMPPackingScissorsKnivesReportDisplayer,
    GMPPackingScissorsKnivesInventoryComponent,
    GMPPackingScissorsKnivesInventoryItemComponent,
    GMPPackingScissorsKnivesInventoryListComponent,
    GMPPackingScissorsKnivesAddItemComponent,
    GMPPackingThermoCalibrationLogComponent,
    GMPPackingThermoCalibrationItemComponent,
    GMPPackingThermoCalibrationAuthorizationComponent,
    GMPPackingThermoCalibrationReportComponent,
    GMPPackingThermoCalibrationReportItemComponent,
    //GMPPackingThermoCalibrationReportLoader,
    //GMPPackingThermoCalibrationReportDisplayer,
    GMPPackingThermoCalibrationInventoryComponent,
    GMPPackingThermoCalibrationInventoryItemComponent,
    GMPPackingThermoCalibrationInventoryListComponent,
    GMPPackingThermoCalibrationAddItemComponent,
    GMPPackingColdRoomTempLogComponent,
    GMPPackingColdRoomTempItemComponent,
    GMPPackingColdRoomTempAuthorizationComponent,
    GMPPackingColdRoomTempReportComponent,
    GMPPackingColdRoomTempReportItemComponent,
    //GMPPackingColdRoomTempReportLoader,
    //GMPPackingColdRoomTempReportDisplayer,
    GMPPackingColdRoomTempInventoryComponent,
    GMPPackingColdRoomTempInventoryItemComponent,
    GMPPackingColdRoomTempInventoryListComponent,
    GMPPackingColdRoomTempAddItemComponent,
    GMPSelfInspectionPestControlReportComponent,
    GMPSelfInspectionPestControlReportAreaComponent,
    GMPSelfInspectionPestControlReportItemComponent,
    GMPSelfInspectionPestControlInventoryManagerComponent,
    GMPSelfInspectionPestControlInventoryComponent,
    GMPSelfInspectionPestControlInventoryItemComponent,
    GMPSelfInspectionPestControlInventoryListComponent,
    GMPSelfInspectionPestControlAreaInventoryComponent,
    GMPSelfInspectionPestControlAreaInventoryAreaComponent,
    GMPSelfInspectionPestControlAreaInventoryListComponent,
    GMPSelfInspectionPestControlAddAreaComponent,
    GMPSelfInspectionPestControlEditAreaComponent,
    GMPSelfInspectionPestControlAddItemComponent,
    GMPDocControlDocControlInventoryComponent,
    GMPDocControlDocControlInventoryItemComponent,
    GMPDocControlDocControlInventoryListComponent,
    GMPDocControlDocControlAddItemComponent,
    GMPOthersUnusualOccurrenceReportComponent,
    GAPOthersUnusualOccurrenceReportComponent,
    GMPPackingAgedProductReportComponent,
    GMPPackingFinishedProductReportComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    BackendService,
    LoaderService,
    ToastsService,
    LogService,
    InventoryService,
    AreaManagerService,
    TranslationService,
    DateTimeService,
    TService
  ]
})
export class AppModule {
  constructor(public locale: LocaleService, public translation: TService) {
    this.locale.addConfiguration()
        .addLanguages(['en', 'es'])
        .setCookieExpiration(30)
        .defineLanguage('es')

    this.translation.addConfiguration()
        .addProvider('./assets/locale-')

    this.translation.init()
  }
}
