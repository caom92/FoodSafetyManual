import { OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'

import { BackendService } from '../../../services/app.backend'

export abstract class SuperInventoryViewer implements OnInit {
  private inventorySuffix: string = ''
  private title: string = ''

  constructor(private router: StateService, private server: BackendService) {

  }

  public ngOnInit(): void {
    this.inventorySuffix = this.router.current.data.suffix
    let logManualFormData = new FormData()
    logManualFormData.append('log-suffix', this.inventorySuffix)

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
  }
}