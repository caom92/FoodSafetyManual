import { OnDestroy, OnInit } from '@angular/core'
import { Events } from 'ionic-angular'

import { SuperReport } from './super.report.interface'

/**
 * Componente padre que corresponde a un 'loader', un componente que muestra la
 * fecha de un reporte y botones para interactuar con él, por ejemplo, abrir,
 * cerrar o solicitar en PDF
 * 
 * @export
 * @class SuperReportLoader
 * @implements {OnInit}
 * @implements {OnDestroy}
 */

export class SuperReportLoader implements OnInit, OnDestroy {
  protected report: SuperReport = null
  protected activeReport: string = "any"
  protected lang: string
  protected showReport: boolean = false

  constructor(protected events: Events) {

  }

  /**
   * Se suscribe al evento de mostrar reporte para actualizar el valor del
   * reporte activo cuyo loader debe mostrarse en pantalla
   * 
   * @memberof SuperReportLoader
   */

  public ngOnInit(): void {
    this.events.subscribe("reportEvent", (activeReport, time) => {
      this.activeReport = activeReport
    })
  }

  /**
   * Se desuscribe del evento de mostrar reporte
   * 
   * @memberof SuperReportLoader
   */

  public ngOnDestroy(): void {
    this.events.unsubscribe("reportEvent", () => {
      console.log("Report Event unsubscribed")
    })
  }

  /**
   * Publica un evento con el ID del reporte seleccionado para ocultar todos los
   * loaders, salvo aquel que corresponde al reporte activo
   * 
   * @memberof SuperReportLoader
   */

  public openHTMLReport(): void {
    this.showReport = true
    this.events.publish('reportEvent', this.report.report_id, Date.now());
  }

  /**
   * Publica un evento con el identificador "any", que indica que se deben
   * mostrar todos los loaders de los reportes solicitados en el rango de fechas
   * 
   * @memberof SuperReportLoader
   */

  public closeHTMLReport(): void {
    this.showReport = false
    this.events.publish('reportEvent', "any", Date.now())
  }
}