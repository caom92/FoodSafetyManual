import { OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { LogService } from '../../../services/log.service'

export class SuperCapture implements OnInit, OnDestroy {
  @Language() lang: string
  log_name: string = 'Loading...'
  suffix: string = ''
  manualSrc: string
  isEmployee: boolean = false
  zoneChange: Subscription
  
  constructor(private routeState: ActivatedRoute, protected logService: LogService, private events: PubSubService) {
    
  }

  public getManual(): void {
    this.logService.manualUrl(this.suffix).then(success => {
      this.log_name = success.log_name
      this.manualSrc = 'http://localhost/espresso/' + success.manual_location + localStorage.getItem('zone_name').toLowerCase() + '/actual_manual.pdf?time=' + Date.now()
    }, error => {
        
    })
  }

  public ngOnInit(): void {
    this.isEmployee = localStorage.getItem('role_name') == 'Employee'

    this.routeState.data.subscribe((data) => {
      this.suffix = data.suffix
      this.getManual()

      this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
        this.getManual()
      })
    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}