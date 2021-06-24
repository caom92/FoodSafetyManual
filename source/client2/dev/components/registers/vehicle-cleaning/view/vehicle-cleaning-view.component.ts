import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'
import { RegisterService } from '../../../../services/register.service'

import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  selector: 'vehicle-cleaning-view',
  templateUrl: './vehicle-cleaning-view.component.html',
  styleUrls: ['./vehicle-cleaning-view.component.css']
})

export class VehicleCleaningViewComponent {
  @Language() lang: string
  @ViewChild('report_body') reportHTML: ElementRef
  @Input() registers: Array<VehicleCleaningEntryInterface> = []
  currentRegister: VehicleCleaningEntryInterface = null
  selectedID: number = null

  constructor(private registerService: RegisterService) { }

  public onEditRegister(register: VehicleCleaningEntryInterface): void {
    if (register.id != this.selectedID) {
      this.currentRegister = register
      this.selectedID = register.id
    } else {
      this.currentRegister = null
      this.selectedID = null
    }
  }
  
  /*public onSignClick(id: number): void {
    this.registerService.supervisorSign(id).then(success => {
      let registerIndex = this.registers.findIndex((x => x.captured_register_id == id))
      this.registers[registerIndex].supervisor_id = success.supervisor_id
      this.registers[registerIndex].signature_path = success.signature_path
    })
  }

  public onGpSignClick(id: number): void {
    this.registerService.gpSupervisorSign(id).then(success => {
      let registerIndex = this.registers.findIndex((x => x.captured_register_id == id))
      this.registers[registerIndex].gp_supervisor_id = success.gp_supervisor_id
      this.registers[registerIndex].gp_signature_path = success.gp_signature_path
    })
  }*/
}