import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { CustomerComplaintReportInterface } from '../interface/customer-complaint-report.interface'

@Component({
  selector: 'customer-complaint-report',
  templateUrl: './customer-complaint-report.component.html'
})

export class CustomerComplaintReport implements OnInit {
  @Language() lang: string
  @Input() report: CustomerComplaintReportInterface
  @ViewChild('report_body') reportHTML: ElementRef

  constructor() {

  }

  public ngOnInit(): void {
    this.report.corrective_action = (this.report.corrective_action === String(this.report.corrective_action)) ? this.report.corrective_action.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''
    this.report.root_cause = (this.report.root_cause === String(this.report.root_cause)) ? this.report.root_cause.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''
    this.report.complaint_reason = (this.report.complaint_reason === String(this.report.complaint_reason)) ? this.report.complaint_reason.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''
    this.report.notes = (this.report.notes === String(this.report.notes)) ? this.report.notes.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''
  }

  public getPDFContent(): Object {
    return {
      body: this.reportHTML.nativeElement.outerHTML.replace(/\n/g, '').replace(/<!--(.*?)-->/g, '').replace(/>( *?)</g, '><').replace(/ng-reflect-(.*?)]"/g, '').replace(/ g[am]p(.*?)="" /g, ' ').replace(/([ ]+>)/g, '>')
    }
  }

  public getOrientation(): string {
    return 'P'
  }

  public getFontSize(): string {
    return '10'
  }

  public getImages(): string {
    return null
  }

  public getCSS(): string {
    return '<style>' + this.commonCSS() + '.fullColumn{width:630px}.productColumn{width:490px}.costColumn{width:70px}.quantityColumn{width:70px}.headerTitleColumn{width:120px}.headerColumn{width:510px}.secondaryHeaderTitleColumn{width:180px}.secondaryHeaderColumn{width:450px}.pseudoHeader{text-align:left;font-weight:bold;background-color:#4CAF50}.customerColumn{width:70px}.complaintDateColumn{width:100px}.salesOrderNumberColumn{width:70px}.accountManagerColumn{width:195px}.shippedToColumn{width:195px}.infoTitleColumn{width:400px}.infoColumn{width:230px}' + '</style>'
  }

  public commonCSS(): string {
    return 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
  }
}