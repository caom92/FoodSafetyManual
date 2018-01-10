import { Component, Input } from '@angular/core'

import { MzBaseModal, MzModalComponent, MzButtonDirective } from 'ng2-materialize'

import { AlertOptions } from './app.alert.interface'

@Component({
  selector: "alert-component",
  templateUrl: "./app.alert.component.html"
})

export class AlertComponent extends MzBaseModal {
  @Input() options: AlertOptions

  constructor(){
    super()
  }

  btnClick(button: any) {
    if (button.handler) {
      // a handler has been provided, execute it
      // pass the handler the values from the inputs
      button.handler()
      //if (button.handler(this.getValues()) === false) {
        // if the return value of the handler is false then do not dismiss
      //}
    }
  }
}