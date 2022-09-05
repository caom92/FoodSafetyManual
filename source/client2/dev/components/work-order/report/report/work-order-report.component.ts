import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { WorkOrderReportInterface } from '../interface/work-order-report.interface'

@Component({
  selector: 'work-order-report',
  templateUrl: './work-order-report.component.html'
})

export class WorkOrderReport implements OnInit {
  @Language() lang: string
  @Input() report: WorkOrderReportInterface
  @ViewChild('report_body') reportHTML: ElementRef

  constructor() {

  }

  public ngOnInit(): void {
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
    return ''
  }

  public getCSS(): string {
    return '<style>' + this.commonCSS() + '.fullColumn{width:640px}.smallHalfColumn{width:120px}.bigHalfColumn{width:200px}.smallFullColumn{width:240px}.bigFullColumn{width:400px}.boldText{font-weight:bold}.grayBackground{background-color:#c6c6c6}.centeredTitle{text-align:center;text-decoration:underline}.italicFont{font-style:italic}' + '</style>'
  }

  public commonCSS(): string {
    return 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
  }
}