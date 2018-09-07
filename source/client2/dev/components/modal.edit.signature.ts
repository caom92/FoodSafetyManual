import { Component, Input } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ngx-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { StateService } from '@uirouter/angular'
import { ProgressModalComponent } from './modal.please.wait'

// Este componente describe el comportamiento del modal donde el usuario sube 
// una firma nueva para algun supervisor
@Component({
  templateUrl: '../templates/modal.edit.signature.html'
})
export class EditSignatureModalComponent extends MzBaseModal
{
  // Bandera que indica si el boton de edicion de firma estara habilitado o no
  disableSendButton: boolean = true

  // El ID del supervisor cuya firma va a ser editada
  @Input()
  supervisorID: number = null

  // El nombre del supervisor cuya firma va a ser editada
  @Input()
  supervisorName: string = null

  // El archivo de la imagen que sera subida 
  selectedFile: any = null

  // El constructor de este componente importa todos los servicios necesarios
  constructor(
    private langManager: LanguageService,
    private server: BackendService,
    private toastManager: ToastService,
    private router: StateService,
    private modalManager: MzModalService
  ) {
    super()
  }

  // Esta funcion se invoca cuando el usuario selecciona un archivo de imagen 
  // para subirla
  onFileSelected(event): void {
    // recuperamos el archivo elegido
    let files = event.srcElement.files

    // activamos el boton de envio si el usuario de hecho selecciono un archivo
    this.disableSendButton = files.length == 0

    // si el usuario subio un archivo, lo guardamos para su futuro uso
    if (files.length > 0) {
      this.selectedFile = files[0]
    }
  }

  // Esta funcion se invoca cuando el usuario hace clic en el boton que envia 
  // la imagen al servidor
  onSendButtonClick(): void {
    // preparamos los datos que seran enviados al servidor
    let data = new FormData()
    data.append('supervisor_id', this.supervisorID.toString())
    data.append('signature_file', this.selectedFile, this.selectedFile.name)

    // desplegamos el modal de espera
    let modal = this.modalManager.open(ProgressModalComponent)

    // enviamos los datos al servidor
    this.server.update(
      'add-signature',
      data,
      (response: any) => {
        // cuando el servidor responde, cerramos el modal de espera
        modal.instance.modalComponent.closeModal()

        // notificamos al usuario de la respuesta del servidor
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'add-signature',
            response.meta.return_code
          )
        )

        // si el servidor respondio de forma exitosa, recargamos la pagina
        // para reflejar los cambios
        if (response.meta.return_code == 0) {
          this.router.reload()
        }
      } // (response: any)
    ) // this.server.update
  } // onSendButtonClick(): void
} // export class EditSignatureModalComponent extends MzBaseModal