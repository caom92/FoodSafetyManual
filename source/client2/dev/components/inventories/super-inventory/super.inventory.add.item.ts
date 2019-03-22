import { FormBuilder, FormGroup } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'

import { ToastsService } from '../../../services/app.toasts'
import { FormUtilService } from '../../../services/form-util.service'
import { InventoryService } from '../../../services/inventory.service'

export class SuperInventoryAddItemComponent {
  protected newItem: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected _fb: FormBuilder,
    private inventoryService: InventoryService,
    private events: PubSubService,
    private toastService: ToastsService,
    private formUtilService: FormUtilService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newItem = this._fb.group(controlsConfig)
  }

  public addItem(data: any, itemData: any) {
    if (this.newItem.valid) {
      this.inventoryService.addItem(this.suffix, itemData).then(success => {
        data.item.id = success
        this.events.$pub('item:add', data)
      }, error => {
            
      })
    } else {
      this.formUtilService.deepMarkAsDirty(this.newItem)
      this.toastService.showClientMessage('item-add-fail', 1)
    }
  }
}