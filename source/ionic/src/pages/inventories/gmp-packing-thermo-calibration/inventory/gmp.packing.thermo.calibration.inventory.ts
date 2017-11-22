import { Component, Input, OnInit } from '@angular/core'
import { ModalController, Events, NavController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { InventoryItem } from '../interfaces/gmp.packing.thermo.calibration.inventory.interface'

import { HideFabDirective } from '../../../../directives/hide.fab'

import { GMPPackingThermoCalibrationAddItemComponent } from '../add-item/gmp.packing.thermo.calibration.add.item'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-thermo-calibration-inventory',
  templateUrl: './gmp.packing.thermo.calibration.inventory.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingThermoCalibrationInventoryComponent implements OnInit {
  @Language()
  lang: string

  @Input()
  inventory: Array<InventoryItem> = []

  emptyInventoryFlag: boolean = null

  scrollAllowed: boolean = true

  constructor(public events: Events, public modalController: ModalController, public server: BackendService, public navCtrl: NavController, public loaderService: LoaderService, public ts: TService, private toastService: ToastService) {

  }

  ngOnInit() {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    let loader = this.loaderService.koiLoader(this.ts.translate("Connecting to Server"))
    loader.present()
    this.server.update(
      'inventory-gmp-packing-thermo-calibration',
      new FormData(),
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.inventory = response.data
            this.checkEmptyInventory()
            loader.dismiss()
          } else {
            loader.dismiss()
            this.toastService.showText("serverUnreachable")
            this.navCtrl.pop()
          }
        }
      },
      (error: any, caught: Observable<void>) => {
        loader.dismiss()
        this.toastService.showText("serverUnreachable")
        this.navCtrl.pop()
        return []
      }
    )
  }

  addItem() {
    let type_array: Array<{ id: number, name: string }> = []
    for (let temp of this.inventory) {
      type_array.push({ id: temp.id, name: temp.name })
    }
    let modal = this.modalController.create(GMPPackingThermoCalibrationAddItemComponent, { type_array: type_array })
    modal.present()
    modal.onDidDismiss(data => {
      if (data) {
        this.inventory.push(data.item)
        this.emptyInventoryFlag = false
      }
    })
  }

  checkEmptyInventory() {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}