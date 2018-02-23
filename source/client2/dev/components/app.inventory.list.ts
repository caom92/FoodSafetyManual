import { Component, OnInit } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { StateService } from '@uirouter/angular'
import { LanguageService } from '../services/app.language'

// Componente que define el comportamiento de la pagina que lista las bitacoras 
// que tienen inventario del modulo elegido por el usuario en el menu de 
// navegacion lateral
@Component({
  templateUrl: '../templates/app.inventory.list.html'
})
export class InventoryListComponent implements OnInit
{
  // Bandera que indica si el modulo seleccionado tiene al menos 1 bitacora con 
  // inventario
  hasInventory = true 

  // La lista de bitacoras que seran desplegadas en pantalla
  logs = []

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private router: StateService,
    private langManager: LanguageService
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    // utilizando la zona, el programa y el modulo, obtenemos la lista de 
    // bitacoras de los permisos del usuario
    let zone = this.home.zone.name
    let program = this.router.params.program
    let module = this.router.params.module
    let logs = this.home.privileges[zone][program].suffixes[module]

    // solo hay que agregar a la lista de bitacoras aquellas que tienen 
    // inventario
    for (let i in logs) {
      if (i != 'suffix' && logs[i].has_inventory) {
        let temp = logs[i]
        temp.name = i
        this.logs.push(temp)
      }
    }

    // revisamos si al final, este modulo tiene al menos 1 bitacora con 
    // inventario
    this.hasInventory = this.logs.length > 0  
  }
}