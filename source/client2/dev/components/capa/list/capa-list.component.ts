import { Component, EventEmitter, Output } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { CAPAService } from '../../../services/capa.service'
import { CAPAForm } from '../log/capa-log.interface'
import { CAPAListElement } from './capa-list.interface'

@Component({
  selector: 'capa-list',
  templateUrl: './capa-list.component.html'
})

export class CAPAList {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startCapa = new EventEmitter<number | boolean>()
  protected capaList: Array<CAPAListElement> = []
  protected waitingCapa: CAPAForm = null

  constructor(protected capaService: CAPAService) {
    
  }

  public ngOnInit(): void {
    this.capaService.listWaitingLogs().then(success => {
      this.capaList = success
    }, error => {
      
    })
  }

  public onCAPAOpen(id: number | boolean) {
    if (id === Number(id)) {
      this.startCapa.emit(id)
    } else {
      this.startCapa.emit(true)
    }
  }

  public onCAPAClose(): void {
    this.waitingCapa = null
  }
}