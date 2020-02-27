import { ElementRef, OnInit, Input } from '@angular/core'
import { TranslationService } from 'angular-l10n'

import { ReportHeader } from '../report-common/report-header/report-header.interface'
import { Preview } from '../report-common/report-preview/report-preview.interface'
import { SuperReportInterface } from './super.report.interface'

export class SuperReportComponent implements OnInit {
  @Input() report: SuperReportInterface
  reportHTML: ElementRef
  header: ReportHeader = { zone: '', module: '', program: '', log: '', created_on: '', created_by: '', approved_on: '', approved_by: '' }

  constructor(private translationService: TranslationService) {

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
      approved_on: this.report.creation_date,
      approved_by: this.report.approved_by
    }
  }

  public getPDFContent() {
    return {
      header: this.getPDFReportHeader(),
      footer: this.getPDFReportFooter(),
      body: this.getPDFReportBody().
        replace(/\n/g, ''). // remove linebreaks
        replace(/<!--(.*?)-->/g, ''). // remove any comments from HTML code, since TCPDF has no use for them
        replace(/>( *?)</g, '><'). // remove blank space between brackets; TCPDF ignores it
        replace(/ng-reflect-(.*?)="(.*?)"/g, ''). // remove any Angular parameters in HTML, since TCPDF has no use for them
        replace(/ g[am]p(.*?)="" /g, ' '). // remove angular selectors
        replace(/([ ]+>)/g, '>') // remove blankspace at the end of HTML tags
    }
  }

  public getPDFReportHeader(): string {
    return '<table><tr><td>' + this.translationService.translate('ReportHeader.zone') + ': <span style="font-weight: bold;">' + this.report.zone_name + '</span><br>' + this.translationService.translate('ReportHeader.program') + ': <span style="font-weight: bold;">' + this.report.program_name + '</span><br>' + this.translationService.translate('ReportHeader.module') + ': <span style="font-weight: bold;">' + this.report.module_name + '</span><br>' + this.translationService.translate('ReportHeader.log') + ': <span style="font-weight: bold;">' + this.report.log_name + '</span></td><td>' + this.translationService.translate('ReportHeader.made_on') + ': <span style="font-weight: bold;">' + this.report.creation_date + '</span><br>' + this.translationService.translate('ReportHeader.made_by') + ': <span style="font-weight: bold;">' + this.report.created_by + '</span><br>' + this.translationService.translate('ReportHeader.approved_on') + ': <span style="font-weight: bold;">' + this.report.creation_date + '</span><br>' + this.translationService.translate('ReportHeader.approved_by') + ': <span style="font-weight: bold;">' + this.report.approved_by + '</span></td></tr></table>'
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

  public segmentCSS(): string {
    return null
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '</style>'
  }

  public commonCSS(): string {
    return 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
  }

  public getPreview(): Array<Preview> {
    return null
  }
}