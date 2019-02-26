import { OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CustomValidators } from '../../../directives/custom.validators'
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

  constructor(protected _fb: FormBuilder, protected logService: LogService, protected toastService: ToastsService, private routeState: ActivatedRoute, private router: Router) {

  }

  public ngOnInit(): void {
    this.routeState.paramMap.subscribe((params) => {
      let reportID = params.get('report_id')
      this.logService.authorization(this.suffix, Number(reportID)).then(success => {
        this.log = success
        this.assignHeaderData()
        this.initForm()
        this.showLog = true
        setTimeout(function () {
          $('select').material_select()
        }, 200)
      }, error => {

      })
    })
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
   * Inicializa el FormGroup con los elementos comunes a todas las bitácoras de
   * autorización. Esta función debe llamarse al inicio de la reimplementación,
   * para después añadir los controles necesarios al FormGroup.
   * 
   * @memberof SuperAuthorizationComponent
   */

  public initForm(): void {
    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required]],
      date: [this.log.creation_date, [Validators.required, CustomValidators.dateValidator()]]
    })
  }

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
      this.logService.update(this.captureForm.value, this.suffix).then(success => {
        this.captureForm.markAsPristine()
        this.enableForm()
      }, error => {
        this.enableForm()
      })
    } else {
      this.logService.setAsDirty(this.captureForm)
      this.enableForm()
      this.toastService.showClientMessage('incomplete-log', 1)
    }
  }

  public authorize(): void {
    this.logService.approve(Number(this.log.report_id)).then(success => {
      this.router.navigate(['/pending-authorizations-list'])
    }, error => {
      console.log(error)
    })
  }

  public delete(): void {
    this.logService.reject(Number(this.log.report_id)).then(success => {
      this.router.navigate(['/pending-authorizations-list'])
    }, error => {
      console.log(error)
    })
  }

  public back(): void {
    this.router.navigate(['/pending-authorizations-list'])
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