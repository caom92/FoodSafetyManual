import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { WorkOrderService } from '../../../services/work-order.service'
import { WorkOrderForm } from '../log/work-order-log.interface'

@Component({
  selector: 'work-order-capture',
  templateUrl: './work-order-capture.component.html'
})

export class WorkOrderCaptureComponent {
  @Language() lang: string
  newWorkOrder: boolean = null
  workOrderData: WorkOrderForm = null

  constructor(private workOrderService: WorkOrderService) {

  }

  public onOpenWorkOrder(event) {
    if (event === Number(event)) {
      this.workOrderService.authorization(event).then(success => {
        this.workOrderData = success
        this.newWorkOrder = true
      })
    } else {
      this.newWorkOrder = true
    }
  }

  public onCloseWorkOrder(event) {
    this.workOrderData = null
    this.newWorkOrder = null
  }
}