import { Injectable, OnInit } from '@angular/core'

import { LoadingController } from 'ionic-angular'

import { Language, TranslationService as TService } from 'angular-l10n'

@Injectable()
export class LoaderService implements OnInit {
  @Language() lang: string
  
  constructor(public loadingCtrl: LoadingController){

  }

  ngOnInit(){

  }

  koiLoader(message){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div text-center>
          <img class="spinner" src="assets/images/koi_spinner.png" alt="" width="240" height="240">
        </div>
        <div text-center>` + message + `</div>`
    })

    return loading
  }
}