import { Component, Input } from '@angular/core'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks'
import { FormBuilder, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'

import { AreaInventoryService } from '../../../../services/area-inventory.service'
import { SuperInventoryAreaComponent } from '../../super-inventory/super.area.inventory.area'
import { SuperInventoryEditAreaInterface } from '../../super-inventory/super.area.inventory.interface'
import { InventoryArea } from '../interfaces/gap.self.inspection.pest.control.area.inventory.interface'

@Component({
  selector: '[gap-self-inspection-pest-control-area-inventory-area]',
  templateUrl: './gap.self.inspection.pest.control.area.inventory.area.html'
})

export class GAPSelfInspectionPestControlAreaInventoryAreaComponent extends SuperInventoryAreaComponent implements OnInit {
  @Input() area: InventoryArea
  @Language() lang: string

  constructor(events: PubSubService, _fb: FormBuilder, areaInventoryService: AreaInventoryService) {
    super(events, _fb, areaInventoryService)
  }
  
  public ngOnInit(): void {
    this.setSuffix('gap-self-inspection-pest-control')
    this.createItemForm({
      name: [String(this.area.name), [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  public openEditForm(): void {
    this.editMode = true
  }

  public confirm(): void {
    let form: SuperInventoryEditAreaInterface = { area_id: null, area_name: null }
    form.area_id = this.area.id
    form.room_id = this.area.id
    form.area_name = this.newArea.value.name
    form.name = this.newArea.value.name
    super.editArea(form)
  }
}