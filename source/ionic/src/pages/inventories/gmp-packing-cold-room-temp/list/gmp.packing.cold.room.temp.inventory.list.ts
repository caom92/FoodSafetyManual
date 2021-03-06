import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { Language } from 'angular-l10n'
import { InventoryItem } from '../interfaces/gmp.packing.cold.room.temp.inventory.interface'
import { DragulaService } from 'ng2-dragula'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list';

@Component({
  selector: 'gmp-packing-cold-room-temp-inventory-list',
  templateUrl: './gmp.packing.cold.room.temp.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPPackingColdRoomTempInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy {
  @Language() private lang: string
  @Input() items: Array<InventoryItem>
  @Input() private printHeader: boolean = false

  constructor(dragulaService: DragulaService,
    events: Events,
    inventoryService: InventoryService) {
    super(dragulaService, events, inventoryService)
  }

  /**
   * Informa a la clase padre del nombre que se le asignará a la bolsa de
   * Dragula, el cual debe ser único. Con este nombre asignado, la
   * inicialización del componente padre se encarga de inicializar las funciones
   * de Dragula
   * 
   * @memberof GMPPackingColdRoomTempInventoryListComponent
   */

  public ngOnInit(): void {
    this.setBagName("gmp-packing-cold-room-temp-bag")
    this.setSuffix("gmp-packing-cold-room-temp")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  /**
   * En caso de algún cambio en el modelo, se debe actualizar el inventario que
   * es utilizado para el reordenamiento de esta modificación
   * 
   * @memberof GMPPackingColdRoomTempInventoryListComponent
   */

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}