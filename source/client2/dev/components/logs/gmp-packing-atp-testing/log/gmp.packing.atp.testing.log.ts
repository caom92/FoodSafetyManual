import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../../services/app.language'
import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { Log } from '../interfaces/gmp.packing.atp.testing.log.interface'
import { CustomValidators } from '../../../../directives/custom.validators';

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

  public ngOnInit(): void {
    this.setSuffix("gmp-packing-atp-testing")
    super.ngOnInit()
    this.initForm()
  }

  public initForm(): void {
    const currentDate = this.timeService.getISODate(new Date())
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
    const currentTime = this.timeService.getISOTime(new Date())
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
      corrective_action: [""], // TODO Max length
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