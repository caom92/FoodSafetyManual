import { Component, Type } from '@angular/core'

import { MzModalService, MzBaseModal } from 'ng2-materialize'

import { AlertComponent } from './app.alert.component'
import { ComponentRef } from '@angular/core/src/linker/component_factory';

export class AlertController extends MzModalService {
  create(options?: any): ComponentRef<MzBaseModal>{
    if(options != undefined && options != null){
      return super.open(AlertComponent, {options: options})
    } else {
      return super.open(AlertComponent)
    }
  }
}