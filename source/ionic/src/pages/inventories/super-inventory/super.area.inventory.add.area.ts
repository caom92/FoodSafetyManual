import { OnInit } from "@angular/core"
import { Validators, FormGroup, FormBuilder } from "@angular/forms"
import { ViewController, AlertController } from "ionic-angular"
import { TranslationService as TService } from 'angular-l10n'
import { AreaManagerService } from '../../../services/app.area.manager'
import { SuperInventoryItemInterface } from "./super.inventory.interface";

export class SuperInventoryAddItemComponent implements OnInit {
  protected newItem: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected viewCtrl: ViewController,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private areaManagerService: AreaManagerService) {

  }

  public ngOnInit(): void {

  }

  /**
   * Asigna el sufijo de la bitácora
   * 
   * @param {string} suffix - Sufijo de bitácora que corresponde al usado en la
   * base de datos
   * @memberof SuperInventoryItemComponent
   */

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Cierra el modal sin regresar datos
   * 
   * @memberof GMPPackingScaleCalibrationAddItemComponent
   */

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newItem = this._fb.group(controlsConfig)
  }

  public addItem(data: any, itemData: any) {
    if (this.newItem.valid) {
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_area"),
        message: this.ts.translate("Messages.add_area") + "<br><br>" + this.newItem.value.name,
        buttons: [
          {
            text: this.ts.translate("Options.cancel"),
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: this.ts.translate("Options.accept"),
            handler: () => {
              let listData = data
              let addData = itemData

              this.areaManagerService.addArea(itemData, this.suffix).then(success => {
                data.area.id = success.id
                data.area.position = success.position
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
      this.areaManagerService.setAsDirty(this.newItem)
      console.log("New item not valid")
    }
  }
}