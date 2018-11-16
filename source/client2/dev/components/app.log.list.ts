import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

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
    private routeState: ActivatedRoute
  ) {
  }

  // Esta funcion se invoca cuando el componente es inicializado
  ngOnInit(): void {
    // utilizando la zona, el programa y el modulo, obtenemos la lista de 
    // bitacoras de los permisos del usuario
    let zone = null
    let program = null
    let module = null

    this.routeState.paramMap.subscribe((params) => {
      zone = this.home.zone.name
      program = params.get('program')
      module = params.get('module')

      this.program = program
      this.module = module
      this.logs = []
      for (let i in this.home.privileges[zone][program].suffixes[module]) {
        this.logs.push({
          name: i,
          suffix: this.home.privileges[zone][program].suffixes[module][i].suffix
        })
      }
      this.logs.splice(0, 1)
    })
  }
}