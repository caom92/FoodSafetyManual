import { Component, OnInit } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { StateService } from '@uirouter/angular'

// Componente que define el comportamiento de la pagina que lista las bitacoras 
// del modulo elegido por el usuario en el menu de navegacion lateral
@Component({
  templateUrl: '../templates/app.log.list.html'
})
export class LogListComponent implements OnInit
{
  // La lista de bitacoras que seran desplegadas en pantalla
  logs = []

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private router: StateService
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit() {
    // utilizando la zona, el programa y el modulo, obtenemos la lista de 
    // bitacoras de los permisos del usuario
    let zone = this.home.zone.name
    let program = this.router.params.program
    let module = this.router.params.module
    this.logs = Object.keys(
      this.home.privileges[zone][program].suffixes[module]
    )
    this.logs.splice(0, 1)
  }
}