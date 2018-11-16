import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { MzModalService } from 'ngx-materialize'

import { BackendService } from '../services/app.backend'
import { HomeElementsService } from '../services/app.home'
import { LanguageService } from '../services/app.language'
import { ToastService } from '../services/app.toast'
import { ProgressModalComponent } from './modal.please.wait'

// Componente que define el comportamiento de la pagina donde se pueden enviar 
// reportes de error
@Component({
  templateUrl: '../templates/app.report.problem.html'
})
export class ReportProblemComponent implements OnInit
{
  // Interfaz para el formulario donde se capturan los datos de la bitacora 
  // donde se encontro el problema
  infoForm: FormGroup

  // Interfaz para el formulario donde se captura la descripcion de lo que 
  // ocurrio al generarse el problema
  summaryForm: FormGroup

  // La lista de las zonas que el usuario puede elegir en el formulario
  zones = []

  // La lista de los programas que el usuario puede elegir en el formulario
  programs = []

  // La lista de los modulos que el usuario puede elegir en el formulario
  modules = []

  // La lista de las bitacoras que el usuario puede elegir en el formulario
  logs = []

  // Un diccionario que contiene las bitacoras accesibles por el usuario 
  // organizadas en zonas, programas, modulos y bitacoras
  accesibleLogs: any = {}

  // La lista de los navegadores web que el usuario puede elegir en el 
  // formulario
  browsers = [
    'Internet Explorer',
    'Firefox',
    'Chrome',
    'Opera',
    'Safari',
    'Other'
  ]

  // El constructor del componente importando los servicios y componentes 
  // necesarios
  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private router: Router,
    private toastManager: ToastService,
    private formBuilder: FormBuilder,
    private langManager: LanguageService,
    private modalManager: MzModalService
  ) {
  }

  // Esta funcion se invoca al iniciar el componente
  ngOnInit(): void {
    // primero inicializamos el formulario de la parte superior junto con sus 
    // reglas de validacion
    this.infoForm = this.formBuilder.group({
      username: [ null, null],
      employeeNum: [ null, null ],
      zone: [ null, Validators.required ],
      program: [ null, Validators.required ],
      module: [ null, Validators.required ],
      log: [ null, Validators.required ],
      browser: [ [], Validators.required ],
      severity: [ null, Validators.required ]
    })

    // Llenamos los campos del nombre de usuario y ID de empleado con los 
    // valores correspondientes y los desabilitamos para que el usuario no 
    // pueda editarlos
    this.infoForm.controls['username'].setValue(this.home.loginName)
    this.infoForm.controls['username'].disable()
    this.infoForm.controls['employeeNum'].setValue(this.home.employeeNum)
    this.infoForm.controls['employeeNum'].disable()

    // Luego iniciamos el formulario de captura de la parte inferior de la
    // pagina junto con sus reglas de validacion
    this.summaryForm = this.formBuilder.group({
      summary: [ null, Validators.compose([
        Validators.required, Validators.maxLength(1024)
      ])],
      steps: [ null, Validators.maxLength(1024) ],
      expectation: [ null, Validators.maxLength(1024) ],
      reality: [ null, Validators.maxLength(1024) ]
    })

    // Llenamos la lista de zonas dependiendo del rol del usuario
    let zones = {}
    switch (this.home.roleName) {
      case 'Administrator':
        for (let z of this.home.zones) {
          zones[z['name']] = {}
          for (let p of this.home.logs) {
            zones[z['name']][p['name']] = {}
            for (let m of p['modules']) {
              zones[z['name']][p['name']][m['name']] = []
              for (let l of m['logs']) {
                zones[z['name']][p['name']][m['name']].push(l['name'])
              }
            }
          }
        }
        this.accesibleLogs = zones
        this.zones = this.home.zones
      break

      case 'Director':
        for (let z of this.home.zones) {
          zones[z['name']] = {}
          for (let p of Object.keys(this.home.privileges[z['name']])) {
            zones[z['name']][p] = {}
            for (
              let m of Object.keys(this.home.privileges[z['name']][p]['names'])
            ) {
              zones[z['name']][p][m] = []
              for (
                let log of 
                Object.keys(this.home.privileges[z['name']][p]['names'][m])
              ) {
                if (log != 'suffix') {
                  zones[z['name']][p][m].push(log)
                }
              }
            }
          }
        }
        this.accesibleLogs = zones
        this.zones = this.home.zones
      break

      default:
        this.zones.push(this.home.zone)
        for (let z of this.zones) {
          zones[z['name']] = {}
          for (let p of Object.keys(this.home.privileges[z['name']])) {
            zones[z['name']][p] = {}
            for (
              let m of Object.keys(this.home.privileges[z['name']][p]['names'])
            ) {
              zones[z['name']][p][m] = []
              for (
                let log of 
                Object.keys(this.home.privileges[z['name']][p]['names'][m])
              ) {
                if (log != 'suffix') {
                  zones[z['name']][p][m].push(log)
                }
              }
            }
          }
        }
        this.accesibleLogs = zones
      break
    }
  }

  // Esta funcion se invoca cuando el usuario selecciona una zona de la lista 
  // de seleccion
  onZoneSelected(): void {
    // cargamos la lista de programas a las cuales el usuario tiene permiso de 
    // acceder en la lista de seleccion de programas del formulario
    let zone = this.infoForm.controls['zone'].value
    this.programs = Object.keys(this.accesibleLogs[zone])
  }

  // Esta funcion se invoca cuando el usuario selecciona un programa de la 
  // lista de seleccion
  onProgramSelected(): void {
    // cargamos la lista de modulos a los cuales el usuario tiene permiso de 
    // acceder en la lista de seleccion de modulos del formulario
    let zone = this.infoForm.controls['zone'].value
    let program = this.infoForm.controls['program'].value
    this.modules = Object.keys(this.accesibleLogs[zone][program])
  }

  // Esta funcion se invoca cuando el usuario selecciona un modulo de la 
  // lista de seleccion
  onModuleSelected(): void {
    // cargamos la lista de bitacoras a las cuales el usuario tiene permiso de 
    // acceder en la lista de seleccion de bitacoras del formulario
    let zone = this.infoForm.controls['zone'].value
    let program = this.infoForm.controls['program'].value
    let module = this.infoForm.controls['module'].value
    this.logs = this.accesibleLogs[zone][program][module]
  }

  // Esta funcion se invoca cuando el usuario hace clic en el boton para enviar 
  // el reporte de error
  onReportProblemFormSubmit(): void {
    // mostramos el modal que le indica al servidor que se esta procesando su 
    // peticion
    let modal = this.modalManager.open(
      ProgressModalComponent
    )

    // cramos una instancia que contenga los datos del formulario, utilizando 
    // como base el formulario que capturo las imagenes subidas por el usuario
    let data = new FormData()

    // Debido a que el autor no pudo encontrar una forma de emplear campos de 
    // entrada de archivos con las interfaces de formularios de Reactive, lo 
    // que se hizo fue que el formulario se dividio en 2 partes (en realidad 
    // 3, debido a que la parte que captura los archivos esta en medio de las 
    // otras dos), uno donde se capturan los archivos de imagenes y que se 
    // programa utilizando formularios estandares de HTML5 y la otra donde se 
    // encuentran todos los demas datos de captura y se emplea usando las 
    // interfaces de formularios de Reactive; al final, cuando el usuario 
    // envia el reporte, se concatenaran los datos de los 3 formularios en 
    // una sola interfaz que sera enviada al servidor

    // obtenemos el campo de archivos
    let fileInput: HTMLInputElement = 
      <HTMLInputElement>document.getElementById('screenshot-attachment')

    // revisamos si el usuario capturo archivos en este campo
    if (fileInput.files.length > 0) {
      // si lo hizo, las adjuntamos una por una a los datos que seran enviados 
      // al servidor
      for (let i = 0; i < fileInput.files.length; ++i) {
        data.append(`screenshot-attachment[${ i }]`, fileInput.files[i])
      }
    }

    // agregamos a esta instancia, los valores de los campos de los 
    // formularios de la parte superior e inferior de la pantalla 
    data.append(
      'problem-zone-selection', this.infoForm.controls['zone'].value
    )
    data.append(
      'procedure-selection', this.infoForm.controls['program'].value
    )
    data.append(
      'module-selection', this.infoForm.controls['module'].value
    )
    data.append(
      'log-selection', this.infoForm.controls['log'].value
    )
    for (let i = 0; i < this.infoForm.controls['browser'].value.length; ++i) {
      data.append(
        `browser-selection[${ i }]`, 
        this.infoForm.controls['browser'].value[i]
      ) 
    }
    data.append(
      'severity-selection', this.infoForm.controls['severity'].value
    )
    data.append(
      'summary', this.summaryForm.controls['summary'].value
    )
    data.append(
      'steps', this.summaryForm.controls['steps'].value
    )
    data.append(
      'expectation', this.summaryForm.controls['expectation'].value
    )
    data.append(
      'reality', this.summaryForm.controls['reality'].value
    )

    // finalmente, enviamos los datos al servidor 
    this.server.update(
      'send-bug-report',
      data,
      (response: any) => {
        // cerramos el modal con el icono de progreso
        modal.instance.modalComponent.closeModal()

        // damos retroalimentacion al usuario del resultado obtenido
        this.toastManager.showText(
          this.langManager.getServiceMessage(
            'send-bug-report', response.meta.return_code
          )
        )

        // si el servidor respondio con exito...
        if (response.meta.return_code == 0) {
          // redireccionamos al usuario a otra pantalla
          this.router.navigate(['/menu'])
        }
      } // (response: Response)
    ) // this.server.update
  } // onReportProblemFormSubmit()
} // export class ReportProblemComponent implements OnInit