import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { NavParams, Select, Events } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { UpdateLog, UpdateArea, UpdateItem } from '../interfaces/gmp.packing.preop.update.interface'
import { Authorization, AuthorizationItem } from '../interfaces/gmp.packing.preop.authorization.interface'

import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

import { NavbarPageComponent } from '../../../super-components/navbar.component'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-preop-authorization',
  templateUrl: './gmp.packing.preop.authorization.html'
})

export class GMPPackingPreopAuthorizationComponent extends NavbarPageComponent implements OnInit {
  @Input() log: Authorization =  { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, album_url: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, person_performing_sanitation: null, notes: null, time: null, types: [{ id: null, en: null, es: null, items: [{ id: null, order: null, name: null, status: null, corrective_action_id: null, corrective_action: null, comment: null }] }] }] } }
  @Language() lang: string
  public captureForm: FormGroup = new FormBuilder().group({})

  logHeaderData = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }

  constructor(private _fb: FormBuilder,
    public server: BackendService,
    public translationService: TranslationService,
    private toasts: ToastService,
    private navParams: NavParams,
    public events: Events,
    public storage: Storage,
    public logService: LogService) {
    super(translationService, events, storage, server)
    this.log = navParams.get('data');
  }

  ngOnInit() {
    super.ngOnInit()

    this.assignHeaderData()

    this.captureForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
      notes: [this.log.notes, [Validators.required, Validators.minLength(1)]],
      album_url: [this.log.album_url, [Validators.required, Validators.minLength(1)]],
      areas: this._fb.array([])
    })
    const control = <FormArray>this.captureForm.controls['areas'];
    for (let area of this.log.areas.logs) {
      let itemControl = []
      for (let type of area.types) {
        for (let item of type.items) {
          itemControl.push(this.initItem({ id: item.id, is_acceptable: (item.status == 1) ? true : false, corrective_action_id: item.corrective_action_id, comment: item.comment }))
        }
      }
      control.push(this.initArea({ id: area.id, time: area.time, notes: area.notes, person_performing_sanitation: area.person_performing_sanitation, items: itemControl }))
    }
  }

  assignHeaderData() {
    this.logHeaderData.created_by = this.log.created_by
    this.logHeaderData.date = this.log.creation_date
    this.logHeaderData.module_name = this.log.module_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.zone_name = this.log.zone_name
  }

  initArea(area: UpdateArea) {
    return this._fb.group({
      id: [area.id, [Validators.required]],
      time: [area.time, [Validators.required, Validators.minLength(1)]],
      notes: [area.notes, [Validators.required, Validators.minLength(1)]],
      person_performing_sanitation: [area.person_performing_sanitation, [Validators.required, Validators.minLength(1)]],
      items: this._fb.array(area.items)
    })
  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]],
      corrective_action_id: [item.corrective_action_id],
      comment: [item.comment]
    })
  }

  save(model: UpdateLog) {
    if (this.captureForm.valid) {
      this.logService.update(this.captureForm.value, 'update-gmp-packing-preop').then(success => {
        // Si la promesa regresa como valida, quiere decir que la bitácora fue enviada con éxito

      }, error => {
        // Caso contrario, se le notifica al usuario
      })
    } else {
      this.toasts.showText("incompleteLog")
    }
  }
}
