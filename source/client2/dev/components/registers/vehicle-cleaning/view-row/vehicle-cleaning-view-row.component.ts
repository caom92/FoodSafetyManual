import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Language } from 'angular-l10n'
import { MzModalService } from 'ngx-materialize'

import { RegisterService } from '../../../../services/register.service'
import { VehicleCleaningEditRegisterModalComponent } from '../edit-modal/vehicle-cleaning-edit-modal.component'
import { VehicleCleaningEntryInterface } from '../interfaces/vehicle-cleaning.interface'

@Component({
  selector: '[vehicle-cleaning-view-row]',
  templateUrl: './vehicle-cleaning-view-row.component.html',
  styleUrls: ['./vehicle-cleaning-view-row.component.css'],
  host: {
    '(click)': 'onEditClick()'
  }
})

export class VehicleCleaningViewRowComponent {
  @Language() lang: string
  @Input() register: VehicleCleaningEntryInterface
  @Input() selectedID: number = null

  constructor(private registerService: RegisterService, private modalService: MzModalService) {}

  public onSignClick(): void {
    this.registerService.supervisorSign(this.register.captured_register_id).then(success => {
      this.register.supervisor_id = success.supervisor_id
      this.register.signature_path = success.signature_path
    })
  }

  public onGpSignClick(): void {
    this.registerService.gpSupervisorSign(this.register.captured_register_id).then(success => {
      this.register.gp_supervisor_id = success.gp_supervisor_id
      this.register.gp_signature_path = success.gp_signature_path
    })
  }

  public onEditClick(): void {
    this.modalService.open(VehicleCleaningEditRegisterModalComponent, {
      register: this.register
    })
  }
}
