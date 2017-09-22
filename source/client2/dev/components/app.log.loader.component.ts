import { Component, OnInit } from '@angular/core'
import { StateService } from '@uirouter/angular'

@Component({
    templateUrl: '../templates/app.log.loader.component.html'
})

export class LogLoaderComponent implements OnInit{
    log_title: string = ""

    constructor(private router: StateService) {
    }

    ngOnInit(){
        $('ul.tabs').tabs();
        console.log(this.router.params)
        console.log(this.router.params.log.replace(/%20/g, " "))
        this.log_title = this.router.params.log.replace(/%20/g, " ")
    }
}