import { Component, ComponentFactoryResolver, OnInit } from '@angular/core'

import { NavParams, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

import { DynamicNavbarPageComponent } from '../super-components/dynamic.navbar.component'

import { GMPPackingScaleCalibrationInventoryComponent } from './gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'
//import { GMPPackingPreopInventoryComponent } from './gmp-packing-preop/inventory/gmp.packing.preop.inventory'
import { GMPPackingScissorsKnivesInventoryComponent } from './gmp-packing-scissors-knives/inventory/gmp.packing.scissors.knives.inventory'
import { GMPPackingHandWashingInventoryComponent } from './gmp-packing-hand-washing/inventory/gmp.packing.hand.washing.inventory'
import { GMPPackingThermoCalibrationInventoryComponent } from './gmp-packing-thermo-calibration/inventory/gmp.packing.thermo.calibration.inventory'
import { GMPPackingColdRoomTempInventoryComponent } from './gmp-packing-cold-room-temp/inventory/gmp.packing.cold.room.temp.inventory'
import { GMPPackingPreopInventoryManagerComponent } from './gmp-packing-preop/manager/gmp.packing.preop.inventory.manager'
import { GAPPackingPreopInventoryManagerComponent } from './gap-packing-preop/manager/gap.packing.preop.inventory.manager'
import { GMPPackingGlassBrittleInventoryManagerComponent } from './gmp-packing-glass-brittle/manager/gmp.packing.glass.brittle.inventory.manager'

@Component({
  selector: 'inventories',
  templateUrl: 'inventories.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class InventoryLoaderComponent extends DynamicNavbarPageComponent implements OnInit {
  @Language()
  lang: string

  loaderComponent: any = null
  inventorySuffix: string = ""
  title: string = ""

  constructor(public translationService: TranslationService, public events: Events, public storage: Storage, factoryResolver: ComponentFactoryResolver, public navParams: NavParams, public server: BackendService) {
    super(translationService, events, storage, server, factoryResolver)
    this.inventorySuffix = this.navParams.get('log_suffix')
    this.title = this.navParams.get('log_title')
  }

  ngOnInit() {
    switch (this.inventorySuffix) {
      case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationInventoryComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GMPPackingPreopInventoryManagerComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-scissors-knives': this.loaderComponent = this.loadComponent(GMPPackingScissorsKnivesInventoryComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-thermo-calibration': this.loaderComponent = this.loadComponent(GMPPackingThermoCalibrationInventoryComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingInventoryComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-cold-room-temp': this.loaderComponent = this.loadComponent(GMPPackingColdRoomTempInventoryComponent, {
        parent: this
      }).instance
        break
      case 'gmp-packing-glass-brittle': this.loaderComponent = this.loadComponent(GMPPackingGlassBrittleInventoryManagerComponent, {
        parent: this
      }).instance
        break
      case 'gap-packing-preop': this.loaderComponent = this.loadComponent(GAPPackingPreopInventoryManagerComponent, {
        parent: this
      }).instance
        break
    }
  }
}