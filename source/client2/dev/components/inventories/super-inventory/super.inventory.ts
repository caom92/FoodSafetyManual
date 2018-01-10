import { OnInit, OnDestroy } from '@angular/core'
import { InventoryService } from '../../../services/app.inventory'
//import { ModalController, Events } from 'ionic-angular'
import { PubSubService } from 'angular2-pubsub'
import { SuperInventoryItemInterface } from './super.inventory.interface'
//import { SuperInventoryAddItemComponent } from './super.inventory.add.item'
import { DragulaService } from 'ng2-dragula'

export class SuperInventoryComponent implements OnInit, OnDestroy {
  protected inventory: any = null
  protected emptyInventoryFlag: boolean = null
  protected scrollAllowed: boolean = true
  private suffix: string = null
  protected options: any = {
    moves: function (el, container, handle) {
      return (handle.classList.contains('handle'))
    },
    removeOnSpill: true
  }

  constructor(private events: PubSubService, private inventoryService: InventoryService, private dragulaService: DragulaService/*, protected modalController: ModalController*/) {

  }

  /**
   * Se suscribe a los eventos 
   * 
   * @memberof SuperInventoryComponent
   */

  public ngOnInit(): void {
    this.events.$sub("scroll:stop").subscribe((message) => {
      this.scrollAllowed = false
      console.log("Message: " + message)
    })

    this.events.$sub("scroll:start").subscribe((message) => {
      this.scrollAllowed = true
      console.log("Message: " + message)
    })

    this.inventoryService.getInventory("inventory-" + this.suffix).then(success => {
      this.inventory = success
      this.checkEmptyInventory()
    }, error => {
      // Por el momento, no se necesita ninguna acción adicional en caso de
      // un error durante la recuperación de datos, ya que este caso se maneja
      // dentro del servicio de inventarios
    })
  }

  public addItem(addItemComponet: any, data: any, handler: Function): void {
    /*let modal = this.modalController.create(addItemComponet, data)
    modal.present()
    modal.onDidDismiss(data => {
      if (data !== undefined && data !== null) {
        handler(data)
      }
    })*/
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
   * @memberof SuperInventoryComponent
   */

  public ngOnDestroy(): void {
    //this.events.unsubscribe("scroll:stop")
    //this.events.unsubscribe("scroll:start")
  }

  /**
   * Función que verifica si el inventario se encuentra vacío, con el fin de
   * informarle a la vista si debe o no desplegar un mensaje que informe de esto
   * al usuario. Dado que cada inventario es diferente, la implementación de
   * cualquier componente hijo está forzada a sobreescribir esta función
   * 
   * @returns {boolean} 
   * @memberof SuperInventoryComponent
   */

  public checkEmptyInventory(): boolean {
    throw "checkEmptyInventory() function must be overridden in child class" + this.constructor.toString().match(/\w+/g)[1]
  }
}