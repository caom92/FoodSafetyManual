import { EventEmitter, Output } from '@angular/core'

import { LogService } from '../../../services/app.logs'
import { ToastsService } from '../../../services/app.toasts'
import { SuperLogComponent } from './super.logs.log'
import { SuperWaiting } from './super.logs.waiting.interface'

export abstract class SuperUpdateComponent extends SuperLogComponent {
  @Output() closeLog = new EventEmitter<any>()
  protected log: SuperWaiting

  constructor(protected logService: LogService, protected toasts: ToastsService) {
    super(logService, toasts)
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
      this.logService.update(this.captureForm.value, this.suffix).then(success => {
        this.enableForm()
        this.captureForm.markAsPristine()
      }, error => {
        this.enableForm()
      })
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toasts.showText('incompleteLog')
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