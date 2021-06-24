import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Language } from 'angular-l10n'
import { MzModalService } from 'ngx-materialize'

import { RegisterService } from '../../../../services/register.service'
import { AddRegisterFooterModalComponent } from '../add/register-footer-add.component'
import { EditRegisterFooterModalComponent } from '../edit/register-footer-edit.component'

@Component({
  selector: 'register-footer-customizer',
  templateUrl: './register-footer-customizer.component.html',
  styleUrls: ['./register-footer-customizer.component.css']
})

export class RegisterFooterCustomizerComponent implements OnInit {
  @Language() lang: string
  zones: Array<any> = []
  footers: Array<any> = []
  footersForm: FormGroup

  constructor(private registerService: RegisterService, private _fb: FormBuilder, private modalManager: MzModalService) { }

  public ngOnInit(): void {
    this.registerService.listZones().then(success => {
      this.zones = success
    }, error => {
      console.log(error)
    })

    this.footersForm = this._fb.group({
      zoneID: [null]
    })
  }

  public onAddFooter(registerID: number): void {
    this.modalManager.open(AddRegisterFooterModalComponent, {
      zoneID: this.footersForm.value.zoneID,
      registerID: registerID
    })
  }

  public onEditFooter(footerID: number, footer: string): void {
    this.modalManager.open(EditRegisterFooterModalComponent, {
      footerID: footerID,
      footer: footer
    })
  }

  public onZoneChange(): void {
    this.registerService.listFooters(this.footersForm.value.zoneID).then(success => {
      this.footers = success
    }, error => {
      console.log(error)
    })
  }
}
