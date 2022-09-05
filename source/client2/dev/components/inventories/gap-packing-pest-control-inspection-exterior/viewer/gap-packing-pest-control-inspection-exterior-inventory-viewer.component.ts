import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/log.service'
import { SuperInventoryViewer } from '../../super-inventory/super.inventory.viewer'

@Component({
  selector: 'gap-packing-pest-control-inspection-exterior-inventory-viewer',
  templateUrl: './gap-packing-pest-control-inspection-exterior-inventory-viewer.component.html',
  styleUrls: ['./custom-collection.css']
})

export class GAPPackingPestControlInspectionExteriorInventoryViewerComponent extends SuperInventoryViewer {
  @Language() lang: string
  inventories: Array<{ name: string, code: string }>

  constructor(routeState: ActivatedRoute, logService: LogService) {
    super(routeState, logService)
  }

  ngOnInit() {
    super.ngOnInit()
    
    this.inventories = [
      {
        name: 'Areas',
        code: 'area'
      },
      {
        name: 'Estado de la protección',
        code: 'protection-status'
      },
      {
        name: 'Estado del equipo',
        code: 'equipment-status'
      },
      {
        name: 'Tipo de plaga detectada',
        code: 'pest-type'
      },
      {
        name: 'Verificación de áreas',
        code: 'area-verification'
      },
      {
        name: 'Actividad realizada',
        code: 'task'
      },
      {
        name: 'Acción correctiva de captura',
        code: 'corrective-action'
      }
    ]
  }
}