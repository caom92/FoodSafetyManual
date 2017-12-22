import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-scale-calibration-add-item',
  templateUrl: './gmp.packing.scale.calibration.add.item.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingScaleCalibrationAddItemComponent implements OnInit {
  types: Array<any> =[]

  newItem: FormGroup = new FormBuilder().group({})

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public ts: TService, private _fb: FormBuilder, public server: BackendService, private toastService: ToastService, public loaderService: LoaderService){

  }

  ngOnInit(){
    this.types = this.params.get("type_array")
    this.newItem = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      type: [null,[Validators.required]]
    })
    console.log("Modal inicializado")
    console.log(this.types)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addItem(){
    if(this.newItem.valid){
      let loaderAdd = this.loaderService.koiLoader("")
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_item"),
        message: this.ts.translate("Messages.add_item") + "<br><br>" + this.newItem.value.name,
        buttons: [
          {
          text: this.ts.translate("Options.cancel"),
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text:  this.ts.translate("Options.accept"),
            handler: () => {
              loaderAdd.present()
              let data: {type:number, item:InventoryItem} = {type:this.newItem.value.type,item:{ id: 0, is_active: 1, name: this.newItem.value.name, order: 0 }}
              let item = new FormData()
              item.append("type_id", "" + data.type)
              item.append("scale_name", data.item.name)
              this.server.update(
                'add-gmp-packing-scale-calibration',
                item,
                (response: any) => {
                  if(response.meta.return_code == 0){
                    data.item.id = response.data
                    loaderAdd.dismiss()
                    this.toastService.showText("itemAddSuccess")
                    this.viewCtrl.dismiss(data)
                  }
                },
                (error: any, caught: Observable<void>) => {
                  loaderAdd.dismiss()
                  this.toastService.showText("serverUnreachable")
                  return []
                }
              )
            }
          }
        ]
      })
      confirmAdd.present()
      
      /*this.server.update(
        'add-gmp-packing-scale-calibration',
        item,
        (response: any) => {
          data.item.id = response.data
          this.viewCtrl.dismiss(data)
        }
      )*/
    } else {
      console.log("New item not valid")
    }
  }
}