import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPPackingGlassBrittleAreaInventoryComponent } from '../area-inventory/gmp.packing.glass.brittle.area.inventory'
import { GMPPackingGlassBrittleInventoryComponent } from '../inventory/gmp.packing.glass.brittle.inventory'

@Component({
  selector: 'gmp-packing-glass-brittle-inventory-manager',
  templateUrl: 'gmp.packing.glass.brittle.inventory.manager.html'
})

export class GMPPackingGlassBrittleInventoryManagerComponent implements OnInit {
  @Language() lang: string
  public tab1Root: any
  public tab2Root: any

  constructor() {
    
  }

  ngOnInit(){
    this.tab1Root = GMPPackingGlassBrittleInventoryComponent
    this.tab2Root = GMPPackingGlassBrittleAreaInventoryComponent
  }
}
