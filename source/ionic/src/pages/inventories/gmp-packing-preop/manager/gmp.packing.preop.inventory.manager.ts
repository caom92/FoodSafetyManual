import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingPreopAreaInventoryComponent } from '../area-inventory/gmp.packing.preop.area.inventory'
import { GMPPackingPreopInventoryComponent } from '../inventory/gmp.packing.preop.inventory'

@Component({
  selector: 'gmp-packing-preop-inventory-manager',
  templateUrl: 'gmp.packing.preop.inventory.manager.html'
})

export class GMPPackingPreopInventoryManagerComponent implements OnInit {
  @Language() lang: string
  public tab1Root: any
  public tab2Root: any

  constructor() {

  }

  ngOnInit(){
    this.tab1Root = GMPPackingPreopInventoryComponent
    this.tab2Root = GMPPackingPreopAreaInventoryComponent
  }
}
