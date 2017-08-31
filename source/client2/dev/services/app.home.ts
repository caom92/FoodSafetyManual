import { Injectable } from '@angular/core'

// Este servicio incluye todos los elementos y banderas encontrados en el 
// componente de la pantalla principal para que sean accedidos y modificados 
// por otros componentes 
@Injectable()
export class HomeElementsService
{
  // Bandera que indica si se debe desplegar el menu lateral
  showSideNav = true

  // Bandera que indica si se debe desplegar el menu de zonas
  showZoneMenu = false

  // La lista de zonas que seran desplegadas en el menu de zonas
  zones = []

  // El nombre completo del usuario que sera desplegado en el menu lateral
  userFullName: string = null

  // El nombre del rol del usuario
  roleName: string = null

  // Despliega el menu lateral
  displaySideNav() {
    this.showSideNav = true
  }

  // Oculta el menu lateral
  hideSideNav() {
    this.showSideNav = false
  }

  // Despliega el menu de zonas
  displayZoneMenu() {
    this.showZoneMenu = true
  }

  // Oculta el menu de zonas
  hideZoneMenu() {
    this.showZoneMenu = false
  }
}