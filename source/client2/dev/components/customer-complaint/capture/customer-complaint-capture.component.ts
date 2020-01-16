import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { CustomerComplaintService } from '../../../services/customer-complaint.service'
import { CustomerComplaintForm } from '../log/customer-complaint-log.interface'

@Component({
  selector: 'customer-complaint-capture',
  templateUrl: './customer-complaint-capture.component.html'
})

export class CustomerComplaintCaptureComponent {
  @Language() lang: string
  newCustomerComplaint: boolean = null
  customerComplaintData: CustomerComplaintForm = null

  constructor(private customerComplaintService: CustomerComplaintService) {

  }

  public onOpenCustomerComplaint(event) {
    if (event === Number(event)) {
      this.customerComplaintService.authorization(event).then(success => {
        this.customerComplaintData = success
        this.newCustomerComplaint = true
      })
    } else {
      this.newCustomerComplaint = true
    }
  }

  public onCloseCustomerComplaint(event) {
    this.customerComplaintData = null
    this.newCustomerComplaint = null
  }
}