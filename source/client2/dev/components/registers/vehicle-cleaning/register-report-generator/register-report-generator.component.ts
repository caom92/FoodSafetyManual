import { Component, ElementRef, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportRequest } from '../../../../components/reports/reports.interface'

@Component({
  selector: 'register-report-generator',
  templateUrl: './register-report-generator.component.html'
})

export class RegisterReportGeneratorComponent {
  @Language() private lang: string
  @Input() reportHTML: ElementRef
  @Input() name: { en: string, es: string }
  @Input() footer: string
  private reportRequest: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }

  constructor() { }

  public requestPDFReport(): void {
    this.reportRequest = {
      /*lang: this.lang,
      content: JSON.stringify([this.reportComponent.getPDFContent()]),
      style: this.reportComponent.getCSS(),
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: this.reportComponent.getOrientation(),
      footer: '',
      supervisor: '',
      signature: '',
      subject: '',
      images: (this.reportComponent.getImages() == '') ? null : this.reportComponent.getImages(),
      fontsize: this.reportComponent.getFontSize()*/
      lang: this.lang,
      content: JSON.stringify([this.getPDFContent()]),
      style: '<style>' + this.getCSS() + '</style>',
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: 'L',
      footer: this.getPDFReportFooter(),
      supervisor: '',
      signature: '',
      subject: '',
      images: null,
      fontsize: '9'
    }
  }

  public getPDFContent(): any {
    return {
      header: this.getPDFReportHeader(),
      body: this.getPDFReportBody().
        replace(/\n/g, ''). // remove linebreaks
        replace(/<!--(.*?)-->/g, ''). // remove any comments from HTML code, since TCPDF has no use for them
        replace(/>( *?)</g, '><'). // remove blank space between brackets; TCPDF ignores it
        replace(/ng-reflect-(.*?)="(.*?)"/g, ''). // remove any Angular parameters in HTML, since TCPDF has no use for them
        replace(/ g[am]p(.*?)="" /g, ' '). // remove angular selectors
        replace(/([ ]+>)/g, '>') // remove blankspace at the end of HTML tags
    }
  }

  public getPDFReportBody(): string {
    return this.reportHTML.nativeElement.outerHTML
  }

  public getPDFReportHeader(): string {
    return '<div style="font-size:18px;font-weight:bold;">' + this.name[this.lang] + '</div>'
  }

  public getPDFReportFooter(): string {
    return this.footer
    //return '<div style="width:100%; text-align: center;"><table style="width:100%; margin: auto;"><tr style="border:1px solid black;"><td style="border:1px solid black;">Procedimiento/SOP</td><td style="border:1px solid black;"></td><td style="border-left:1px solid black; border-right:1px solid black;"></td><td style="border:1px solid black;">Nombre del Producto/Product Name</td><td style="border:1px solid black;">Formulación/Formulation</td></tr><tr style="border:1px solid black;"><td style="border:1px solid black;">Desinfectante/Sanitizer</td><td style="border:1px solid black;"></td><td style="border-left:1px solid black; border-right:1px solid black;"></td><td style="border:1px solid black;">Multicloro/Multi-Chlor</td><td style="border:1px solid black;">1 oz cloro/5 gal agua - 1 oz chlorine/5 gal water</td></tr><tr style="border:1px solid black;"><td style="border:1px solid black;">Enjuagar/Rinse</td><td style="border:1px solid black;"></td><td style="border-left:1px solid black;"></td><td style="border-top:1px solid black;border-bottom:1px solid black;"></td><td style="border-top:1px solid black;border-bottom:1px solid black;"></td></tr><tr style="border:1px solid black;"><td style="border:1px solid black;" colspan="5">1. Sigue las instrucciones de la botella de tiras reactivas para hacer la revision del nivel de ppm de cloro. Follow the directions on the test strip bottle to check the ppm chlorine level.</td></tr><tr style="border:1px solid black;"><td style="border:1px solid black;" colspan="5">2. Aplique aceite mineral sobre las superficies metálicas de la herramienta para evitar la oxidación. Apply mineral oil to the metal surfaces of the tool to prevent rust.</td></tr></table></div>'
  }

  public getCSS(): string {
    const base = 'table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}td{border:1px solid #000;text-align:left}th{border:1px solid #000;text-align:left;font-weight:bold;background-color:#4CAF50}'
    const tableWidth = '.dateColumn{width:70px}.plateColumn{width:70px}.disinfectionColumn{width:75px}.waterColumn{width:75px}.conditionsColumn{width:75px}.contaminationColumn{width:75px}.actionColumn{width:250px}.initialsColumn{width:60px}.signatureColumn{width:70px}.gpSignatureColumn{width:80px}.zoneColumn{width:40px}'
    const signatures = '.signature-cell{height:20px;display:block;margin-left:auto;margin-right:auto;}.signature-button{color:white;}.pending-cell{color:white;}.approved-register{color:blue;text-align:center;}'
    return base + tableWidth + signatures
  }
}