import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'gmp-packing-ozone-water-inventory-manager',
  templateUrl: 'gmp.packing.ozone.water.inventory.manager.html'
})

export class GMPPackingOzoneWaterInventoryManagerComponent {
  @Language() lang: string

  constructor() {

  }
}
