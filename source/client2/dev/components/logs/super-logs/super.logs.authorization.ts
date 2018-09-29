import { OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StateService } from '@uirouter/core'

import { LogService } from '../../../services/app.logs'
import { ToastsService } from '../../../services/app.toasts'
import { LogHeaderData } from '../log.interfaces'
import { SuperAuthorization } from './super.logs.authorization.interface'

export abstract class SuperAuthorizationComponent implements OnInit {
  protected log: SuperAuthorization
  protected captureForm: FormGroup = new FormBuilder().group({})
  private showLog: boolean = false
  private logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  private suffix: string = null

  constructor(protected _fb: FormBuilder, protected logService: LogService, protected toastService: ToastsService, private router: StateService) {

  }

  /**
   * Actualiza el encabezado y permite el despliegue de la bitácora. Es
   * importante recordar que, a diferencia del componente padre de las
   * bitácoras, los datos del servidor son obtenidos antes de crear al
   * componente, por lo que estos deben ser recibidos forzosamente como una
   * entrada usando @Input()
   * 
   * @memberof SuperAuthorizationComponent
   */

  public ngOnInit(): void {
    this.assignHeaderData()
    this.showLog = true
    setTimeout(function () {
      $('select').material_select()
    }, 200)
  }

  /**
   * Asigna la información de la bitácora para su despliegue en el LogHeader
   * 
   * @memberof SuperAuthorizationComponent
   */

  private assignHeaderData(): void {
    this.logHeaderData.created_by = this.log.created_by
    this.logHeaderData.date = this.log.creation_date
    this.logHeaderData.module_name = this.log.module_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.zone_name = this.log.zone_name
  }

  /**
   * Asigna el sufijo que identifica a la bitácora, necesario para llamar a los
   * servicios correspondientes a la bitácora particular
   * 
   * @param {string} suffix 
   * @memberof SuperAuthorizationComponent
   */

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Inicializa el FormGroup de la bitácora. Esta función debe llamarse al
   * inicializar el componente y tras haber obtenido los datos de la bitácora
   * del servidor
   * 
   * @memberof SuperAuthorizationComponent
   */

  public abstract initForm(): void

  /**
   * Antes de enviar los datos al servidor, los controles del formulario que
   * no deban ser envíados (p. ej. aquellos que sean opcionales y estén vacíos
   * al momento del envío) deben ser desactivados. Por defecto, no se realiza
   * ninguna acción
   *
   * @memberof SuperAuthorizationComponent
   */

  public cleanForm(): void { }

  /**
   * Tras haber enviado los datos (independientemente si fueron recibidos y
   * almacenados con éxito), el formulario debe ser reactivado, tomando en
   * cuenta las condiciones en que se encontraba justo antes de desactivar sus
   * campos con cleanForm() (p. ej. no se deben reactivar todos los campos, solo
   * aquellos que de por si estaban activados)
   *
   * @memberof SuperAuthorizationComponent
   */

  public enableForm(): void { }

  /**
   * Realiza la actualización de la bitácora, invocando al servicio de
   * bitácoras.
   * 
   * @memberof SuperAuthorizationComponent
   */

  public save(): void {
    this.cleanForm()
    if (this.captureForm.valid) {
      this.logService.update(this.captureForm.value, 'update-' + this.suffix).then(success => {
        this.captureForm.markAsPristine()
        this.enableForm()
      }, error => {
        this.enableForm()
      })
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toastService.showText('incompleteLog')
    }
  }

  public authorize(): void {
    this.logService.approve(Number(this.log.report_id)).then(success => {
      this.router.go('pending-authorizations-list')
    }, error => {
      console.log(error)
    })
  }

  public delete(): void {
    this.logService.reject(Number(this.log.report_id)).then(success => {
      this.router.go('pending-authorizations-list')
    }, error => {
      console.log(error)
    })
  }

  public back(): void {
    this.router.go('pending-authorizations-list')
  }

  public resolveString(input: string | number): string {
    return this.logService.resolveBackendString(input)
  }

  public resolveNumber(input: string | number): number {
    return this.logService.resolveBackendNumber(input)
  }

  public resolveBoolean(input: string | number): boolean {
    return this.logService.resolveBackendBoolean(input)
  }

  public resolveCheckbox(input: string | number): boolean {
    return this.logService.resolveBackendCheckboxBoolean(input)
  }
}