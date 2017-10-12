import { Component, Input } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

import { DateTimeService } from '../services/app.time'

@Component({
    selector: 'log-header',
    templateUrl: '../templates/app.log.header.html'
})

export class LogHeaderComponent {
    @Input()
    log: any//{zone_name: string, program_name: string, module_name: string, log_name: string}

    date: string = ""

    constructor(private timeService: DateTimeService){
        this.date = this.timeService.getISODate(new Date())
    }

    username = localStorage.user_full_name
}