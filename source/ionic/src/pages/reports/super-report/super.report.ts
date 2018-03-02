import { ReportHeader } from '../report-header/report.header.interface'
import { SuperReportInterface } from './super.report.interface'
import { OnInit } from '@angular/core'

export class SuperReportComponent implements OnInit {
  report: SuperReportInterface
  reportHTML: any
  header: ReportHeader = {
    zone: "",
    module: "",
    program: "",
    log: "",
    created_on: "",
    created_by: "",
    approved_on: "",
    approved_by: ""
  }

  constructor() {

  }

  public ngOnInit(): void {
    this.initHeader()
  }
  
  public initHeader(): void {
    this.header.zone = this.report.zone_name
    this.header.module = this.report.module_name
    this.header.program = this.report.program_name
    this.header.log = this.report.log_name
    this.header.created_on = this.report.creation_date
    this.header.created_by = this.report.created_by
    this.header.approved_on = this.report.approval_date
    this.header.approved_by = this.report.approved_by
  }

  public getPDFReportBody(): string {
    return this.reportHTML.nativeElement.outerHTML
  }

  public getOrientation(): string {
    // Orientación del reporte, por defecto es "P" (Portrait) pero puede redefinirse en los reportes hijo para usar "L" (Landscape),
    return "P"
  }

  public getImages(): string {
    // Por defecto, los reportes no devuelven imágenes. Es un caso particular de Doc Control y posiblemente otras bitácoras en el futuro
    return ""
  }

  public getFontSize(): string {
    return "10"
  }

  public getCSS(): string {
    throw "getCSS() function must be overridden in child class"
  }
}