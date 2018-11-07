import { Component, Injectable, OnInit, ComponentRef, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { MzBaseModal, MzModalService, MzModalComponent } from 'ngx-materialize'

@Injectable()
export class LoaderService implements OnInit {
  @Language() lang: string

  constructor(private modalService: MzModalService) {

  }

  ngOnInit() {

  }

  koiLoader(message: string = 'Connecting to Server') {
    let loading = this.modalService.open(KoiLoader, { message: message })
    let wrapper: LoaderWrapper = new LoaderWrapper()

    wrapper.setLoader(loading.instance.modalComponent)

    return wrapper
  }
}

@Component({
  templateUrl: './custom_modals/koi.loader.html'
})

export class KoiLoader extends MzBaseModal {
  @Language() lang: string
  @Input() message: string
  readonly modalOptions: Materialize.ModalOptions = {
    dismissible: false
  }

  constructor() {
    super() // invocamos el constructor de la clase padre
  }
  
  public dismiss(): void {
    this.modalComponent.closeModal()
  }
}

export class LoaderWrapper {
  private loader: MzModalComponent

  public setLoader(loader: MzModalComponent): void  {
    this.loader = loader
  }

  public present(): void {
    // método vacío para mantener compatibilidad con la versión de Ionic
  }

  public dismiss(): void {
    this.loader.closeModal()
  }
}