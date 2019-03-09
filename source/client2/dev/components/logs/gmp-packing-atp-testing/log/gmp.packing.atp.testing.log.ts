import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { CustomValidators } from '../../../../directives/custom.validators'
import { LanguageService } from '../../../../services/app.language'
import { ToastsService } from '../../../../services/app.toasts'
import { LogService } from '../../../../services/log.service'
import { DateTimeService } from '../../../../services/time.service'
import { TranslationConfigService } from '../../../../services/translation-config.service'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.packing.atp.testing.log.interface'

@Component({
  selector: 'gmp-packing-atp-testing-log',
  templateUrl: './gmp.packing.atp.testing.log.html'
})

export class GMPPackingATPTestingLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = null//{ zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null }
  @Language() lang: string

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationConfig: TranslationConfigService,
    private langManager: LanguageService,
    logService: LogService,
    toastService: ToastsService) {
    super(logService, toastService)
  }

  public ngOnInit(): void {
    this.setSuffix('gmp-packing-atp-testing')
    super.ngOnInit()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate()
    this.captureForm = this._fb.group({
      date: [currentDate, [Validators.required, CustomValidators.dateValidator()]],
      notes: [null, Validators.maxLength(65535)],
      areas: this._fb.array([])
    })

    const control = <FormArray>this.captureForm.controls['areas']

    control.push(this.initEmptyEntry())
    this.cleanForm()
  }

  public initEmptyEntry(): FormGroup {
    const currentTime = this.timeService.getISOTime()
    let items = this._fb.array([])
    items.push(this.initEmptyItem(1))

    return this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      time: [currentTime, [Validators.required, Validators.maxLength(255)]],
      items: items
    })
  }

  resetForm() {
    // Para bitacoras basadas en entradas, se debe reiniciar el formulario como
    // si cargaramos nuevamente el componente
    this.initForm()
  }

  public addEntry(): void {
    const control = <FormArray>this.captureForm.controls['areas']
    control.push(this.initEmptyEntry())
    this.cleanForm()
  }

  public removeEntry(): void {
    const control = <FormArray>this.captureForm.controls['areas']
    if (control.controls.length > 1) {
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
      corrective_action: [''], // TODO Max length
      test2: [null],
      results2: [null]
    })
  }

  public addItem(control: FormArray): void {
    control.push(this.initEmptyItem(control.controls.length + 1))
    this.cleanForm()
  }

  public removeItem(control: FormArray): void {
    if (control.controls.length > 1) {
      control.controls.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }

  // TODO: Realizar una implementación para pruebas individuales
  public cleanForm(): void {
    for (let a in (<FormGroup>this.captureForm.controls.areas).controls) {
      const area = (<FormGroup>(<FormGroup>this.captureForm.controls.areas).controls[a])
      for (let i in (<FormGroup>area.controls.items).controls) {
        const item = (<FormGroup>(<FormGroup>area.controls.items).controls[i])
        if (item.controls.results1.value == false) {
          item.enable()
        } else if (item.controls.results1.value == true || item.controls.results1.value == undefined) {
          item.controls.corrective_action.disable()
          item.controls.test2.disable()
          item.controls.results2.disable()
        }
      }
    }
  }
}