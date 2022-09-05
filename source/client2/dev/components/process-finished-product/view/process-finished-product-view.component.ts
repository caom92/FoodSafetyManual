import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { ProcessFinishedProductService } from '../../../services/process-finished-product.service'
import { ProcessFinishedProductEntryInterface } from '../interfaces/process-finished-product.interface'

@Component({
  selector: 'process-finished-product-view',
  templateUrl: './process-finished-product-view.component.html'
})

export class ProcessFinishedProductViewComponent {
  @Language() lang: string
  entries: Array<ProcessFinishedProductEntryInterface> = []

  constructor(private cropRegistryService: ProcessFinishedProductService) {

  }

  public ngOnInit(): void {
    /*this.cropRegistryService.view().then(success => {
      this.entries = success.logs
      this.crops = success.crops
      this.varieties = success.varieties

      this.populateFilters()
    })*/
  }

  public populateFilters(): void {
    /*for (let v of this.varieties) {
      this.autocompleteVarieties.data[v['variety']] = null
    }

    for (let c of this.crops) {
      this.autocompleteCrops.data[c['crop']] = null
    }

    console.log(this.autocompleteVarieties)
    console.log(this.autocompleteCrops)*/
  }

  public onAddRegister(register: ProcessFinishedProductEntryInterface): void {
    //this.entries.push(register)
  }
}