import { OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslationService as TService } from 'angular-l10n'
import { AlertController, ViewController } from 'ionic-angular'

import { AreaManagerService } from '../../../services/app.area.manager'

export class SuperInventoryEditItemComponent implements OnInit {
  protected area_id: number = null
  protected newArea: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected viewCtrl: ViewController,
    protected _fb: FormBuilder,
    public alertCtrl: AlertController,
    public ts: TService,
    private areaManagerService: AreaManagerService) {

  }

  public ngOnInit(): void {

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

  public editItem(data: any, itemData: any) {
    if(this.newArea.valid){
      // TODO Funcionalidad para editar item
    }
  }
}