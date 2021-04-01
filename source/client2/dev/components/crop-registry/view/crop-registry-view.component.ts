import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { CropRegistryService } from '../../../services/crop-registry.service'
import { CropRegistryEntryInterface } from '../interfaces/crop-registry.interface'

@Component({
  selector: 'crop-registry-view',
  templateUrl: './crop-registry-view.component.html'
})

export class CropRegistryViewComponent {
  @Language() lang: string
  registers: Array<CropRegistryEntryInterface>

  constructor(private cropRegistryService: CropRegistryService) {

  }

  public ngOnInit(): void {
    this.cropRegistryService.view().then(success => {
      this.registers = success
    })
  }

  public onAddRegister(register: CropRegistryEntryInterface): void {
    this.registers.push(register)
  }1
}