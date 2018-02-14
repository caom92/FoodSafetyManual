import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { AreaManagerService } from '../../../services/app.area.manager'

export class SuperInventoryAddAreaComponent {
  protected newArea: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected viewCtrl: ViewController,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private areaManagerService: AreaManagerService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public dismiss(): void {
    this.viewCtrl.dismiss()
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newArea = this._fb.group(controlsConfig)
  }

  public addArea(listData: any, itemData: any) {
    if (this.newArea.valid) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_area"),
        message: this.ts.translate("Messages.add_area") + "<br><br>" + this.newArea.value.name,
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              this.areaManagerService.addArea(itemData, this.suffix).then(success => {
                listData.area.id = success.id
                listData.area.position = success.position
                this.viewCtrl.dismiss(listData)
              }, error => {
                this.viewCtrl.dismiss()
              })
            }
          }
        ]
      })
      confirmAdd.present()
    } else {
      this.areaManagerService.setAsDirty(this.newArea)
      console.log("New item not valid")
    }
  }
}