import { Component, OnInit } from '@angular/core'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { MenuService } from '../../services/app.menu'
import { DashboardDirectory, DashboardFile, DashboardLink } from '../dashboard/dashboard.interface'

@Component({
  templateUrl: 'menu-audit.component.html',
  selector: 'menu-audit'
})

export class MenuAuditComponent implements OnInit {
  @Language() lang: string
  currentDirectory: Array<DashboardDirectory | DashboardLink | DashboardFile> = []
  parentDirectoryID: number = null
  directories: Array<string> = []
  breadcrumbs: Array<string> = []
  errorDirectory: boolean = false
  errorNetwork: boolean = false
  loadingDirectory: boolean = true
  serverDirectory: Array<DashboardDirectory | DashboardLink | DashboardFile> = null
  
  json: string = ''

  constructor(private router: StateService, private menuService: MenuService) {

  }

  public ngOnInit(): void {
    if (this.serverDirectory == null) {
      this.getMenu(Number(this.router.params.user_id))
    } else {
      this.getMenuSuccess()
    }
  }

  public getMenu(userID: number): void {
    this.menuService.getMenu(userID).then(success => {
      this.json = JSON.stringify(success)
      this.serverDirectory = success.menu
      this.getMenuSuccess()
    }, error => {
      this.getMenuError()
    })
  }

  public getMenuSuccess(): void {
    this.errorNetwork = false
    this.loadingDirectory = false
    if (this.router.params.path === '') {
      this.currentDirectory = this.serverDirectory
      this.parentDirectoryID = null
    } else {
      this.currentDirectory = this.serverDirectory
      this.setPath()
      let accumulatedDirectory = ''
      let matches = 0
      for (let directory of this.directories) {
        accumulatedDirectory += '/' + directory
        this.breadcrumbs.push(accumulatedDirectory)
        for (let icon in this.currentDirectory) {
          if (this.currentDirectory[icon].name == directory) {
            matches++
            this.parentDirectoryID = this.currentDirectory[icon].id
            this.currentDirectory = (<DashboardDirectory>this.currentDirectory[icon]).children
            break
          }
        }
      }

      if (matches != this.directories.length) {
        this.currentDirectory = []
        this.errorDirectory = true
      } else {
        this.errorDirectory = false
      }
    }
  }

  public getMenuError(): void {
    this.setPath()
    this.loadingDirectory = false
    this.errorNetwork = true
  }

  public setPath(): void {
    let path: string = decodeURI(this.router.params.path)
    this.directories = path.split('/')
  }
}