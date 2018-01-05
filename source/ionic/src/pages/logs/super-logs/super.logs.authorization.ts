import { OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { SuperAuthorization } from './super.logs.authorization.interface'
import { LogService } from '../../../services/app.logs'
import { LogHeaderData } from '../log.interfaces'
import { ToastService } from '../../../services/app.toasts'

export class SuperAuthorizationComponent implements OnInit {
  protected log: SuperAuthorization
  protected captureForm: FormGroup = new FormBuilder().group({})
  public logHeaderData: LogHeaderData = { zone_name: null, program_name: null, module_name: null, date: null, created_by: null }
  
  private suffix: string = null
  protected showLog: boolean = false

  constructor(protected _fb: FormBuilder, protected logService: LogService, protected toastService: ToastService) {

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
  }

  /**
   * Asigna la información de la bitácora para su despliegue en el LogHeader
   * 
   * @memberof SuperAuthorizationComponent
   */

  assignHeaderData() {
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
   * inicializar el componente.
   * 
   * Dado que se trata de un formulario diferente para cada bitácora, esta
   * función debe redefinirse en las clases derivadas para funcionar
   * correctamente, caso contrario se lanza un error.
   * 
   * @memberof SuperAuthorizationComponent
   */

  public initForm(): void {
    throw "Notify system developer: initForm() function must be overridden in child class for " + this.suffix
  }

  /**
   * Realiza la actualización de la bitácora, invocando al servicio de
   * bitácoras.
   * 
   * @memberof SuperAuthorizationComponent
   */

  public save(): void {
    if (this.captureForm.valid) {
      this.logService.update(this.captureForm.value, 'update-' + this.suffix).then(success => {
        // Si la promesa regresa como valida, quiere decir que la bitácora fue enviada con éxito
      }, error => {
        // Caso contrario, se le notifica al usuario
      })
    } else {
      this.toastService.showText("incompleteLog")
    }
  }
}