import { OnInit } from '@angular/core'

import { SuperLog } from './super.logs.log.interface'

import { LogService } from '../../../services/app.logs'
import { LoaderService } from '../../../services/app.loaders'
import { NavController } from 'ionic-angular/navigation/nav-controller'
import { Storage } from '@ionic/storage'

export class SuperLogComponent implements OnInit {
  protected log: SuperLog
  private suffix: string = null

  constructor(protected logService: LogService, private storage: Storage) {

  }

  public ngOnInit(): void {
    this.storage.get("log-" + this.suffix).then(
      data => {
        if (data != null && data != undefined) {
          this.log = data
          this.initForm()
        } else {
          this.logService.log(this.suffix).then(success => {
            this.log = success
            this.initForm()
          }, error => {
            // Por el momento, no se necesita ninguna acción adicional en caso de
            // un error durante la recuperación de datos, ya que este caso se maneja
            // dentro del servicio de inventarios
          })
        }
      },
      error => {
        this.logService.log(this.suffix).then(success => {
          this.log = success
          this.initForm()
        }, error => {
          // Por el momento, no se necesita ninguna acción adicional en caso de
          // un error durante la recuperación de datos, ya que este caso se maneja
          // dentro del servicio de inventarios
        })
      }
    )
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

  public initForm(): void {

  }
}