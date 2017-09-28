import { Component, OnInit, Input } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ng2-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { ProgressModalComponent } from './modal.please.wait'

// El componente del modal donde el usuario puede editar los pies de pagina de 
// una bitacora
@Component({
  templateUrl: '../templates/modal.edit.footers.html'
})
export class EditFooterModalComponent extends MzBaseModal implements OnInit
{
  // Interfaz del formulario donde se capturan los pies de paginad
  footerEditionForm: FormGroup

  // El ID de la bitacora cuyos pies de pagina seran editados
  @Input()
  footerID: number = null

  // El nombre de la zona cuyo pie de pagina sera editado
  @Input()
  zone: string = null

  // El nombre de la bitacora cuyo pie de pagina sera editado
  @Input()
  log: string = null

  // El pie de pagina que sera desplegado en el reporte PDF para la bitacora 
  // elegida
  @Input()
  footerPDF: string = null

  // El pie de pagina que sera desplegado en el reporte HTML para la bitacora 
  // elegida
  @Input()
  footerHTML: string = null

  // Constructor del componente donde importaremos una instancia del servicio 
  // de idioma
  constructor(
    private langManager: LanguageService,
    private formBuilder: FormBuilder,
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private modalManager: MzModalService
  ) {
    super() // invocamos el constructor de la clase padre
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    this.footerEditionForm = this.formBuilder.group({
      newFooterPDF: [ this.footerPDF, Validators.compose([
        Validators.required,
        Validators.maxLength(65535)
      ])],
      newFooterHTML: [ this.footerHTML, Validators.compose([
        Validators.required,
        Validators.maxLength(65535)
      ])]
    })
  }

  // Esta funcion se invoca cuando el boton de editar los pies de pagina es
  // presionado
  onFooterEditionFormSubmit(): void {
    // preparamos los datos que seran enviados al servidor
    let data = new FormData()
    data.append('footer_id', this.footerID.toString())
    data.append(
      'capture_form_footer', 
      this.footerEditionForm.controls['newFooterHTML'].value
    )
    data.append(
      'report_document_footer',
      this.footerEditionForm.controls['newFooterPDF'].value
    )

    // desplegamos el modal de trabajo en progreso
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor
    this.server.update(
      'edit-report-footers',
      data,
      (response: any) => {
        // cerramos el modal de espera
        modal.instance.modalComponent.close()

        // notificamos al usuario del resultado de la operacion
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'edit-report-footers',
            response.meta.return_code
          )
        )

        // si el servidor respondio con exito, refrescamos la pagina para 
        // mostrar los cambios realizados
        if (response.meta.return_code == 0) {
          this.router.reload()
        }
      } // (response: any)
    ) // this.server.update
  } // onFooterEditionFormSubmit()
} // export class EditFooterModalComponent extends MzBaseModal implements OnInit