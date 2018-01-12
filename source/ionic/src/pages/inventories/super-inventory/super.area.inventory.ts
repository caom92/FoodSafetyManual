import { OnInit, OnDestroy } from '@angular/core'
import { AreaManagerService } from '../../../services/app.area.manager'
import { ModalController, Events } from 'ionic-angular'
import { SuperInventoryItemInterface } from './super.inventory.interface'
import { SuperInventoryAddItemComponent } from './super.inventory.add.item';

export class SuperAreaInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  private suffix: string = null

  constructor(protected events: Events, private areaManagerService: AreaManagerService, protected modalController: ModalController) {

  }

  /**
   * Se suscribe a los eventos 
   * 
   * @memberof SuperAreaInventoryComponent
   */

  public ngOnInit(): void {
    this.events.subscribe("scroll:stop", (message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.subscribe("scroll:start", (message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.areaManagerService.getAreaInventoryByPosition(this.suffix).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos, ya que este caso se maneja
      // dentro del servicio de inventarios
    })
  }

  public addArea(addAreaComponet: any, data: any, handler: Function): void {
    let modal = this.modalController.create(addAreaComponet, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
        this.emptyInventoryFlag = false
      }
    })
  }

  /**
   * Asigna el sufijo que identifica a la bitácora, necesario para llamar a los
   * servicios correspondientes a la bitácora particular
   * 
   * @param {string} suffix 
   * @memberof SuperInventoryListComponent
   */

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  /**
   * Desuscribimos los eventos relacionados con este inventario
   * 
   * @memberof SuperAreaInventoryComponent
   */

  public ngOnDestroy(): void {
    this.events.unsubscribe("scroll:stop")
    this.events.unsubscribe("scroll:start")
  }

  /**
   * Función que verifica si el inventario se encuentra vacío, con el fin de
   * informarle a la vista si debe o no desplegar un mensaje que informe de esto
   * al usuario. Dado que cada inventario es diferente, la implementación de
   * cualquier componente hijo está forzada a sobreescribir esta función
   * 
   * @returns {boolean} 
   * @memberof SuperAreaInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    throw "checkEmptyInventory() function must be overridden in child class"
  }
}