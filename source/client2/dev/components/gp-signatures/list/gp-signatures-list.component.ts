import { Component, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { GPSignaturesService } from '../../../services/gp-signatures.service'

@Component({
  templateUrl: './gp-signatures-list.component.html'
})

export class GPSignaturesComponent implements OnInit {
  @Language() lang: string
  protected signatures = []
  protected zoneList = []

  constructor(private gpSignaturesService: GPSignaturesService) {

  }

  public ngOnInit(): void {
    this.gpSignaturesService.listZones().then(success => {
      this.zoneList = success
      this.gpSignaturesService.listSignatures().then(success => {
        this.signatures = success
      }, error => {

      })
    }, error => {

    })
  }
}