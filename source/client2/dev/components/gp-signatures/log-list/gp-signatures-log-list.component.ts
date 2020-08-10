import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { GPSignaturesService } from '../../../services/gp-signatures.service'

@Component({
  selector: 'gp-signatures-log-list',
  templateUrl: './gp-signatures-log-list.component.html'
})

export class GPSignaturesLogListComponent {
  @Language() lang: string
  zoneList: Array<any> = []
  logList: Array<any> = []
  pendingList: Array<any> = []
  requestForm: FormGroup

  constructor(private formBuilder: FormBuilder, private gpSignaturesService: GPSignaturesService) {
    
  }

  public ngOnInit(): void {
    this.initForm()
    this.listZones()
    this.listLogs()
  }

  private initForm(): void {
    this.requestForm = this.formBuilder.group({
      zone_id: [null, [Validators.required]],
      log_id: [null, [Validators.required]]
    })
  }

  private listZones(): void {
    this.gpSignaturesService.listGPSupervisorZones().then(success => {
      this.zoneList = success
    }, error => {

    })
  }

  private listLogs(): void {
    this.gpSignaturesService.listLogs().then(success => {
      this.logList = success
    }, error => {

    })
  }

  public listPendingSignatures(): void {
    if (this.requestForm.valid) {
      this.gpSignaturesService.listUnsignedLogs(this.requestForm.value).then(success => {
        this.pendingList = success
      })
    }
  }

  public signDocument(id: number): void {
    console.log('document to be signed', id)
    // send request to sign document
    // if document was successfully signed, remove log from list
    this.gpSignaturesService.signLog(id).then(success => {
      let deleteID = this.pendingList.findIndex((x => x.id == id))
      this.pendingList.splice(deleteID, 1)
    })
  }
}