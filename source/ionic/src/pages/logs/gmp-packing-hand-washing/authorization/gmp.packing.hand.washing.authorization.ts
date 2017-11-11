import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core'
import { NavParams, Select, Events } from 'ionic-angular'
import { DatePipe } from '@angular/common'

import { Language } from 'angular-l10n'

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { UpdateLog, UpdateItem } from '../interfaces/gmp.packing.hand.washing.update.interface'
import { Authorization, AuthorizationItem } from '../interfaces/gmp.packing.hand.washing.authorization.interface'
//import { LogHeaderComponent } from '../components/app.log.header'

import { DateTimeService } from '../../../../services/app.time'
import { BackendService } from '../../../../services/app.backend'
import { TranslationService } from '../../../../services/app.translation'
import { ToastService } from '../../../../services/app.toasts'
import { LoaderService } from '../../../../services/app.loaders'

@Component({
  selector: 'gmp-packing-hand-washing-authorization',
  templateUrl: './gmp.packing.hand.washing.authorization.html',
  providers: [
    BackendService,
    TranslationService,
    ToastService
  ]
})

export class GMPPackingHandWashingAuthorizationComponent implements OnInit {
  @Input()
  log: Authorization = { report_id: null, created_by: null, approved_by: null, creation_date: null, approval_date: null, zone_name: null, program_name: null, module_name: null, log_name: null, notes: null, items: [{ id: null, 0: null, name: null, 1: null, is_acceptable: null, 2: null }] }

  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language()
  lang: string

  public gmpPackingHandWashingForm: FormGroup = new FormBuilder().group({})

  logHeaderData = {
    zone_name: null,
    program_name: null,
    module_name: null,
    date: null,
    created_by: null
  }

  constructor(private _fb: FormBuilder, private timeService: DateTimeService, private server: BackendService, private translationService: TranslationService, private toasts: ToastService, private navParams: NavParams, public events: Events) {
    this.log = navParams.get('data');
    console.log(this.log)
  }

  ngOnInit() {
    this.assignHeaderData()

    this.gmpPackingHandWashingForm = this._fb.group({
      report_id: [this.log.report_id, [Validators.required, Validators.minLength(1)]],
      notes: [this.log.notes, [Validators.required, Validators.minLength(1)]],
      items: this._fb.array([])
    })
    const control = <FormArray>this.gmpPackingHandWashingForm.controls['items'];
    for (let item of this.log.items) {
      control.push(this.initItem({ id: Number(item.id), is_acceptable: item.is_acceptable == "1" }))
    }
  }

  assignHeaderData(){
    this.logHeaderData.created_by = this.log.created_by
    this.logHeaderData.date = this.log.creation_date
    this.logHeaderData.module_name = this.log.module_name
    this.logHeaderData.program_name = this.log.program_name
    this.logHeaderData.zone_name = this.log.zone_name
  }

  ngOnChanges() {

  }

  initItem(item: UpdateItem) {
    return this._fb.group({
      id: [item.id, [Validators.required]],
      is_acceptable: [item.is_acceptable, [Validators.required]]
    })
  }

  save(model: UpdateLog) {
    if (this.gmpPackingHandWashingForm.valid) {
      console.log(this.gmpPackingHandWashingForm.value)
      this.toasts.showText("capturedLog")
      let form_data = new FormData()
      let filled_log = this.gmpPackingHandWashingForm.value

      let flatObj = this.flatten(filled_log)

      for (let key in flatObj) {
        let tempKey = key + "]"
        tempKey = tempKey.replace(']', '')
        if (flatObj[key] == true) {
          form_data.append(tempKey, "1")
        } else if (flatObj[key] == false) {
          form_data.append(tempKey, "0")
        } else {
          form_data.append(tempKey, flatObj[key])
        }
      }

      console.log(filled_log)
      console.log(flatObj)

      this.server.update(
        'update-gmp-packing-hand-washing',
        form_data,
        (response: any) => {
          console.log(response)
          console.log(JSON.stringify(response))
        } // (response: any)
      ) // this.server.update
    } else {
      this.toasts.showText("incompleteLog")
    }
  }

  flatten(data) {
    var result = {}

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "][" + i + "][")
        if (l == 0) result[prop] = []
      } else {
        var isEmpty = true
        for (var p in cur) {
          isEmpty = false
          recurse(cur[p], prop ? prop + p : p)
        }
        if (isEmpty && prop) result[prop] = {}
      }
    }

    recurse(data, "")
    return result
  }

  isEnglish(){
    return this.lang == "en"
  }

  isSpanish(){
    return this.lang == "es"
  }

  isDirector(){
    return localStorage["__mydb/_ionickv/role_name"] == '"Director"';
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
    this.events.publish('language:changed', selectedValue, Date.now());
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}