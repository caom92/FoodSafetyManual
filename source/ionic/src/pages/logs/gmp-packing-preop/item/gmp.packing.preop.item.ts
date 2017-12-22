import { Component, Input, NgModule } from '@angular/core'
import { Storage } from '@ionic/storage'

import { Language } from 'angular-l10n'

import { FormGroup } from '@angular/forms'

@Component({
  selector: 'gmp-packing-preop-item',
  templateUrl: './gmp.packing.preop.item.html'
})

export class GMPPackingPreopItemComponent {
  @Input()
  item: {
    id: number,
    name: string,
    order: number
  }

  @Input()
  actions: Array<{
    en: string,
    es: string
  }>

  @Input('itemGroup') public itemForm: FormGroup

  @Language() lang: string

  constructor(private storage: Storage) {

  }

  stringify(str: any){
    let val = JSON.stringify(str)
    return val
  }

  onChange(){
    console.log(this.itemForm.value)
  }
}