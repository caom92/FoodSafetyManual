import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Select } from 'ionic-angular';
import { BackendService } from '../../services/app.backend';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Language } from 'angular-l10n';

import { TranslationService } from '../../services/app.translation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    BackendService,
    TranslationService
  ]
})
export class HomePage implements OnInit {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  userLogInInfo: FormGroup;
  
  constructor(public navCtrl: NavController, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes
    this.userLogInInfo = this.formBuilder.group({
      username: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      password: [ null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  openZoneSelector() {
    this.zone_select.open();
  }

  openLanguageSelector() {
    this.language_select.open();
  }

  onLanguageChange(selectedValue) {
    this.selectLocale(selectedValue);
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }

  // Esta funcion es invocada cuando el usuario hace clic en el boton de enviar
  // en el formulario de captura
  onLogInFormSubmit(): void {
    // guardamos los datos ingresados por el usuario en el formulario en una 
    // instancia de FormData
    let formData = new FormData()
    formData.append('username', this.userLogInInfo.value.username)
    formData.append('password', this.userLogInInfo.value.password)

    // enviamos los datos al servidor
    this.server.update(
      'login', 
      formData, 
      (response: Response) => {
        let result = JSON.parse(response['_body'].toString())
        if (result.meta.return_code == 0) {
          console.log('Success')
        } else {
          console.log(result.meta.message)
        }
      }
    )
  }
}
