import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'gmp-packing-preop-inventory-manager',
  templateUrl: 'gmp.packing.preop.inventory.manager.html'
})

export class GMPPackingPreopInventoryManagerComponent {
  @Language() lang: string

  constructor() {

  }
}
