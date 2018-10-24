import { HttpClient } from '@angular/common/http'
import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs'

import { LogService } from '../../../services/app.logs'

@Component({
  selector: 'manual',
  templateUrl: './manual.component.html'
})

export class ManualComponent implements OnInit, OnChanges {
  @Language() lang: string
  @Input() manual: string
  @Input() suffix: string
  dataUrl: SafeResourceUrl
  previewUrl: SafeResourceUrl
  loadingPDF: boolean = true
  errorPDF: boolean = false
  canUpload: boolean = false
  uploadActive: boolean = false
  filePDF: FileList = null

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private logService: LogService) {

  }

  public ngOnInit(): void {
    const role = localStorage.getItem('role_name')
    this.canUpload = role == 'Supervisor' || role == 'Manager' || role == 'Director'
  }

  public ngOnChanges(): void {
    if (this.manual != undefined) {
      this.loadPDF()
    }
  }

  public loadPDF(): void {
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

  public onPDFFileSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.filePDF = event.target.files
      let reader = new FileReader()
      reader.onload = (event: any) => {
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result)
      }
      reader.readAsDataURL(event.target.files[0])
    } else {
      this.filePDF = null
    }
  }

  public enableUpload(): void {
    this.uploadActive = true
  }

  public disableUpload(): void {
    this.uploadActive = false
  }

  public uploadPDF(): void {
    this.logService.uploadManual(this.suffix, this.filePDF).then(success => {
      this.disableUpload()
      this.loadPDF()
      this.previewUrl = null
    }, error => {
      
    })
  }
}