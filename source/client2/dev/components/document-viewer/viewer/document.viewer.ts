import { Component } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { StateService } from '@uirouter/angular'

@Component({
  selector: 'document-viewer',
  templateUrl: 'document.viewer.html'
})

export class DocumentViewerComponent {
  fileAddress: SafeResourceUrl

  constructor(private sanitizer: DomSanitizer, private router: StateService) {
    
  }

  ngOnInit() {
    this.fileAddress = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/espresso/data/menu/pdf/' + this.router.params.path)
  }
}