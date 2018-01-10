import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Events } from 'ionic-angular'
import { ISubscription } from 'rxjs/Subscription'
import { Language } from 'angular-l10n'
import { InventoryArea } from '../interfaces/gmp.self.inspection.pest.control.area.inventory.interface'
import { DragulaService } from 'ng2-dragula'
import { AreaManagerService } from '../../../../services/app.area.manager'
import { SuperAreaInventoryListComponent } from '../../super-inventory/super.area.inventory.list';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'gmp-self-inspection-pest-control-area-inventory-list',
  templateUrl: './gmp.self.inspection.pest.control.area.inventory.list.html',
  providers: [
    DragulaService
  ]
})

export class GMPSelfInspectionPestControlAreaInventoryListComponent extends SuperAreaInventoryListComponent implements OnInit, OnDestroy, OnChanges {
  @Language() private lang: string
  @Input() areas: Array<InventoryArea> = null

  constructor(dragulaService: DragulaService,
    events: Events,
    areaManagerService: AreaManagerService) {
    super(dragulaService, events, areaManagerService)
  }

  /**
   * Informa a la clase padre del nombre que se le asignará a la bolsa de
   * Dragula, el cual debe ser único. Con este nombre asignado, la
   * inicialización del componente padre se encarga de inicializar las funciones
   * de Dragula
   * 
   * @memberof GMPSelfInspectionPestControlAreaInventoryListComponent
   */

  public ngOnInit(): void {
    this.setBagName("gmp-self-inspection-pest-control-area-bag")
    this.setSuffix("gmp-self-inspection-pest-control")
    this.setInventory(this.areas)
    super.ngOnInit()
  }

  /**
   * En caso de algún cambio en el modelo, se debe actualizar el inventario que
   * es utilizado para el reordenamiento de esta modificación
   * 
   * @memberof GMPSelfInspectionPestControlAreaInventoryListComponent
   */

  public ngOnChanges(): void {
    console.log("Area List ngOnChanges called")
    console.log(this.areas)
    this.setInventory(this.areas)
    this.setOriginalInventory(this.areas)
  }
}