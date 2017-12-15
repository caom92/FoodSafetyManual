import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { ISubscription } from 'rxjs/Subscription'
import { Language } from 'angular-l10n'
import { InventoryItem } from '../interfaces/gmp.self.inspection.pest.control.inventory.interface'
import { DragulaService } from 'ng2-dragula'
import { InventoryService } from '../../../../services/app.inventory'
import { SuperInventoryListComponent } from '../../super-inventory/super.inventory.list';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'gmp-self-inspection-pest-control-inventory-list',
  templateUrl: './gmp.self.inspection.pest.control.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPSelfInspectionPestControlInventoryListComponent extends SuperInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() items: Array<InventoryItem> = null
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
   * @memberof GMPSelfInspectionPestControlInventoryListComponent
   */

  public ngOnInit(): void {
    this.setBagName("gmp-self-inspection-pest-control-bag")
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setInventory(this.items)
    super.ngOnInit()
  }

  /**
   * En caso de algún cambio en el modelo, se debe actualizar el inventario que
   * es utilizado para el reordenamiento de esta modificación
   * 
   * @memberof GMPSelfInspectionPestControlInventoryListComponent
   */

  public ngOnChanges(): void{
    this.setInventory(this.items)
    this.setOriginalInventory(this.items)
  }
}