import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { CustomerComplaintService } from '../../../services/customer-complaint.service'
import { CustomerComplaintForm } from '../log/customer-complaint-log.interface'
import { CustomerComplaintListElement } from './customer-complaint-list.interface'

@Component({
  selector: 'customer-complaint-list',
  templateUrl: './customer-complaint-list.component.html'
})

export class CustomerComplaintList implements OnInit, OnDestroy {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startCustomerComplaint = new EventEmitter<number | boolean>()
  zoneChange: Subscription
  protected customerComplaintList: Array<CustomerComplaintListElement> = []
  protected waitingCustomerComplaint: CustomerComplaintForm = null

  constructor(private customerComplaintService: CustomerComplaintService, private events: PubSubService) {

  }

  public ngOnInit(): void {
    this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
      this.onZoneChange()
    })

    this.onZoneChange()
  }

  public onCustomerComplaintOpen(id: number | boolean) {
    if (id === Number(id)) {
      this.startCustomerComplaint.emit(id)
    } else {
      this.startCustomerComplaint.emit(true)
    }
  }

  public onCustomerComplaintClose(): void {
    this.waitingCustomerComplaint = null
  }

  public onZoneChange(): void {
    this.customerComplaintService.listWaitingLogs().then(success => {
      this.customerComplaintList = success
    }, error => {

    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}