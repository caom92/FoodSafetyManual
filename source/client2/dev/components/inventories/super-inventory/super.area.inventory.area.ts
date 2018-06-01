import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AlertController } from '../../../services/alert/app.alert'
import { AreaManagerService } from '../../../services/app.area.manager'
import { SuperInventoryAreaInterface, SuperInventoryEditAreaInterface } from './super.area.inventory.interface'

export class SuperInventoryAreaComponent {
  protected area: SuperInventoryAreaInterface
  protected newArea: FormGroup = new FormBuilder().group({})
  protected toggleValue: boolean = true
  private toggleError: boolean = false
  private previousValue: boolean = null
  private suffix: string = null
  protected editMode: boolean = false

  constructor(protected events: PubSubService,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private areaManagerService: AreaManagerService) {

  }

  public setToggleValue(status: boolean): void {
    if (this.area.is_active == 1) {
      this.toggleValue = true
    } else {
      this.toggleValue = false
    }
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newArea = this._fb.group(controlsConfig)
  }

  public editArea(areaData: SuperInventoryEditAreaInterface) {
    if (this.newArea.valid && this.newArea.value.name != this.area.name) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.edit_area"),
        message: this.ts.translate("Messages.edit_area") + "<br><br>" + this.ts.translate("Adverbs.before") + ": " + this.area.name + "<br>" + this.ts.translate("Adverbs.after") + ": " + this.newArea.value.name,
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
              this.areaManagerService.editArea(areaData, this.suffix).then(success => {
                this.editMode = false
                this.area.name = this.newArea.value.name
                this.events.$pub("area:edit", this.area)
              }, error => {
                this.editMode = false
                console.log("Nombre repetido")
              })
            }
          }
        ]
      })
    } else if (!this.newArea.valid) {
      console.log("New item not valid")
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    } else if (this.newArea.value.name == this.area.name) {
      console.log("New and old name are the same")
      this.editMode = false
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    }
  }

  public toggleArea(): void {
    if (this.toggleError) {
      this.toggleValue = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = this.toggleValue
      this.areaManagerService.toggleArea(this.area, this.suffix).then(success => {
        
      }, error => {
        this.toggleError = true
        this.toggleArea()
      })
    }
  }

  /*public editArea(editAreaComponent: any, data: any, handler: Function): void {
    let modal = this.modalController.create(editAreaComponent, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
      }
    })
  }*/
}