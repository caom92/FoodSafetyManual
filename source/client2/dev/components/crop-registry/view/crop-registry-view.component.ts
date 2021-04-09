import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { CropRegistryService } from '../../../services/crop-registry.service'
import { CropRegistryAutocompleteInterface, CropRegistryEntryInterface } from '../interfaces/crop-registry.interface'

@Component({
  selector: 'crop-registry-view',
  templateUrl: './crop-registry-view.component.html'
})

export class CropRegistryViewComponent {
  @Language() lang: string
  registers: Array<CropRegistryEntryInterface> = []
  autocompleteCrops: CropRegistryAutocompleteInterface = { data: {}, limit: 5 }
  autocompleteVarieties: CropRegistryAutocompleteInterface = { data: {}, limit: 5 }
  crops: Array<string> = []
  varieties: Array<string> = []

  constructor(private cropRegistryService: CropRegistryService) {

  }

  public ngOnInit(): void {
    this.cropRegistryService.view().then(success => {
      this.registers = success.logs
      this.crops = success.crops
      this.varieties = success.varieties

      this.populateFilters()
    })
  }

  public populateFilters(): void {
    for (let v of this.varieties) {
      this.autocompleteVarieties.data[v['variety']] = null
    }

    for (let c of this.crops) {
      this.autocompleteCrops.data[c['crop']] = null
    }

    console.log(this.autocompleteVarieties)
    console.log(this.autocompleteCrops)
  }

  public onAddRegister(register: CropRegistryEntryInterface): void {
    this.registers.push(register)
  }
}