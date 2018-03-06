import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.packing.atp.testing.log.interface'
import { LanguageService } from '../../../../services/app.language';

@Component({
  selector: 'gmp-packing-atp-testing-log',
  templateUrl: './gmp.packing.atp.testing.log.html'
})

export class GMPPackingATPTestingLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    private langManager: LanguageService,
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

    const control = <FormArray>this.captureForm.controls['areas']

    control.push(this.initEmptyEntry())
  }

  public initEmptyEntry(): FormGroup {
    let items = this._fb.array([])
    items.push(this.initEmptyItem(1))

    return this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      time: [this.timeService.getISOTime(new Date()), [Validators.required, Validators.maxLength(255)]],
      items: items
    })
  }

  resetForm() {
    // Para bitacoras basadas en entradas, se debe reiniciar el formulario como
    // si cargaramos nuevamente el componente
    this.initForm()
  }

  public addEntry(): void {
    let control = <FormArray>this.captureForm.controls['areas']
    control.push(this.initEmptyEntry())
  }

  public removeEntry(): void {
    let control = <FormArray>this.captureForm.controls['areas']
    if(control.controls.length > 1){
      let control = <FormArray>this.captureForm.controls['areas']
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  public initEmptyItem(test: number): FormGroup {
    return this._fb.group({
      test_number: [test, [Validators.required]],
      test1: [null, [Validators.required]],
      results1: [null, [Validators.required]],
      corrective_action: [null, [Validators.required]],
      test2: [null, [Validators.required]],
      results2: [null, [Validators.required]]
    })
  }

  public addItem(control: FormArray): void {
    console.log(control)
    control.push(this.initEmptyItem(control.controls.length + 1))
  }

  public removeItem(control: FormArray): void {
    if (control.controls.length > 1) {
      control.controls.pop()
      //this.logService.refreshFormGroup(this.entryForm)
    }
  }

  save() {
    console.log(this.captureForm)
    console.log(this.captureForm.value)
  }
}