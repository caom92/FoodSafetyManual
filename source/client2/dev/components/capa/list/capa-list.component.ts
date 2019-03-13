import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'angular2-pubsub/node_modules/rxjs'

import { CAPAService } from '../../../services/capa.service'
import { CAPAForm } from '../log/capa-log.interface'
import { CAPAListElement } from './capa-list.interface'

@Component({
  selector: 'capa-list',
  templateUrl: './capa-list.component.html'
})

export class CAPAList implements OnInit, OnDestroy {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startCapa = new EventEmitter<number | boolean>()
  zoneChange: Subscription
  protected capaList: Array<CAPAListElement> = []
  protected waitingCapa: CAPAForm = null

  constructor(private capaService: CAPAService, private events: PubSubService) {
    
  }

  public ngOnInit(): void {
    this.zoneChange = this.events.$sub('zone:change').subscribe((message) => {
      this.onZoneChange()
    })

    this.onZoneChange()
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

  public onZoneChange(): void {
    this.capaService.listWaitingLogs().then(success => {
      this.capaList = success
    }, error => {

    })
  }

  public ngOnDestroy(): void {
    this.zoneChange.unsubscribe()
  }
}