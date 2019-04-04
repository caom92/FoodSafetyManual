import { Component, Injectable, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { MzBaseModal, MzModalComponent, MzModalService } from 'ngx-materialize'

@Injectable()
export class LoaderService {
  @Language() lang: string

  constructor(private modalService: MzModalService) {

  }

  public koiLoader(message: string = ''): LoaderWrapper {
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
    super()
  }

  public dismiss(): void {
    this.modalComponent.closeModal()
  }
}

export class LoaderWrapper {
  private loader: MzModalComponent

  public setLoader(loader: MzModalComponent): void {
    this.loader = loader
  }

  public dismiss(): void {
    this.loader.closeModal()
  }
}