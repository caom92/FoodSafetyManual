import { Component, Injectable, OnInit } from '@angular/core'

import { MzBaseModal, MzModalService } from 'ng2-materialize'

import { Language, TranslationService as TService } from 'angular-l10n'

@Injectable()
export class LoaderService implements OnInit {
  @Language() lang: string

  constructor(private modalService: MzModalService) {

  }

  ngOnInit() {

  }

  koiLoader(message) {
    let loading = this.modalService.open(KoiLoader)

    return loading
  }
}

@Component({
  templateUrl: './custom_modals/koi.loader.html'
})

export class KoiLoader extends MzBaseModal {
  modalOptions = {
    dismissible: false
  }

  constructor() {
    super() // invocamos el constructor de la clase padre
  }

  public dismiss() {
    this.modalComponent.close()
  }
}