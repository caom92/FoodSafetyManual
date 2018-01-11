import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'
import { Language } from 'angular-l10n'
import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'
import { DragulaService } from 'ng2-dragula'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list'

@Component({
  selector: '[gmp-packing-scale-calibration-inventory-list]',
  templateUrl: './gmp.packing.scale.calibration.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingScaleCalibrationInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnChanges, OnDestroy {
  @Language() private lang: string
  @Input() type: InventoryType

  constructor(dragulaService: DragulaService,
    events: PubSubService,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  /**
   * Informa a la clase padre del nombre que se le asignará a la bolsa de
   * Dragula, el cual debe ser único. Con este nombre asignado, la
   * inicialización del componente padre se encarga de inicializar las funciones
   * de Dragula
   * 
   * @memberof GMPPackingScaleCalibrationInventoryListComponent
   */

  public ngOnInit(): void {
    this.setBagName(this.type.name)
    this.setSuffix("gmp-packing-scale-calibration")
    this.setInventory(this.type.items)
    super.ngOnInit()
  }
}