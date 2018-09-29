import { HttpClient } from '@angular/common/http'
import { Component, Input, OnChanges } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './manual.component.html',
  selector: 'manual'
})

export class ManualComponent implements OnChanges {
  @Language() lang: string
  @Input() manual: string
  dataUrl: SafeResourceUrl
  loadingPDF: boolean = true
  errorPDF: boolean = false

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  public ngOnChanges(): void {
    this.loadPDF()
  }

  public loadPDF() {
    this.loadingPDF = true
    this.errorPDF = false
    if (this.manual == String(this.manual)) {
      this.http.get(this.manual, { responseType: "blob" }).map(response => {
        let reader = new FileReader()
        reader.onload = (event: any) => {
          this.dataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result)
          setTimeout(() => {
            this.errorPDF = false
            this.loadingPDF = false
          })
        }
        reader.readAsDataURL(response)
      }).catch((error: any, caught: Observable<void>) => {
        this.errorPDF = true
        this.loadingPDF = false
        return []
      }).subscribe()
    }
  }
}