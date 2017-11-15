import { Component, Input, ViewChild, OnInit } from '@angular/core'

import { Language } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { InventoryArea } from '../interfaces/gmp.packing.preop.area.inventory.interface'

import { BackendService } from '../../../../services/app.backend'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-preop-area-inventory-area',
  templateUrl: './gmp.packing.preop.area.inventory.area.html',
  providers: [
    BackendService,
    ToastService,
    LoaderService
  ]
})

export class GMPPackingPreopAreaInventoryAreaComponent implements OnInit {
  @Input()
  area: InventoryArea

  @Language()
  lang: string

  constructor(public server: BackendService, public loaderService: LoaderService, private toastService: ToastService){

  }

  ngOnInit(){
    
  }

  editArea(){
    console.log("Edit Area")
  }
}