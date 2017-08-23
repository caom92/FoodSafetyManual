import { Component, OnInit } from '@angular/core'
import { HomeElementsService } from '../services/app.home'
import { BackendService } from '../services/app.backend'
import { StateService } from '@uirouter/angular'
import { ToastService } from '../services/app.toast'

@Component({
  templateUrl: '../templates/app.edit.profile.html'
})
export class EditProfileComponent implements OnInit
{
  username = localStorage.login_name
  employeeID = localStorage.employee_num
  fullName = `${ localStorage.first_name } ${ localStorage.last_name }`

  constructor(
    private home: HomeElementsService,
    private server: BackendService,
    private router: StateService,
    private toastManager: ToastService
  ) {
  }

  ngOnInit() {
    this.home.displaySideNav()
    this.home.userFullName = this.fullName
  }
}