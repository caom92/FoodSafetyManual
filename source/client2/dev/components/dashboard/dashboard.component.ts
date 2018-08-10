import { Component } from "@angular/core"
import { DashboardFile, DashboardDirectory } from "./dashboard.interface"
import { HomeElementsService } from "../../services/app.home"
import { StateService } from "@uirouter/core"
import { MenuService } from "../../services/app.menu"

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  dashboardIcons: Array<DashboardDirectory | DashboardFile> = []
  currentDirectory: Array<DashboardDirectory | DashboardFile> = []
  directories: Array<string> = []
  breadcrumbs: Array<string> = []
  errorDirectory: boolean = false
  errorNetwork: boolean = false
  loadingDirectory: boolean = true
  serverDirectory: Array<DashboardDirectory | DashboardFile> = null

  constructor(private homeElementsService: HomeElementsService, private router: StateService, private menuService: MenuService) {

  }

  ngOnInit() {
    if (this.serverDirectory == null) {
      this.getMenu()
    } else {
      this.getMenuSuccess()
    }
  }

  public getMenu(): void {
    this.menuService.getMenu().then(success => {
      this.serverDirectory = success
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

  public deleteElement(element: DashboardDirectory | DashboardFile): void {
    console.log('id of element to delete: ', element.id)
    console.log('details of element to delete', element)
  }

  public editElement(element: DashboardDirectory | DashboardFile): void {
    console.log('id of element to edit: ', element.id)
    console.log('details of element to edit', element)
  }
}