import { Component, ComponentFactoryResolver, OnInit } from '@angular/core'

import { NavParams, Events } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ToastService } from '../../services/app.toasts'

import { DynamicNavbarPageComponent } from '../super-components/dynamic.navbar.component'

import { GMPPackingScaleCalibrationInventoryComponent } from './gmp-packing-scale-calibration/inventory/gmp.packing.scale.calibration.inventory'

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
  loaderComponent: any = null
  inventorySuffix: string = ""
  title: string = ""

  constructor(public translationService: TranslationService, public events: Events, factoryResolver: ComponentFactoryResolver, public navParams: NavParams) {
    super(translationService, events, factoryResolver)
    this.inventorySuffix = this.navParams.get('log_suffix')
    this.title = "Inventario " + this.navParams.get('log_title')
  }

  ngOnInit(){
    switch(this.inventorySuffix){
      case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationInventoryComponent, {
        parent: this
      }).instance
        break
    }
  }
}