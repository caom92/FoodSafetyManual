import { ComponentRef } from '@angular/core/src/linker/component_factory'
import { MzBaseModal, MzModalService } from 'ng2-materialize'

import { AlertComponent } from './app.alert.component'
import { AlertOptions } from './app.alert.interface'

export class AlertController extends MzModalService {
  create(options?: AlertOptions): ComponentRef<MzBaseModal>{
    if(options != undefined && options != null){
      return super.open(AlertComponent, {options: options})
    } else {
      return super.open(AlertComponent)
    }
  }
}