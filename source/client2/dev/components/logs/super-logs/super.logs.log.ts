import { OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'

import { LogService } from '../../../services/app.logs'
import { ToastsService } from '../../../services/app.toasts'
import { LogDetails, LogHeaderData } from '../log.interfaces'
import { SuperLog } from './super.logs.log.interface'
import { SuperWaiting } from './super.logs.waiting.interface'

export abstract class SuperLogComponent implements OnInit {
  protected log: SuperLog
  public logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  public captureForm: FormGroup = new FormBuilder().group({})
  protected suffix: string = null
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
    if (this.log == null) {
      this.logService.log(this.suffix).then(success => {
        this.log = success
        this.logHeaderData.zone_name = this.log.zone_name
        this.logHeaderData.program_name = this.log.program_name
        this.logHeaderData.module_name = this.log.module_name
        this.initForm()
        this.showLog = true
        setTimeout(function () {
          $('select').material_select()
        }, 200)
      }, error => {

      }) 
    } else {
      // TODO En este caso, los datos de la bitácora son recibidos como
      // un input del elemento HTML
      this.showLog = true
      this.logHeaderData.zone_name = this.log.zone_name
      this.logHeaderData.program_name = this.log.program_name
      this.logHeaderData.module_name = this.log.module_name
      this.logHeaderData.created_by = (<SuperWaiting>this.log).created_by
      this.logHeaderData.date = (<SuperWaiting>this.log).creation_date
      this.initForm()
      setTimeout(function () {
        $('select').material_select()
      }, 200)
    }
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Inicializa los campos del formulario de la bitácora
   *
   * @abstract
   * @memberof SuperLogComponent
   */
  public abstract initForm(): void

  /**
   * Reinicia los valores de todos los campos de la bitácora a su valor inicial
   * tras un envío exitoso
   *
   * @abstract
   * @memberof SuperLogComponent
   */
  public abstract resetForm(): void

  // Esta función es llamada antes de realizar el envío de datos. Dentro de la
  // misma, se deben de deshabilitar los controles del captureForm que no
  // se desean enviar (por ejemplo, cuando existen items marcados como "no
  // aceptables", es posible que no sea necesario enviar datos adicionales
  // referentes a acciones correctivas)
  public cleanForm(): void { }

  // Esta función es llamada posteriormente a enviar los datos, y puede ser
  // considerada como una contraparte a cleanForm(); su propósito es rehabilitar
  // los campos desactivados por cleanForm();, que normalmente son desactivados
  // únicamente con el propósito de no ser enviados, pero que en caso de un
  // error de cualquier índole, deben permanecer habilitados para la edición del
  // usuario, P.Ej., campos opcionales
  public enableForm(): void { }

  public disableControl(control: AbstractControl, condition?: boolean): void {
    if (condition == true || condition == undefined) {
      control.disable()
    }
  }

  public enableControl(control: AbstractControl, condition?: boolean): void {
    if (condition == true || condition == undefined) {
      control.enable()
    }
  }

  public save(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      // Información adicional, necesaria en el caso de que la bitácora no pueda
      // enviarse
      let logDetails: LogDetails = { zone_name: this.log.zone_name, program_name: this.log.program_name, module_name: this.log.module_name, log_name: this.log.log_name }
      this.logService.send(this.captureForm.value, this.suffix, logDetails).then(success => {
        this.resetForm()
        this.enableForm()
      }, error => {
        this.enableForm()
      })
    } else {
      // Marcamos el formulario completo como "sucio" para que aparezcan los
      // mensajes de error en la vista donde sea pertinente
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toasts.showText('incompleteLog')
    }
  }
}
