import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { CAPAReportInterface } from '../interface/capa-report.interface'

@Component({
  selector: 'capa-report',
  templateUrl: './capa-report.component.html'
})

export class CAPAReport implements OnInit {
  @Language() lang: string
  @Input() report: CAPAReportInterface
  @ViewChild('report_body') reportHTML: ElementRef

  constructor() {

  }

  public ngOnInit(): void {
    this.report.reference = this.report.reference.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.description = this.report.description.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.findings = this.report.findings.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.root_cause = this.report.root_cause.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.preventive_actions = this.report.preventive_actions.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.corrective_actions = this.report.corrective_actions.replace(/(?:\r\n|\r|\n)/g, '<br>')
    this.report.follow_up = this.report.follow_up.replace(/(?:\r\n|\r|\n)/g, '<br>')
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
    let temp = []

    if (this.report.images != null) {
      for (let image of this.report.images) {
        temp.push('http://localhost/espresso/data/capa/images/' + image.path)
      }
      return JSON.stringify(temp)
    }

    return ''
  }

  public getCSS(): string {
    return '<style>' + this.commonCSS() + '.fullColumn{width:640px}.smallHalfColumn{width:120px}.bigHalfColumn{width:200px}.smallFullColumn{width:240px}.bigFullColumn{width:400px}.boldText{font-weight:bold}.grayBackground{background-color:#c6c6c6}.centeredTitle{text-align:center;text-decoration:underline}.italicFont{font-style:italic}' + '</style>'
  }

  public commonCSS(): string {
    return 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
  }
}