import { Component, OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'

import { HomeElementsService } from '../services/app.home'

// Componente que define el comportamiento de la pagina que lista las bitacoras 
// del modulo elegido por el usuario en el menu de navegacion lateral
@Component({
  templateUrl: '../templates/app.log.list.html'
})
export class LogListComponent implements OnInit
{
  // La lista de bitacoras que seran desplegadas en pantalla
  logs = []
  program: string
  module: string

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private router: StateService
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    // utilizando la zona, el programa y el modulo, obtenemos la lista de 
    // bitacoras de los permisos del usuario
    let zone = this.home.zone.name
    let program = this.router.params.program
    let module = this.router.params.module
    this.program = program
    this.module = module
    for (let i in this.home.privileges[zone][program].suffixes[module]) {
      this.logs.push({
        name: i,
        suffix: this.home.privileges[zone][program].suffixes[module][i].suffix
      })
    }
    this.logs.splice(0, 1)
  }
}