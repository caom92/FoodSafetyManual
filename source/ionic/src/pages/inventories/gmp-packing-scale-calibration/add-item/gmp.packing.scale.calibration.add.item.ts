import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'

import { Platform, NavParams, ViewController } from 'ionic-angular'

import { InventoryItem } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { BackendService } from '../../../../services/app.backend'

@Component({
  selector: 'gmp-packing-scale-calibration-add-item',
  templateUrl: './gmp.packing.scale.calibration.add.item.html',
  providers: [
    BackendService
  ]
})

export class GMPPackingScaleCalibrationAddItemComponent implements OnInit {
  types: Array<any> =[]

  newItem: FormGroup = new FormBuilder().group({})

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, private _fb: FormBuilder, public server: BackendService){

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
      let data: {type:number, item:InventoryItem} = {type:this.newItem.value.type,item:{ id: 0, is_active: 1, name: this.newItem.value.name, order: 0 }}
      let item = new FormData()
      item.append("type_id", "" + data.type)
      item.append("scale_name", data.item.name)
      this.server.update(
        'add-gmp-packing-scale-calibration',
        item,
        (response: any) => {
          data.item.id = response.data
          this.viewCtrl.dismiss(data)
        }
      )
    } else {
      console.log("New item not valid")
    }
  }
}