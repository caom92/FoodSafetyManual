import { Language } from 'angular-l10n'

import { InventoryService } from '../../../services/inventory.service'
import { SuperInventoryItemInterface } from './super.inventory.interface'

export class SuperInventoryItemComponent {
  @Language() lang: string
  private suffix: string = null
  protected toggleValue: boolean = true
  private toggleError: boolean = false
  private previousValue: boolean = null
  protected item: SuperInventoryItemInterface

  constructor(private inventoryService: InventoryService) {

  }

  public setToggleValue(status: boolean): void {
    if (this.item.is_active == 1) {
      this.toggleValue = true
    } else {
      this.toggleValue = false
    }
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public toggleItem(): void {
    if (this.toggleError) {
      this.toggleValue = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = this.toggleValue
      this.inventoryService.toggleItem(this.suffix, this.item).then(success => {

      }, error => {
        this.toggleError = true
        this.toggleItem()
      })
    }
  }
}