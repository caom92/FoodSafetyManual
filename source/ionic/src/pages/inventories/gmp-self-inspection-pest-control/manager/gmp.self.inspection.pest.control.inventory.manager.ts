import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GMPSelfInspectionPestControlAreaInventoryComponent } from '../area-inventory/gmp.self.inspection.pest.control.area.inventory'
import { GMPSelfInspectionPestControlInventoryComponent } from '../inventory/gmp.self.inspection.pest.control.inventory'

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-manager',
  templateUrl: 'gmp.self.inspection.pest.control.inventory.manager.html'
})

export class GMPSelfInspectionPestControlInventoryManagerComponent implements OnInit {
  @Language() lang: string
  public tab1Root: any
  public tab2Root: any

  constructor() {
    
  }

  ngOnInit(){
    this.tab1Root = GMPSelfInspectionPestControlInventoryComponent
    this.tab2Root = GMPSelfInspectionPestControlAreaInventoryComponent
  }
}
