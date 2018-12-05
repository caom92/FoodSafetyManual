import { LogService } from '../../../services/app.logs'
import { ToastsService } from '../../../services/app.toasts'
import { SuperLogComponent } from './super.logs.log'
import { SuperWaiting } from './super.logs.waiting.interface'

export abstract class SuperUpdateComponent extends SuperLogComponent {
  protected log: SuperWaiting

  constructor(protected logService: LogService, protected toasts: ToastsService) {
    super(logService, toasts)
  }

  public save(): void {
    if (this.log.report_id === Number(this.log.report_id)) {
      this.update()
      console.log('existing log, should be updated')
    } else {
      super.save()
      console.log('new log, should be saved')
    }
  }

  public update(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      this.logService.update(this.captureForm.value, this.suffix).then(success => {
        this.enableForm()
      }, error => {
        this.enableForm()
      })
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toasts.showText('incompleteLog')
    }
  }
}