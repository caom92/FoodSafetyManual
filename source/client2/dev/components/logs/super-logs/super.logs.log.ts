import { OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { LogService } from '../../../services/app.logs'
import { ToastsService } from '../../../services/app.toasts'
import { LogDetails, LogHeaderData } from '../log.interfaces'
import { SuperLog } from './super.logs.log.interface'

export class SuperLogComponent implements OnInit {
  protected log: SuperLog
  public logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  public captureForm: FormGroup = new FormBuilder().group({})
  private suffix: string = null
  public showLog: boolean = false

  constructor(protected logService: LogService, protected toasts: ToastsService) {

  }

  /**
   * Inicializa el componente, recuperando los datos del servidor o del
   * almacenamiento local. Una vez recuperados, asigna esos datos a la bitácora
   * actual y actualiza el encabezado
   * 
   * @memberof SuperLogComponent
   */

  public ngOnInit(): void {
    this.logService.log(this.suffix).then(success => {
      this.log = success
      this.logHeaderData.zone_name = this.log.zone_name
      this.logHeaderData.program_name = this.log.program_name
      this.logHeaderData.module_name = this.log.module_name
      this.initForm()
      this.showLog = true
      console.error("init select")
      $('select').material_select()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos, ya que este caso se maneja
      // dentro del servicio de bitácoras
    })
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public initForm(): void {
    throw "Notify system developer: initForm() function must be overridden in child class for " + this.suffix
  }

  public resetForm(): void {
    throw "Notify system developer: resetForm() function must be overridden in child class for " + this.suffix
  }

  // Esta función es llamada antes de realizar el envío de datos. Dentro de la
  // misma, se deben de deshabilitar los controles del captureForm que no
  // se desean enviar (por ejemplo, cuando existen items marcados como "no
  // aceptables", es posible que no sea necesario enviar datos adicionales
  // referentes a acciones correctivas)
  public cleanForm(): void {

  }

  public save(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      // Información adicional, necesaria en el caso de que la bitácora no pueda
      // enviarse
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.captureForm.value, 'capture-' + this.suffix, logDetails).then(success => {
        this.resetForm()
      })
    } else {
      // Marcamos el formulario completo como "sucio" para que aparezcan los
      // mensajes de error en la vista donde sea pertinente
      this.logService.setAsDirty(this.captureForm)
      this.toasts.showText("incompleteLog")
    }
  }
}
