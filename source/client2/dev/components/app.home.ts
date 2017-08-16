import { Component, OnInit } from '@angular/core'

// Componente que define el comportamiento de la pagina de inicio de sesion
@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.home.html'
})
export class HomeComponent implements OnInit
{
  isDirector = false
  zones = []
  userFullName = null

  // Esta funcion se ejecuta al iniciar la pagina
  ngOnInit() {
    // si no hay ningun idioma definimo, definimos el idioma español por defecto
    if (localStorage.lang === undefined) {
      localStorage.lang = 'es'
    }
  }
}
