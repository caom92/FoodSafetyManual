import { OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { LogService } from '../../../services/log.service'
import { Language } from 'angular-l10n'

export abstract class SuperInventoryViewer implements OnInit {
  @Language() lang: string
  private inventorySuffix: string = ''
  private title: string = null

  constructor(private routeState: ActivatedRoute, private logService: LogService) {

  }

  public ngOnInit(): void {
    this.routeState.data.subscribe((data) => {
      this.inventorySuffix = data.suffix
      this.logService.manualUrl(this.inventorySuffix).then(success => {
        this.title = success.log_name
      }, error => {

      })
    })
  }
}