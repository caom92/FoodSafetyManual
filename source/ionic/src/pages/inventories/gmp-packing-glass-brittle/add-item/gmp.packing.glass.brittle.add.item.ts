import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryItem } from '../interfaces/gmp.packing.glass.brittle.inventory.interface'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-glass-brittle-add-item',
  templateUrl: './gmp.packing.glass.brittle.add.item.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingGlassBrittleAddItemComponent implements OnInit {
  @Language()
  lang: string

  area_id: number = null

  newItem: FormGroup = new FormBuilder().group({})

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public ts: TService, private _fb: FormBuilder, public server: BackendService, private toastService: ToastService, public loaderService: LoaderService){

  }

  ngOnInit(){
    this.area_id = this.params.get("area_id")
    this.newItem = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      quantity: ["",[Validators.required]]
    })
    console.log("Modal inicializado")
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
              let data: {item:InventoryItem} = {item:{ id: 0, is_active: 1, name: this.newItem.value.name, order: 0, quantity: this.newItem.value.quantity }}
              let item = new FormData()
              item.append("name", data.item.name)
              item.append("area_id", "" + this.area_id)
              item.append("quantity", "" + data.item.quantity)
              this.server.update(
                'add-gmp-packing-glass-brittle',
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
    } else {
      console.log("New item not valid")
    }
  }
}