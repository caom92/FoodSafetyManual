import { EventEmitter, Output } from '@angular/core'

import { LogService } from '../../../services/log.service'
import { ToastsService } from '../../../services/toasts.service'
import { SuperLogComponent } from './super.logs.log'
import { SuperWaiting } from './super.logs.waiting.interface'

export abstract class SuperUpdateComponent extends SuperLogComponent {
  @Output() closeLog = new EventEmitter<any>()
  protected log: SuperWaiting

  constructor(protected logService: LogService, protected toastService: ToastsService) {
    super(logService, toastService)
  }

  public save(): void {
    if (this.log.report_id === Number(this.log.report_id)) {
      this.update()
    } else {
      super.save()
    }
  }

  public update(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      this.logService.update(this.suffix, this.captureForm.value).then(success => {
        this.enableForm()
        this.captureForm.markAsPristine()
      }, error => {
        this.enableForm()
      })
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toastService.showClientMessage('incomplete-log', 1)
    }
  }

  public finish(): void {
    this.logService.finish(this.log.report_id).then(success => {
      this.back()
    }, error => {

    })
  }

  public back(): void {
    this.closeLog.emit()
  }
}