import { Component, OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'
import { DomSanitizer } from '@angular/platform-browser'

import { Validators, FormGroup, FormBuilder } from '@angular/forms'

import { BackendService } from '../services/app.backend'
import { LanguageService } from '../services/app.language'

@Component({
  templateUrl: '../templates/app.log.loader.component.html'
})

export class LogLoaderComponent implements OnInit{
  log_title: string = ""
  manualDirectory: any
  logData: any = { zone_name: null, program_name: null, module_name: null, log_name: null, html_footer: null, areas: { corrective_actions: [{ id: null, code: null, en: null, es: null }], logs: [{ id: null, name: null, types: [{ id: null, name: null, items: [{ id: null, name: null, order: null }] }] }] } }// = {"zone_name":"LAW","program_name":"GMP","module_name":"Packing","log_name":"Pre-Operational Inspection","html_footer":"","areas":{"corrective_actions":[{"id":1,"code":"N/A","en":"None","es":"Ninguno"},{"id":2,"code":"RC","en":"Re-clean","es":"Volver a Limpiar"},{"id":3,"code":"WRS","en":"Wash/Rinse/Sanitize","es":"Lavar/Enjuagar/Sanitizar"}],"logs":[{"id":1,"name":"Warehouse","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":5,"name":"Stainless Table (5)","order":5},{"id":6,"name":"Roll Up Loading Doors","order":6},{"id":7,"name":"Forklift/Palletjack/Wave","order":7}]}]},{"id":2,"name":"Cooler #1","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":8,"name":"Floors","order":1},{"id":9,"name":"Cool Care Fans","order":2},{"id":10,"name":"Ceiling Lights","order":3},{"id":11,"name":"Trash Recepticales","order":4},{"id":12,"name":"Walls","order":5},{"id":13,"name":"Plastic Curtains","order":6},{"id":14,"name":"Cooling Units","order":7}]}]},{"id":3,"name":"Cooler #2","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":15,"name":"Floors","order":1},{"id":16,"name":"Ceiling Lights","order":2},{"id":17,"name":"Trash Recepticales","order":3},{"id":18,"name":"Walls","order":4},{"id":19,"name":"Plastic Curtains","order":5},{"id":20,"name":"Cooling Units","order":6}]}]},{"id":4,"name":"Cooler #3","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":21,"name":"Stainless Table 1","order":1},{"id":22,"name":"Stainless Table 2","order":2},{"id":23,"name":"Sorting Tub 1","order":3},{"id":24,"name":"Floors","order":4},{"id":25,"name":"Ceiling Lights","order":5},{"id":26,"name":"Lights over 2 tables","order":6},{"id":27,"name":"Trash Recepticales","order":7},{"id":28,"name":"Walls","order":8},{"id":29,"name":"Plastic Curtains","order":9},{"id":30,"name":"Cooling Units","order":10}]}]},{"id":5,"name":"Cooler #4","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":31,"name":"Floors","order":1},{"id":120,"name":"asdasf","order":1},{"id":32,"name":"Ceiling Lights","order":2},{"id":33,"name":"Trash Recepticales","order":3},{"id":34,"name":"Walls","order":4},{"id":35,"name":"Plastic Curtains","order":5},{"id":36,"name":"Cool Care Fans","order":6},{"id":37,"name":"Cooling Units","order":7},{"id":121,"name":"asdasf","order":9},{"id":124,"name":"xxxxxw","order":10},{"id":125,"name":"xxxxxw2","order":11},{"id":126,"name":"xxxxxw23","order":12},{"id":127,"name":"xxxxxw234","order":13},{"id":128,"name":"xxxxxw2344","order":14},{"id":129,"name":"xxxxxw23444","order":15},{"id":130,"name":"xxxxxw23444x","order":16},{"id":131,"name":"xxxxxw23444x123","order":17},{"id":132,"name":"xxxxxw23444x123xasd","order":18}]}]},{"id":6,"name":"Packaging Room #5","types":[{"id":1,"en":"Food Contact - Daily","es":"Contacto con alimentos - Diario","items":[{"id":39,"name":"Stainless Table 2","order":2},{"id":40,"name":"Stainless Table 3","order":3},{"id":41,"name":"Stainless Table 4","order":4},{"id":38,"name":"Stainless Table 1","order":5},{"id":42,"name":"Stainless Table 5","order":6},{"id":44,"name":"Stainless Table 7","order":7},{"id":43,"name":"Stainless Table 6","order":8},{"id":122,"name":"aefg","order":9},{"id":45,"name":"Stainless Table 8","order":10},{"id":123,"name":"aefgxxxxx","order":10}]},{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":46,"name":"Handwash Stations (3)","order":3},{"id":47,"name":"Floors","order":4},{"id":48,"name":"Drain 1","order":5},{"id":49,"name":"Drain 2","order":6},{"id":50,"name":"Drain 3","order":7},{"id":51,"name":"Drain 4","order":8},{"id":52,"name":"Trash Recepticales","order":9},{"id":53,"name":"Walls","order":10},{"id":54,"name":"Ceiling Lights","order":11},{"id":55,"name":"Cooling Units","order":12}]}]},{"id":7,"name":"Warehouse Annex","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":56,"name":"Floors","order":1},{"id":57,"name":"Ceiling Lights","order":2},{"id":58,"name":"Trash Recepticales","order":3},{"id":59,"name":"Rack Labels","order":4},{"id":60,"name":"Walls","order":5},{"id":61,"name":"Plastic Curtains","order":6}]}]},{"id":8,"name":"Department 1 & 2 Cooler #6","types":[{"id":1,"en":"Food Contact - Daily","es":"Contacto con alimentos - Diario","items":[{"id":65,"name":"Walls","order":4},{"id":66,"name":"Plastic Curtains","order":5},{"id":67,"name":"Cooling Units","order":6},{"id":68,"name":"Floors","order":7}]},{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":62,"name":"Floors","order":1},{"id":63,"name":"Ceiling Lights","order":2},{"id":64,"name":"Trash Recepticales","order":3},{"id":69,"name":"Ceiling Lights","order":8},{"id":70,"name":"Trash Recepticales","order":9},{"id":71,"name":"Walls","order":10},{"id":72,"name":"Plastic Curtains","order":11},{"id":73,"name":"Cooling Units","order":12}]}]},{"id":9,"name":"Packing Room #7","types":[{"id":1,"en":"Food Contact - Daily","es":"Contacto con alimentos - Diario","items":[{"id":74,"name":"Stainless Table 1","order":1},{"id":75,"name":"Stainless Table 2","order":2},{"id":76,"name":"Stainless Table 3","order":3},{"id":77,"name":"Stainless Table 4","order":4},{"id":78,"name":"Stainless Table 5","order":5},{"id":79,"name":"Stainless Table 6","order":6},{"id":80,"name":"Stainless Table 1","order":7},{"id":81,"name":"Stainless Table 2","order":8},{"id":82,"name":"Stainless Table 3","order":9},{"id":83,"name":"Stainless Table 1","order":10},{"id":84,"name":"Stainless Table 2","order":11},{"id":85,"name":"Stainless Table 3","order":12},{"id":86,"name":"Stainless Table 1","order":13},{"id":87,"name":"Stainless Table 2","order":14},{"id":88,"name":"Stainless Table 3","order":15},{"id":89,"name":"Stainless Table Equipment (1)(2)(3)(4)","order":16}]},{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":90,"name":"Floors","order":17},{"id":91,"name":"Trash Recepticales","order":18},{"id":92,"name":"Hand Wash Station","order":19},{"id":93,"name":"Walls","order":20},{"id":94,"name":"Plastic Curtains","order":21},{"id":95,"name":"Label Equipment(1)(2)(3)(4)","order":22},{"id":96,"name":"Overhead Structures","order":23}]}]},{"id":10,"name":"Women Restroom #1","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":97,"name":"Toilets","order":1},{"id":98,"name":"Sanitary Dispenser","order":2},{"id":99,"name":"Floors","order":3},{"id":100,"name":"Trash Recepticales","order":4}]}]},{"id":11,"name":"Women Restroom #2","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":101,"name":"Toilets","order":1},{"id":102,"name":"Sanitary Dispenser","order":2},{"id":103,"name":"Floors","order":3},{"id":104,"name":"Trash Recepticales","order":4}]}]},{"id":12,"name":"Break Area","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":105,"name":"Floors","order":1},{"id":106,"name":"Tables","order":2},{"id":107,"name":"Microwaves (7)","order":3},{"id":108,"name":"Refrigerator","order":4},{"id":109,"name":"Trash Recepticales","order":5},{"id":110,"name":"Wash & Drier","order":6},{"id":111,"name":"Lockers","order":7}]}]},{"id":13,"name":"Men Restroom","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":112,"name":"Urinals","order":1},{"id":113,"name":"Toilets","order":2},{"id":114,"name":"Floors","order":3}]}]},{"id":14,"name":"Women Restroom","types":[{"id":2,"en":"Non Food Contact - Daily","es":"Sin contacto con alimentos - Diario","items":[{"id":116,"name":"Toilets","order":1},{"id":117,"name":"Sanitary Dispenser","order":2},{"id":118,"name":"Floors","order":3},{"id":115,"name":"Trash Recepticales","order":4},{"id":119,"name":"Trash Recepticales","order":4}]}]},{"id":15,"name":"Area Prueba","types":[{"id":1,"en":"Food Contact - Daily","es":"Contacto con alimentos - Diario","items":[{"id":133,"name":"Area Prueba #1","order":1}]}]}]}}
  public reportDateRangeForm: FormGroup = new FormBuilder().group({})
  start_date: string = ""
  end_date: string = ""
  suffix: string = ""

  constructor(private router: StateService, private server: BackendService, private sanitizer: DomSanitizer, private _fb: FormBuilder, private langManager: LanguageService) {
  }

  ngOnInit(){
    console.log("Init of app.log.loader.component.ts")
    this.reportDateRangeForm = this._fb.group({
      start_date: [this.start_date, [Validators.required, Validators.minLength(1)]],
      end_date: [this.end_date, [Validators.required, Validators.minLength(1)]]
    })

        /*$('.datepicker').pickadate({
          selectMonths: false, // Creates a dropdown to control month
          selectYears: false, // Creates a dropdown of 15 years to control year,
          today: 'Today',
          clear: 'Clear',
          close: 'Ok',
          format: 'yyyy-mm-dd',
          closeOnSelect: true // Close upon selecting a date,
        });*/

    this.suffix = this.router.params.suffix

    let logManualFormData = new FormData
    logManualFormData.append("log-suffix", this.suffix)

    this.server.update(
      'get-log-manual-url', 
      logManualFormData, 
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            this.log_title = response.data.log_name
            this.manualDirectory = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost/espresso/" + response.data.manual_location + "law/actual_manual.pdf")
          }
        } else {
                            
        }
      }
    )
  }

  requestReports(model: any){
    console.log(this.reportDateRangeForm)
    console.log(this.reportDateRangeForm.value)
    console.log(this.start_date)
    console.log(this.end_date)

    let formData = new FormData()

    for(let key in this.reportDateRangeForm.value){
      formData.append(key, this.reportDateRangeForm.value[key])
    }

    this.server.update(
      'report-gmp-packing-preop',
      formData,
      (response: any) => {
        console.log(response)
        console.log(JSON.stringify(response))
      }
    )
  }

  /*manualDirectory(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.manualUrl)
  }*/
}