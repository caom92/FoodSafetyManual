import { ElementRef, OnInit, Input } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { ReportHeader } from '../report-common/report-header/report-header.interface'
import { Preview } from '../report-common/report-preview/report-preview.interface'
import { SuperReportInterface } from './super.report.interface'

export class SuperReportComponent implements OnInit {
  @Input() report: SuperReportInterface
  reportHTML: ElementRef
  header: ReportHeader = { zone: '', module: '', program: '', log: '', created_on: '', created_by: '', approved_on: '', approved_by: '' }

  constructor(private ts: TService) {

  }

  public ngOnInit(): void {
    this.initHeader()
  }
  
  public initHeader(): void {
    this.header = {
      zone: this.report.zone_name,
      module: this.report.module_name,
      program: this.report.program_name,
      log: this.report.log_name,
      created_on: this.report.creation_date,
      created_by: this.report.created_by,
      approved_on: this.report.approval_date,
      approved_by: this.report.approved_by
    }
  }

  public getPDFContent() {
    return {
      header: this.getPDFReportHeader(),
      footer: this.getPDFReportFooter(),
      body: this.getPDFReportBody().replace(/\n/g, '').replace(/<!--(.*?)-->/g, '').replace(/>( *?)</g, '><')
    }
  }

  public getPDFReportHeader(): string {
    return '<table><tr><td>' + this.ts.translate('ReportHeader.zone') + ': ' + this.report.zone_name + '<br>' + this.ts.translate('ReportHeader.program') + ': ' + this.report.program_name + '<br>' + this.ts.translate('ReportHeader.module') + ': ' + this.report.module_name + '<br>' + this.ts.translate('ReportHeader.log') + ': ' + this.report.log_name + '</td><td>' + this.ts.translate('ReportHeader.made_on') + ': ' + this.report.creation_date + '<br>' + this.ts.translate('ReportHeader.made_by') + ': ' + this.report.created_by + '<br>' + this.ts.translate('ReportHeader.approved_on') + ': ' + this.report.approval_date + '<br>' + this.ts.translate('ReportHeader.approved_by') + ': ' + this.report.approved_by + '</td></tr></table>'
  }

  public getPDFReportBody(): string {
    return this.reportHTML.nativeElement.outerHTML
  }

  public getPDFReportFooter(): string {
    return ''
  }

  public getOrientation(): string {
    // Orientación del reporte, por defecto es "P" (Portrait) pero puede redefinirse en los reportes hijo para usar "L" (Landscape),
    return 'P'
  }

  public getImages(): string {
    // Por defecto, los reportes no devuelven imágenes. Es un caso particular de Doc Control y posiblemente otras bitácoras en el futuro
    return ''
  }

  public getFontSize(): string {
    return '10'
  }

  public getCSS(): string {
    throw 'getCSS() function must be overridden in child class'
  }

  public getPreview(): Array<Preview> {
    return null
  }
}