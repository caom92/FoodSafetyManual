import { Component, Input, OnInit } from '@angular/core'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ngx-materialize'
import { LanguageService } from '../services/app.language'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BackendService } from '../services/app.backend'
import { ToastService } from '../services/app.toast'
import { ActivatedRoute } from '@angular/router'
import { ProgressModalComponent } from './modal.please.wait'
import { HomeElementsService } from '../services/app.home'

// Este componente describe el comportamiento del modal donde el usuario edita 
// los datos de una zona o sube una zona completamente nueva
@Component({
  templateUrl: '../templates/modal.zone.info.html'
})
export class ZoneInfoModalComponent extends MzBaseModal implements OnInit
{
  // El ID de la zona cuyos datos van a ser editados
  @Input()
  zoneID: number = null

  // El nombre de la zona
  @Input()
  zoneName: string = null

  // El nombre de la compañia que la zona esta representando
  @Input()
  companyName: string = null

  // La direccion de la compañia
  @Input()
  address: string = null

  // Interfaz que representa el formulario donde se capturan los datos de la 
  // zona
  zoneInfoForm: FormGroup = null

  // El archivo de imagen elegido para el logo de la compañia
  selectedFile: any = null

  // El constructor de este componente importa todos los servicios necesarios
  constructor(
    private langManager: LanguageService,
    private server: BackendService,
    private toastManager: ToastService,
    private routeState: ActivatedRoute,
    private modalManager: MzModalService,
    private formBuilder: FormBuilder,
    private home: HomeElementsService
  ) {
    super()
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    // configuramos las reglas de validacion del formulario de captura
    this.zoneInfoForm = this.formBuilder.group({
      zoneName: [ this.zoneName, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ])],
      companyName: [ this.companyName, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      address: [ this.address, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])]
    })
  }

  // Esta funcion se invoca cuando el usuario hace clic en el boton de enviar 
  // los datos de la zona al servidor
  onSendZoneInfoButtonClick(): void {
    // revisamos si el ID de la zona fue proporcionado al invocar el modal
    if (this.zoneID != null) {
      // si el ID de la zona fue proporcionado, quiere decir que el usuario 
      // desea modificar los datos de una zona existente

      // preparamos los datos que seran enviados al servidor
      let data = new FormData()
      data.append('zone_id', this.zoneID.toString())
      data.append('zone_name', this.zoneInfoForm.controls['zoneName'].value)
      data.append(
        'company_name', this.zoneInfoForm.controls['companyName'].value
      )
      data.append(
        'company_address', this.zoneInfoForm.controls['address'].value
      )
      if (this.selectedFile != null) {
        data.append('logo', this.selectedFile, this.selectedFile.name)
      }

      // desplegamos el modal de espera
      let modal = this.modalManager.open(ProgressModalComponent)

      // enviamos los datos al servidor
      this.server.update(
        'edit-zone',
        data,
        (response: any) => {
          // notificamos al usuario de la respuesta recibida
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'edit-zone',
              response.meta.return_code
            )
          )

          // si el servidor respondio con exito...
          if (response.meta.return_code == 0) {
            // solicitamos al servidor la lista actualizada de zonas
            this.server.update(
              'list-zones',
              new FormData(),
              (response: any) => {
                // cuando el servidor responda, cerramos el modal de espera
                modal.instance.modalComponent.closeModal()

                // si el servidor respondio con exito, desplegamos la lista de 
                // zonas actualizada en pantalla
                if (response.meta.return_code == 0) {
                  this.home.zones = response.data.sort((a, b) => (a as any).name < (b as any).name ? -1 : (a as any).name > (b as any).name ? 1 : 0)
                } else {
                  // si el servidor respondio con error, notificamos al usuario
                  this.toastManager.showText(
                    this.langManager.getServiceMessage(
                      'list-zones',
                      response.meta.return_code
                    )
                  )
                } // if (response.meta.return_code == 0)
              } // (response: any)
            ) // this.server.update
          } else {
            // si el servidor respondio con error, cerramos el modal de espera
            modal.instance.modalComponent.closeModal()
          } // if (response.meta.return_code == 0)
        } // (response: any)
      ) // this.server.update
    } else {
      // si no fue proporcionado, significa que el usuario desea agregar una 
      // zona nueva

      // preparamos los datos que seran enviados al servidor
      let data = new FormData()
      data.append('new_zone', this.zoneInfoForm.controls['zoneName'].value)
      data.append(
        'company_name', this.zoneInfoForm.controls['companyName'].value
      )
      data.append(
        'company_address', this.zoneInfoForm.controls['address'].value
      )
      if (this.selectedFile != null) {
        data.append('logo', this.selectedFile, this.selectedFile.name)
      }

      // desplegamos el modal de espera
      let modal = this.modalManager.open(ProgressModalComponent)

      // enviamos los datos al servidor
      this.server.update(
        'add-zone',
        data,
        (response: any) => {
          // cuando el servidor responda, notificamos del resultado al usuario
          this.toastManager.showText(
            this.langManager.getServiceMessage(
              'add-zone',
              response.meta.return_code
            )
          )

          // si el servidor respondio con exito...
          if (response.meta.return_code == 0) {
            // solicitamos al servidor la lista actualizada de zonas
            this.server.update(
              'list-zones',
              new FormData(),
              (response: any) => {
                // cuando el servidor responda, cerramos el modal de espera
                modal.instance.modalComponent.closeModal()

                // si el servidor respondio con exito, desplegamos los datos 
                // actualizados en pantalla
                if (response.meta.return_code == 0) {
                  this.home.zones = response.data.sort((a, b) => (a as any).name < (b as any).name ? -1 : (a as any).name > (b as any).name ? 1 : 0)
                } else {
                  // si el servidor respondio con un error, notificamos al 
                  // usuario
                  this.toastManager.showText(
                    this.langManager.getServiceMessage(
                      'list-zones',
                      response.meta.return_code
                    )
                  )
                } // if (response.meta.return_code == 0)
              } // (response: any)
            ) // this.server.update
          } else {
            // si el servidor respondio con un error, cerramos el modal de 
            // espera
            modal.instance.modalComponent.closeModal()
          } // if (response.meta.return_code == 0)
        } // (response: any)
      ) // this.server.update
    } // if (this.zoneID != null)
  } // onSendZoneInfoButtonClick(): void

  // Esta funcion se invoca cuando el usuario selecciona un archivo de imagen 
  // para subir como logo
  onFileSelected(event: any): void {
    // recuperamos el archivo elegido
    let files = event.srcElement.files

    // si el usuario subio un archivo, lo guardamos para su futuro uso
    if (files.length > 0) {
      this.selectedFile = files[0]
    }
  } // onFileSelected(event: any): void
} // export class ZoneInfoModalComponent extends MzBaseModal implements OnInit