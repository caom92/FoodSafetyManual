import { Component, OnInit } from '@angular/core'
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { Platform, NavParams, ViewController, AlertController } from 'ionic-angular'

import { Observable } from 'rxjs/Rx'

import { Language, TranslationService as TService } from 'angular-l10n'

import { BackendService } from '../../../services/app.backend'
import { ToastsService } from '../../../services/app.toasts'
import { LoaderService } from '../../../services/app.loaders'

@Component({
  selector: 'manual-upload',
  templateUrl: './manual.upload.html'
})

export class ManualUploadComponent implements OnInit {
  @Language()
  lang: string

  newArea: FormGroup = new FormBuilder().group({})

  logSuffix: string = ""

  infoMessage: string = "initial state"

  constructor(public platform: Platform, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController, 
    public ts: TService, 
    private _fb: FormBuilder, 
    public server: BackendService, 
    private toastService: ToastsService, 
    public loaderService: LoaderService){
    this.logSuffix = navParams.get('log_suffix');
  }

  ngOnInit(){
    /*this.newArea = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })*/
    this.logSuffix = this.navParams.get('log_suffix');
    console.log("Modal inicializado")
    console.log(this.logSuffix)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addItem(){
    console.log("Select file")
  }
}