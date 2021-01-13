import { Component } from '@angular/core'
import { Language } from 'angular-l10n'

import { SubjectInventoryService } from '../../../../services/subject-inventory.service'
import { SubjectInventoryItemInterface } from '../interfaces/gmp.packing.preop.form.inventory.interface'

@Component({
  selector: 'gmp-packing-preop-form-inventory',
  templateUrl: './gmp.packing.preop.form.inventory.html'
})

export class GMPPackingPreopFormInventoryComponent {
  @Language() lang: string
  subjectControl: SubjectInventoryItemInterface = null

  private toggleError: boolean = false
  private previousValue: boolean = null
  private toggleValue: boolean = null

  constructor(public subjectInventoryService: SubjectInventoryService) {
    
  }

  public ngOnInit(): void {
    this.subjectInventoryService.getSubjectInventory('gmp-packing-preop').then(success => {
      let subjectInventory: Array<SubjectInventoryItemInterface> = success
      if (subjectInventory.length != 0 && this.subjectControl == null) {
        this.subjectControl = subjectInventory[0]
        this.setToggleValue()
      }
    })
  }

  public setToggleValue(): void {
    if (this.subjectControl.is_active == 1) {
      this.toggleValue = true
    } else {
      this.toggleValue = false
    }
  }

  public toggleSubject(): void {
    console.log('subject', this.subjectControl)
    if (this.subjectControl != null) {
      if (this.toggleError) {
        this.toggleValue = this.previousValue
        this.toggleError = false
      } else {
        this.previousValue = this.toggleValue
        this.subjectInventoryService.toggleSubject('gmp-packing-preop', this.subjectControl).then(success => {
          
        }, error => {
          this.toggleError = true
          this.toggleSubject()
        })
      }
    }
  }

  public addSubject(): void {
    if (this.subjectControl == null) {
      this.subjectInventoryService.addSubject('gmp-packing-preop').then(success => {
        this.subjectControl = {
          id: success,
          is_active: 1
        }
        
        this.setToggleValue()
      })
    }
  }
}
