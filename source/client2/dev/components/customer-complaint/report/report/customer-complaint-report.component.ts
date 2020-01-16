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
    //this.report.reference = (this.report.reference === String(this.report.reference)) ? this.report.reference.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''
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
    return '<style>' + this.commonCSS() + '</style>'
  }

  public commonCSS(): string {
    return 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
  }
}