import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { HomeElementsService } from '../services/app.home'

// Componente que define el comportamiento de la pagina que lista las bitacoras 
// del modulo elegido por el usuario en el menu de navegacion lateral
@Component({
  templateUrl: '../templates/app.log.list.html'
})

export class LogListComponent implements OnInit {
  logs: Array<{ name: string, suffix: string }> = []
  program: string
  module: string

  constructor(private home: HomeElementsService, private routeState: ActivatedRoute) {

  }

  public ngOnInit(): void {
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