import { Component } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'document-viewer',
  templateUrl: 'document.viewer.html'
})

export class DocumentViewerComponent {
  fileAddress: SafeResourceUrl

  constructor(private sanitizer: DomSanitizer, private routeState: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.routeState.paramMap.subscribe((params) => {
      this.fileAddress = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/espresso/data/menu/pdf/' + params.get('path') + '.pdf')
    })
  }
}