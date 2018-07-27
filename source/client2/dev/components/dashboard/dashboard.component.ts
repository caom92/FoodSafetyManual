import { Component } from "@angular/core"
import { DashboardFile, DashboardDirectory, AbstractDashboardElement } from "./dashboard.interface"
import { HomeElementsService } from "../../services/app.home"
import { StateService } from "@uirouter/core"

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

  constructor(private homeElementsService: HomeElementsService, private router: StateService) {

  }

  ngOnInit() {
    let temp: DashboardDirectory = { type: 'directory', name: 'BCN Packing', children: [] }
    temp.children.push({ name: 'BCN-00 INTRO', url: '#/edit-profile', type: 'file' })
    temp.children.push({ name: 'BCN-01 REGISTRO', url: '#/edit-profile', type: 'file' })
    temp.children.push({ name: 'BCN-02 INFRAESTRUCTURA PREVENTIVA', url: '#/edit-profile', type: 'file' })
    temp.children.push({ name: 'HIGIENE', url: '#/edit-profile', type: 'file' })

    let temp2 = { name: 'Intro', type: 'directory', children: [] }

    temp2.children.push({ image: 'https://www.w3schools.com/css/paris.jpg', name: 'Pre-operational BCN-02415-23-FG-14', url: '#/edit-profile', type: 'file' })
    
    temp.children.push(temp2)

    //temp.children.push({ name: 'Empty Directory', type: 'directory', children: [] })

    temp.children.push({ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Empty Directory', type: 'directory', children: [{ name: 'Porno :V', type: 'directory', children: [] }] }] }] }] }] }] }] }] }] }] }] }] }] })

    this.dashboardIcons.push(temp)
    
    if (this.router.params.path === '') {
      this.currentDirectory = this.dashboardIcons
    } else {
      this.currentDirectory = this.dashboardIcons
      let path: string = decodeURI(this.router.params.path)
      this.directories = path.split('/')
      //let directories: Array<string> = path.split('/')
      //console.log(this.directories)
      let accumulatedDirectory = ''
      let matches = 0
      for (let directory of this.directories) {
        accumulatedDirectory += '/' + directory
        this.breadcrumbs.push(accumulatedDirectory)
        for (let icon in this.currentDirectory) {
          //console.log('evaluated icon name: ', this.currentDirectory[icon].name)
          if (this.currentDirectory[icon].name == directory) {
            console.log('directory match', this.currentDirectory[icon].name, directory)
            matches++
            this.currentDirectory = (<DashboardDirectory>this.currentDirectory[icon]).children
            break
          }
        }
      }
      if (matches != this.directories.length) {
        this.currentDirectory = []
        console.log('no te quieras pasar de verga', matches, this.directories.length)
        this.errorDirectory = true
      } else {
        console.log('todo bien prro', matches, this.directories.length)
        this.errorDirectory = false
      }
      console.log('directory', this.currentDirectory)
      console.log('breadcrumbs', this.breadcrumbs)
    }

    //console.log(this.homeElementsService)
    //console.debug(this.router.params.path)
    /*this.dashboardIcons.push({ name: 'Google D', url: 'http://google.com', icon: 'google', type: 'directory' })
    this.dashboardIcons.push({ name: 'YouTube E', url: 'http://youtube.com', icon: 'play', type: 'directory' })
    this.dashboardIcons.push({ name: 'Facebook F', url: 'http://facebook.com', icon: 'facebook', type: 'directory' })
    this.dashboardIcons.push({ name: 'Twitter G', url: 'http://twitter.com', icon: 'twitter', type: 'directory' })
    this.dashboardIcons.push({ image: 'https://www.w3schools.com/css/paris.jpg', name: 'Pre-operational BCN-02415-23-FG-14', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'Hand Washing', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'Document Control', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'Finished Product', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'Scale Calibration', url: '#/edit-profile', icon: 'content-save', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-00 INTRO', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-01 REGISTRO', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-02 INFRAESTRUCTURA PREVENTIVA', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-03 HIGIENE', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-04 ANIMALES DOMESTICOS Y SILVESTRES', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-05 CAPACITACION Y DESARROLLO DE HABILIDADES', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-06 EVALUACIONES INTERNAS Y REGULATORIAS', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-07 VALIDACIÓN', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-08 TRAZABILIDAD Y RECUPERO DE VEGETALES', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-09 HISTORIAL', url: '#/edit-profile', type: 'file' })
    this.dashboardIcons.push({ name: 'BCN-10 AGUA DE USO AGRÍCOLA Y HUMANO', url: '#/edit-profile', type: 'file' })*/
  }
}