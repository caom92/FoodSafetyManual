import { OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'
import { NavParams } from 'ionic-angular'

import { AreaManagerService } from '../../../services/app.area.manager'
import { SuperInventoryAreaInterface, SuperInventoryEditAreaInterface } from './super.area.inventory.interface'

export class SuperInventoryEditAreaComponent implements OnInit {
  protected area_id: number = null
  protected area_name: string = null
  protected newArea: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected params: NavParams,
    protected viewCtrl: ViewController,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private areaManagerService: AreaManagerService) {

  }

  public ngOnInit(): void {
    this.area_id = this.params.get("area_id")
    this.area_name = this.params.get("area_name")
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

  public editArea(listData: { area: SuperInventoryAreaInterface }, areaData: SuperInventoryEditAreaInterface) {
    if (this.newArea.valid && this.newArea.value.name != this.area_name) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.edit_area"),
        message: this.ts.translate("Messages.edit_area") + "<br><br>" + this.ts.translate("Adverbs.before") + ": " + this.area_name + "<br>" + this.ts.translate("Adverbs.after") + ": " + this.newArea.value.name,
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
                this.viewCtrl.dismiss(listData)
              }, error => {

              })
            }
          }
        ]
      })
      confirmAdd.present()
    } else if (!this.newArea.valid) {
      console.log("New item not valid")
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    } else if (this.newArea.value.name == this.area_name) {
      console.log("New and old name are the same")
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    }
  }
}