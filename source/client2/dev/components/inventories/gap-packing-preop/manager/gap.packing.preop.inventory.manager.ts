import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

@Component({
  selector: 'gap-packing-preop-inventory-manager',
  templateUrl: 'gap.packing.preop.inventory.manager.html'
})

export class GAPPackingPreopInventoryManagerComponent {
  @Language() lang: string

  constructor() {

  }
}
