import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { Language, TranslationService as TService } from 'angular-l10n'

import { InventoryArea } from '../interfaces/gap.packing.preop.area.inventory.interface'

import { BackendService } from '../../../../services/app.backend'
import { ToastsService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gap-packing-preop-add-area',
  templateUrl: './gap.packing.preop.add.area.html',
  providers: [
    BackendService,
    ToastsService,
    LoaderService
  ]
})

export class GAPPackingPreopAddAreaComponent implements OnInit {
  @Language()
  lang: string

  newArea: FormGroup = new FormBuilder().group({})

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public ts: TService, private _fb: FormBuilder, public server: BackendService, private toastService: ToastsService, public loaderService: LoaderService){

  }

  ngOnInit(){
    this.newArea = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
    console.log("Modal inicializado")
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addItem(){
    if(this.newArea.valid){
      let loaderAdd = this.loaderService.koiLoader("")
      let confirmAdd = this.alertCtrl.create({
        title: this.ts.translate("Titles.add_item"),
        message: this.ts.translate("Messages.add_item") + "<br><br>" + this.newArea.value.name,
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
              let data: {area:InventoryArea} = {area:{ id: 0, name: this.newArea.value.name, position: 0 }}
              let item = new FormData()
              item.append("area_name", data.area.name)
              this.server.update(
                'add-workplace-area-gap-packing-preop',
                item,
                (response: any) => {
                  if(response.meta.return_code == 0){
                    data.area.id = response.data.id
                    data.area.position = response.data.position
                    loaderAdd.dismiss()
                    this.toastService.showText("areaAddSuccess")
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