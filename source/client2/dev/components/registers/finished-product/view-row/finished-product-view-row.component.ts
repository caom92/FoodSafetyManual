import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Language } from 'angular-l10n'
import { MzModalService } from 'ngx-materialize'

import { RegisterService } from '../../../../services/register.service'
import { FinishedProductEditRegisterModalComponent } from '../edit-modal/finished-product-edit-modal.component'
import { FinishedProductEntryInterface } from '../interfaces/finished-product.interface'

@Component({
  selector: '[finished-product-view-row]',
  templateUrl: './finished-product-view-row.component.html',
  styleUrls: ['./finished-product-view-row.component.css'],
  host: {
    '(click)': 'onEditClick()'
  }
})

export class FinishedProductViewRowComponent {
  @Language() lang: string
  @Input() register: FinishedProductEntryInterface
  @Input() selectedID: number = null
  @Input() codes: Array<any>
  @Input() status: Array<any>

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
    this.modalService.open(FinishedProductEditRegisterModalComponent, {
      register: this.register,
      codes: this.codes,
      status: this.status
    })
  }
}
