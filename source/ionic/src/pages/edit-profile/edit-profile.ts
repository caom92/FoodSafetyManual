import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Select } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { Language } from 'angular-l10n';

import { BackendService } from '../../services/app.backend';
import { TranslationService } from '../../services/app.translation';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    BackendService,
    TranslationService
  ]
})
export class EditProfile implements OnInit {
  @ViewChild('zone_select') zone_select: Select;
  @ViewChild('language_select') language_select: Select;
  @Language() lang: string;

  userLogInInfo: FormGroup
  selectedItem: any
  username: string
  employeeID: string
  realname: string
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private server: BackendService, private translationService: TranslationService, private formBuilder: FormBuilder, private storage: Storage) {
    this.selectedItem = navParams.get('item');
  }

  ngOnInit() {
    this.username = "default"
    this.employeeID = "default"
    this.realname = "default"

    this.storage.get('login_name').then((login_name) => {
      this.username = login_name;
    })

    this.storage.get('user_id').then((user_id) => {
      this.employeeID = user_id;
    })

    this.storage.get('full_name').then((full_name) => {
      this.realname = full_name;
    })

    // Configuramos el formulario con valores iniciales vacios y las reglas de 
    // validacion correspondientes
    this.userLogInInfo = this.formBuilder.group({
      username: [ this.username, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      employeeID: [ this.employeeID, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      realname: [ this.realname, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    })
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
  }

  selectLocale(lang) {
    this.translationService.selectLanguage(lang);
  }
}