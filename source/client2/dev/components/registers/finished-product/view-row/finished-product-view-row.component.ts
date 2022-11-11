import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core'
import { Language } from 'angular-l10n'
import { MzBaseModal, MzModalService } from 'ngx-materialize'

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
  @Output() delete = new EventEmitter<number>()
  currentModal: ComponentRef<MzBaseModal> = null

  constructor(private registerService: RegisterService, private modalService: MzModalService) { }

  public ngOnDestroy(): void {
    if (this.currentModal !== null) {
      this.currentModal.instance.modalComponent.closeModal()
    } 
  }

  public onSignClick(): void {
    if(this.register.supervisor_id === null) {
      this.registerService.directSupervisorSign(this.register.captured_register_id).then(success => {
        this.register.supervisor_id = success.supervisor_id
        this.register.signature_path = success.signature_path
      })
    } else {
      this.registerService.directSupervisorUnsign(this.register.captured_register_id).then(success => {
        this.register.supervisor_id = null
        this.register.signature_path = null
      })
    }
  }

  public onGpSignClick(): void {
    this.registerService.gpSupervisorSign(this.register.captured_register_id).then(success => {
      this.register.gp_supervisor_id = success.gp_supervisor_id
      this.register.gp_signature_path = success.gp_signature_path
    })
  }

  public onEditClick(): void {
    this.currentModal = this.modalService.open(FinishedProductEditRegisterModalComponent, {
      onClose: () => {
        this.currentModal = null
      },
      register: this.register,
      codes: this.codes,
      status: this.status
    })
  }

  public onDeleteClick(): void {
    this.registerService.delete(this.register.captured_register_id).then(success => {
      this.delete.emit(this.register.id)
    })
  }
}
