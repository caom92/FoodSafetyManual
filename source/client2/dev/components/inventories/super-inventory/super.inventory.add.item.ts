import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'

import { AlertController } from '../../../services/alert/app.alert'
import { InventoryService } from '../../../services/app.inventory'
import { PubSubService } from 'angular2-pubsub'
import { ToastsService } from '../../../services/app.toasts'

export class SuperInventoryAddItemComponent {
  protected newItem: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private inventoryService: InventoryService,
    private events: PubSubService,
    private toastService: ToastsService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newItem = this._fb.group(controlsConfig)
  }

  public addItem(data: any, itemData: any) {
    if (this.newItem.valid) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_item"),
        message: this.ts.translate("Messages.add_item") + "<br><br>" + this.newItem.value.name,
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              console.log('Cancelar')
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              this.inventoryService.addItem(itemData, this.suffix).then(success => {
                data.item.id = success
                this.events.$pub("item:add", data)
              })
            }
          }
        ]
      })
    } else {
      this.inventoryService.setAsDirty(this.newItem)
      this.toastService.showText("itemAddFail")
    }
  }
}