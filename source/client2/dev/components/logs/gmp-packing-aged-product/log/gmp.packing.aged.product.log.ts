import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { DateTimeService } from '../../../../services/app.time'
import { ToastsService } from '../../../../services/app.toasts'
import { TranslationService } from '../../../../services/app.translation'
import { SuperLogComponent } from '../../super-logs/super.logs.log'
import { CaptureEntry } from '../interfaces/gmp.packing.aged.product.capture.interface'
import { Log } from '../interfaces/gmp.packing.aged.product.log.interface'

@Component({
  selector: 'gmp-packing-aged-product-log',
  templateUrl: './gmp.packing.aged.product.log.html'
})

export class GMPPackingAgedProductLogComponent extends SuperLogComponent implements OnInit {
  @Input() log: Log = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, log_info: { actions: [{ id: null, name: null }], quality_types: [{ id: null, name: null }] } }
  @Language() lang: string
  entries: Array<number> = []

  //public options: { en: Pickadate.DateOptions, es: Pickadate.DateOptions }
  public options: { en: any, es: any }

  constructor(private _fb: FormBuilder,
    private timeService: DateTimeService,
    private translationService: TranslationService,
    logService: LogService,
    toasts: ToastsService) {
    super(logService, toasts)
  }

  ngOnInit() {
    console.log(this.lang)
    this.options = { en: {
      format: 'dddd, dd mmm, yyyy',
      formatSubmit: 'yyyy-mm-dd',
      selectYears: true,
      selectMonths: true,
      firstDay: false,
      min: new Date("2016-10-01T00:00:00"),
      max: new Date()
    }, es: {
      format: 'dddd, dd mmm, yyyy',
      formatSubmit: 'yyyy-mm-dd',
      monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], // default 'January' through 'December'
      monthsShort: ["Ene", "Feb", "Mar", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], // default 'Jan' through 'Dec'
      weekdaysFull: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], // default 'Sunday' through 'Saturday'
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"], // default 'Sun' through 'Sat'
      weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      today: "Hoy", // default 'Today'
      close: "Cerrar", // default 'Close'
      clear: "Limpiar",
      labelMonthNext: "Siguiente", // default 'Next month'
      labelMonthPrev: "Anterior", // default 'Previous month'
      labelMonthSelect: "Elegir mes", // default 'Select a month'
      labelYearSelect: "Elegir año", //default 'Select a year'
      selectYears: true,
      selectMonths: true,
      firstDay: false,
      min: new Date("2016-10-01T00:00:00"),
      max: new Date()
    }
  }

    this.setSuffix("gmp-packing-aged-product")
    super.ngOnInit()
    this.initForm()
  }

  initForm() {
    this.captureForm = this._fb.group({
      entries: this._fb.array([])
    })
    this.entries = []

    const control = <FormArray>this.captureForm.controls['entries']

    control.push(this.initEmptyEntry())
    this.entries.push(this.entries.length + 1)
  }

  public initEmptyEntry(): FormGroup {
    return this._fb.group({
      batch: ["", [Validators.required]],
      warehouse: ["", [Validators.required]],
      vendor: ["", [Validators.required]],
      item: ["", [Validators.required]],
      age: [0, [Validators.required]],
      quality_id: ["", [Validators.required]],
      packed_date: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      location: ["", [Validators.required]],
      action_id: ["", [Validators.required]],
      album_url: ["", [Validators.required]],
      notes: ["", [Validators.required]],
      origin: ["",  [Validators.required]]
    })
  }

  public initEntry(entry: CaptureEntry): FormGroup {
    return this._fb.group({
      batch: [entry.batch, [Validators.required]],
      warehouse: [entry.warehouse, [Validators.required]],
      vendor: [entry.vendor, [Validators.required]],
      item: [entry.item, [Validators.required]],
      age: [entry.age, [Validators.required]],
      quality_id: [entry.quality_id, [Validators.required]],
      packed_date: [entry.packed_date, [Validators.required]],
      quantity: [entry.quantity, [Validators.required]],
      location: [entry.location, [Validators.required]],
      action_id: [entry.action_id, [Validators.required]],
      album_url: [entry.album_url, [Validators.required]],
      notes: [entry.notes, [Validators.required]],
      origin: [entry.origin, [Validators.required]]
    })
  }

  resetForm() {
    /*let currentTime = this.timeService.getISOTime(new Date())
    let items = []
    for (let item of this.log.items) {
      items.push({ id: item.id, test: null, calibration: false, sanitization: false, deficiencies: "", corrective_action: "" })
    }
    this.captureForm.reset({
      date: this.timeService.getISODate(new Date()),
      time: currentTime,
      items: items
    })*/
  }

  save() {
    console.log("dont save until ready")
    console.log(this.captureForm)


    for(let entry in this.entries){
      let tempEntry = this.captureForm.controls.entries as FormArray
      console.log(entry)
      let temp = tempEntry.controls[entry] as FormGroup
      console.log(temp.controls.packed_date)
      console.log(temp.controls.age)
    }
    //console.log(this.entries)
    //console.log(this.captureForm.controls.entries)
    //console.log(this.captureForm.value)
    
    //super.save()
    //let control = <FormArray>this.captureForm.controls['entries']
    /*for(let i = 0; i < 100; i++){
      control.push(this.initEmptyEntry())
      this.entries.push(this.entries.length + 1)
    }*/
    /*console.log(this.captureForm.value)
    let control = <FormArray>this.captureForm.controls['entries']
    control.push(this.initEmptyEntry())
    this.entries.push(this.entries.length + 1)*/
  }

  public onDateChange(event): void {
    console.log("date changed")
    console.log(event)
  }

  public addEntry(): void {
    let control = <FormArray>this.captureForm.controls['entries']
    control.push(this.initEmptyEntry())
    this.entries.push(this.entries.length + 1)
  }

  public removeEntry(): void {
    if(this.entries.length > 1){
      let control = <FormArray>this.captureForm.controls['entries']
      control.controls.pop()
      this.entries.pop()
      this.logService.refreshFormGroup(this.captureForm)
    }
  }
}