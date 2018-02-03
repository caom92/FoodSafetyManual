import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'
import { Events, ModalController } from 'ionic-angular'

import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryComponent } from '../../super-inventory/super.inventory'
import { GMPDocControlDocControlAddItemComponent } from '../add-item/gmp.doc.control.doc.control.add.item'
import { InventoryItem } from '../interfaces/gmp.doc.control.doc.control.inventory.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-inventory',
  templateUrl: './gmp.doc.control.doc.control.inventory.html'
})

export class GMPDocControlDocControlInventoryComponent extends SuperInventoryComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() inventory: Array<InventoryItem> = []

  constructor(events: Events,
    inventoryService: InventoryService,
    modalController: ModalController) {
    super(events, inventoryService, modalController)
  }

  public ngOnInit(): void {
    this.setSuffix("gmp-doc-control-doc-control")
    super.ngOnInit()
  }

  public addItem(): void {
    super.addItem(GMPDocControlDocControlAddItemComponent, null, (data) => {
      data.item.position = this.inventory.length + 1
      this.inventory.push(data.item)
    })
  }

  public checkEmptyInventory(): boolean {
    this.emptyInventoryFlag = this.inventory.length == 0
    return this.inventory.length == 0
  }
}