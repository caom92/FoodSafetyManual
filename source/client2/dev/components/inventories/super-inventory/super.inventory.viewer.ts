import { OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../services/app.backend'

export abstract class SuperInventoryViewer implements OnInit {
  private inventorySuffix: string = ''
  private title: string = ''

  constructor(private routeState: ActivatedRoute, private server: BackendService) {

  }

  public ngOnInit(): void {
    this.routeState.data.subscribe((data) => {
      this.inventorySuffix = data.suffix
      let logManualFormData = new FormData()
      logManualFormData.append('suffix', this.inventorySuffix)

      this.server.update(
        'get-log-manual-url',
        logManualFormData,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              this.title = response.data.log_name
            }
          } else {
            this.title = 'Loading...'
          }
        }
      )
    })
  }
}