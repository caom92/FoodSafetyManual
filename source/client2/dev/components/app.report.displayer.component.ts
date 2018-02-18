import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Observable } from 'rxjs/Rx'

import { LanguageService } from '../services/app.language'

@Component({
    selector: 'report-displayer',
    templateUrl: '../templates/app.report.displayer.component.html'
  })
export class ReportDisplayer implements OnInit {
  @Input()
  reports: any

  ngOnInit(){
    //this.reports = JSON.stringify(this.reports)
  }
}