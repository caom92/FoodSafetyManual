import { Injectable } from '@angular/core'
import { MzToastService } from 'ngx-materialize'

// Servicio que despliega mensajes en la pantalla para informar al usuario 
// sobre los resultados que sus acciones tuvieron
@Injectable()
export class ToastService
{
  // El constructor de este servicio
  // hacemos uso del servicio de materialize para desplegar toasts
  constructor(private mzToastService: MzToastService) {

  }

  showText(text: string): void {
    this.mzToastService.show(text, 3500, 'rounded')
  }
}