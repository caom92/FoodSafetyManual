import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { InventoryService } from '../../../services/app.inventory'

export class SuperInventoryAddItemComponent {
  protected newItem: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected viewCtrl: ViewController,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private inventoryService: InventoryService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public dismiss(): void {
    this.viewCtrl.dismiss()
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
              let listData = data
              let addData = itemData

              this.inventoryService.addItem(itemData, this.suffix).then(success => {
                data.item.id = success
                this.viewCtrl.dismiss(data)
              }, error => {
                this.viewCtrl.dismiss()
              })
            }
          }
        ]
      })
      confirmAdd.present()
    } else {
      this.inventoryService.setAsDirty(this.newItem)
      console.log("New item not valid")
    }
  }
}