import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { CAPAService } from '../../../services/capa.service'
import { CAPAForm } from '../log/capa-log.interface'

@Component({
  selector: 'capa-capture',
  templateUrl: './capa-capture.component.html'
})

export class CAPACaptureComponent {
  @Language() lang: string
  newCapa: boolean = null
  capaData: CAPAForm = null

  constructor(private capaService: CAPAService) {

  }

  public onOpenCAPA(event) {
    if (event === Number(event)) {
      this.capaService.authorization(event).then(success => {
        this.capaData = success
        this.newCapa = true
      })
    } else { 
      this.newCapa = true
    }
  }

  public onCloseCAPA(event) {
    this.capaData = null
    this.newCapa = null
  }
}