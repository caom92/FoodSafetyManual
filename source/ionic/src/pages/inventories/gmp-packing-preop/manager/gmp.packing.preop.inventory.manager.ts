import { Component, OnInit } from '@angular/core'
import { NavController, NavParams, Select, Events, LoadingController, Tab } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Language, TranslationService as TService } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { NavbarPageComponent } from '../../../super-components/navbar.component'

import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'

// Import the components for the tabs

import { GMPPackingPreopInventoryComponent } from '../inventory/gmp.packing.preop.inventory'
import { GMPPackingPreopAreaInventoryComponent } from '../area-inventory/gmp.packing.preop.area.inventory'

@Component({
  selector: 'gmp-packing-preop-inventory-manager',
  templateUrl: 'gmp.packing.preop.inventory.manager.html',
  providers: [
    ToastService,
    BackendService,
    TranslationService
  ]
})

export class GMPPackingPreopInventoryManagerComponent extends NavbarPageComponent implements OnInit {
  @Language() lang: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public translationService: TranslationService, public events: Events, public storage: Storage, public server: BackendService, public loadingCtrl: LoadingController, private toastService: ToastService, public ts: TService) {
    super(translationService, events, storage, server)
  }
  
  tab1Root: any
  tab2Root: any

  ngOnInit(){
    // Siempre se llama primero al ngOnInit del padre para suscribirse a la situación actual
    // de los pendientes
    super.ngOnInit()

    // Asignamos los componentes de inventario de elementos y de áreas a las pestañas
    this.tab1Root = GMPPackingPreopInventoryComponent
    this.tab2Root = GMPPackingPreopAreaInventoryComponent
  }
}
