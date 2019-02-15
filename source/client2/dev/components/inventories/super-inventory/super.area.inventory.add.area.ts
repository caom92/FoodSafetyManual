import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AlertController } from '../../../services/alert/app.alert'
import { AreaManagerService } from '../../../services/app.area.manager'

export class SuperInventoryAddAreaComponent {
  protected newArea: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public translationService: TranslationService,
    private areaManagerService: AreaManagerService,
    private events: PubSubService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newArea = this._fb.group(controlsConfig)
  }

  public addArea(listData: any, itemData: any) {
    if (this.newArea.valid) {
      let confirmAdd = this.alertCtrl.create({
        title: this.translationService.translate('Titles.add_area'),
        message: this.translationService.translate('Messages.add_area') + '<br><br>' + this.newArea.value.name,
        buttons: [
          {
            text: this.translationService.translate('Options.cancel'),
            handler: () => {
              
            }
          },
          {
            text: this.translationService.translate('Options.accept'),
            handler: () => {
              this.areaManagerService.addArea(itemData, this.suffix).then(success => {
                listData.area.id = success.id
                listData.area.position = success.position
                this.events.$pub('area:add', listData.area)
              })
            }
          }
        ]
      })
    } else {
      this.areaManagerService.setAsDirty(this.newArea)
      console.log('New item not valid')
    }
  }
}