import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'
import { RegisterService } from '../../../../services/register.service'
import { MzModalService } from 'ngx-materialize'

import { OzoneWaterEditRegisterModalComponent } from '../edit-modal/ozone-water-edit-modal.component'
import { OzoneWaterEntryInterface } from '../interfaces/ozone-water.interface'

@Component({
  selector: '[ozone-water-view-row]',
  templateUrl: './ozone-water-view-row.component.html',
  styleUrls: ['./ozone-water-view-row.component.css'],
  host: {
    '(click)': 'onEditClick()'
  }
})

export class OzoneWaterViewRowComponent {
  @Language() lang: string
  @Input() register: OzoneWaterEntryInterface
  @Input() selectedID: number = null

  constructor(private registerService: RegisterService, private modalService: MzModalService) { }

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
    this.modalService.open(OzoneWaterEditRegisterModalComponent, {
      register: this.register
    })
  }
}
