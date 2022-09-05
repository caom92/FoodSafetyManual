import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { WorkOrderService } from '../../../services/work-order.service'
import { WorkOrderForm } from '../log/work-order-log.interface'
import { WorkOrderListElement } from './work-order-list.interface'

@Component({
  selector: 'work-order-list',
  templateUrl: './work-order-list.component.html'
})

export class WorkOrderList implements OnInit, OnDestroy {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startWorkOrder = new EventEmitter<number | boolean>()
  zoneChange: Subscription
  protected workOrderList: Array<WorkOrderListElement> = []
  protected waitingWorkOrder: WorkOrderForm = null

  constructor(private workOrderService: WorkOrderService, private events: PubSubService) {

  }

  public ngOnInit(): void {
    this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
      this.onZoneChange()
    })

    this.onZoneChange()
  }

  public onWorkOrderOpen(id: number | boolean) {
    if (id === Number(id)) {
      this.startWorkOrder.emit(id)
    } else {
      this.startWorkOrder.emit(true)
    }
  }

  public onWorkOrderClose(): void {
    this.waitingWorkOrder = null
  }

  public onZoneChange(): void {
    this.workOrderService.listWaitingLogs().then(success => {
      this.workOrderList = success
    }, error => {

    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}