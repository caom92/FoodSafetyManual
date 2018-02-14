import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GAPPackingPreopAreaInventoryComponent } from '../area-inventory/gap.packing.preop.area.inventory'
import { GAPPackingPreopInventoryComponent } from '../inventory/gap.packing.preop.inventory'

@Component({
  selector: 'gap-packing-preop-inventory-manager',
  templateUrl: 'gap.packing.preop.inventory.manager.html'
})

export class GAPPackingPreopInventoryManagerComponent implements OnInit {
  @Language() lang: string
  public tab1Root: any
  public tab2Root: any

  constructor() {

  }

  ngOnInit(){
    this.tab1Root = GAPPackingPreopInventoryComponent
    this.tab2Root = GAPPackingPreopAreaInventoryComponent
  }
}
