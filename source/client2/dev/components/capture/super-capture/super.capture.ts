import { OnDestroy, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { BackendService } from '../../../services/app.backend'

export class SuperCapture implements OnInit, OnDestroy {
  @Language() lang: string
  log_name: string = 'Loading...'
  suffix: string = ''
  manualSrc: string
  manualDirectory: SafeResourceUrl = null
  isEmployee: boolean = false
  zoneChange: Subscription
  
  constructor(private routeState: ActivatedRoute, private server: BackendService, private sanitizer: DomSanitizer, private events: PubSubService) {
    
  }

  public getManual(): void {
    let logManualFormData = new FormData()
    logManualFormData.append('suffix', this.suffix)

    this.server.update(
      'get-log-manual-url',
      logManualFormData,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.log_name = response.data.log_name
            this.manualSrc = 'http://localhost/espresso/' + response.data.manual_location + localStorage.getItem('zone_name').toLowerCase() + '/actual_manual.pdf?time=' + Date.now()
            this.manualDirectory = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost/espresso/' + response.data.manual_location + 'law/actual_manual.pdf?time=' + Date.now())
          }
        }
      }
    )
  }

  public ngOnInit(): void {
    this.routeState.data.subscribe((data) => {
      this.suffix = data.suffix
      
      this.isEmployee = localStorage.getItem('role_name') == 'Employee'

      this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
        this.getManual()
      })

      this.getManual()
    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}