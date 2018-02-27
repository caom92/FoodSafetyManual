import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureEntry } from '../interfaces/gmp.packing.atp.testing.capture.interface'
import { Log } from '../interfaces/gmp.packing.atp.testing.log.interface'

@Component({
  selector: 'gmp-packing-atp-testing-log',
  templateUrl: './gmp.packing.atp.testing.log.html'
})

export class GMPPackingATPTestingLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null }
  @Language() lang: string
  //entries: Array<number> = []

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    this.setSuffix("gmp-packing-aged-product")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      date: [this.timeService.getISODate(new Date()), [Validators.required, Validators.minLength(1)]],
      areas: this._fb.array([])
    })
    //this.entries = []

    const control = <FormArray>this.captureForm.controls['areas']

    control.push(this.initEmptyEntry())
    //this.entries.push(this.entries.length + 1)
  }

  public initEmptyEntry(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      time: [this.timeService.getISOTime(new Date()), [Validators.required, Validators.maxLength(255)]],
      items: this._fb.array([])
    })
  }

  resetForm() {
    // Para bitacoras basadas en entradas, se debe reiniciar el formulario como
    // si cargaramos nuevamente el componente
    this.initForm()
  }

  save() {
    console.log(this.captureForm.value)
  }

  public addEntry(): void {
    let control = <FormArray>this.captureForm.controls['areas']
    control.push(this.initEmptyEntry())
    console.log(this.captureForm.value)
    //this.entries.push(this.entries.length + 1)
  }

  public removeEntry(): void {
    let control = <FormArray>this.captureForm.controls['areas']
    if(control.controls.length > 1){
      let control = <FormArray>this.captureForm.controls['areas']
      control.controls.pop()
      //this.entries.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }
}