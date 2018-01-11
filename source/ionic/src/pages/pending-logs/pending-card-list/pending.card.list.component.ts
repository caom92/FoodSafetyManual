import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { NavController, AlertController, Select, Events } from 'ionic-angular'

import { Storage } from '@ionic/storage'

import { Language, TranslationService as TService } from 'angular-l10n'

import { Observable } from 'rxjs/Rx'

import { NavbarPageComponent } from '../../super-components/navbar.component'

import { PendingLog } from '../pending-card/pending.card.interface'

import { DateTimeService } from '../../../services/app.time'
import { BackendService } from '../../../services/app.backend'
import { TranslationService } from '../../../services/app.translation'
import { ToastsService } from '../../../services/app.toasts'
import { LoaderService } from '../../../services/app.loaders'

@Component({
  selector: 'pending-card-list-component',
  templateUrl: './pending.card.list.component.html'
})

export class PendingCardListComponent extends NavbarPageComponent implements OnInit, OnDestroy {
  @Language() lang: string

  @Input()
  logs: Array<PendingLog> = []

  constructor(public navCtrl: NavController, public server: BackendService, public translationService: TranslationService, public events: Events, public ts: TService, private toastService: ToastsService, public storage: Storage) {
    super(translationService, events, storage, server)
  }

  ngOnInit() {
    super.ngOnInit()
    // Al incializar el componente, cargamos la lista de bitácoras pendientes de envío
    // para el usuario conectado
    this.storage.get("user_id").then(user_id => {
      if (user_id != null && user_id != undefined) {
        this.storage.get("pendingLogQueue").then(pending => {
          if (pending != undefined && pending != null) {
            if (pending[user_id] != null && pending[user_id] != undefined) {
              this.logs = pending[user_id]
            }
          }
        })
      }
    })

    // Escuchamos cuando una bitácoras es aprobada y la retiramos del arreglo actual
    // Además, actualizamos el número de bitácoras pendientes
    this.events.subscribe("log:resent", (index) => {
      this.logs.splice(index, 1)
      this.events.publish("pendingLog:total", this.logs.length)
    })
  }

  ngOnDestroy() {
    // Terminamos la subscripción
    this.events.unsubscribe("log:resent")
  }
}