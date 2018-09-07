import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/core'
import { Language } from 'angular-l10n'

import { AlertController } from '../../services/alert/app.alert'
import { HomeElementsService } from '../../services/app.home'
import { MenuService } from '../../services/app.menu'
import { DashboardDirectory, DashboardFile, LocalURL } from './dashboard.interface'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  @Language() lang: string
  dashboardIcons: Array<DashboardDirectory | DashboardFile> = []
  currentDirectory: Array<DashboardDirectory | DashboardFile> = []
  parentDirectoryID: number = null
  directories: Array<string> = []
  breadcrumbs: Array<string> = []
  errorDirectory: boolean = false
  errorNetwork: boolean = false
  addMode: boolean = false
  editMode: boolean = false
  preview: DashboardDirectory | DashboardFile = { name: 'preview' }
  previewURL = null
  isIcon: boolean = true
  originalImage: string = null
  loadingDirectory: boolean = true
  serverDirectory: Array<DashboardDirectory | DashboardFile> = null
  iconForm: FormGroup = new FormBuilder().group({})
  localURLs: Array<LocalURL> = []

  constructor(private homeElementsService: HomeElementsService, private router: StateService, private menuService: MenuService, private alertCtrl: AlertController, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initLocalURLs()

    if (this.serverDirectory == null) {
      this.getMenu()
    } else {
      this.getMenuSuccess()
    }

    this.iconForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      type: ['directory'],
      name: [null, [Validators.maxLength(255)]],
      icon: [null, [Validators.maxLength(255)]],
      url: [null, [Validators.maxLength(65535)]],
      localUrl: [null, [Validators.maxLength(65535)]],
      image: [null]
    })

    this.iconForm.controls.url.disable()
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

  public initLocalURLs(): void {
    let programs = JSON.parse(localStorage.getItem('programs'))
    for (let program in programs) {
      for (let mod in programs[program].names) {
        for (let log in programs[program].names[mod]) {
          if (log !== 'suffix') {
            this.localURLs.push({ name: 'Bitácora ' + program + ' - ' + mod + ' - ' + log, route: '#/log/' + programs[program].names[mod][log].suffix })
            if (programs[program].names[mod][log].has_inventory) {
              this.localURLs.push({ name: 'Inventario ' + program + ' - ' + mod + ' - ' + log, route: '#/inventory/' + programs[program].names[mod][log].suffix })
            }
          }
        }
      }
    }
  }

  public isURLLocal(url: string): boolean {
    for (let log of this.localURLs) {
      if (log.route === url) {
        return true
      }
    }
    return false
  }

  public deleteElement(element: DashboardDirectory | DashboardFile): void {
    let confirmDelete = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Está seguro de que desea eliminar el siguiente elemento?<br><br>' + element.name,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Borrar',
          handler: () => {
            this.menuService.deleteElement(element.id).then(success => {
              let deleteID = this.currentDirectory.findIndex((x => x.id == element.id))
              this.currentDirectory.splice(deleteID, 1)
            })
          }
        }
      ]
    })
  }

  public enableAddMode(): void {
    this.addMode = true

    this.iconForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      type: ['directory'],
      name: [null, [Validators.maxLength(255)]],
      icon: [null, [Validators.maxLength(255)]],
      url: [null, [Validators.maxLength(65535)]],
      localUrl: [null, [Validators.maxLength(65535)]],
      image: [null]
    })

    this.iconForm.controls.url.disable()

    this.refreshSelect()
  }

  public enableEditMode(element: DashboardDirectory | DashboardFile): void {
    this.editMode = true
    this.iconForm.controls.id.setValue(element.id)
    this.iconForm.controls.name.setValue(element.name)
    this.iconForm.controls.type.setValue(element.type)
    if (element.image !== undefined && element.image !== null) {
      this.iconForm.controls.image.setValue(element.image)
      this.originalImage = element.image
    }
    if (element.icon !== undefined && element.icon !== null) {
      this.iconForm.controls.icon.setValue(element.icon)
      this.refreshSelect()
    }
    if ((element as DashboardFile).url !== undefined) {
      this.iconForm.controls.url.setValue((element as DashboardFile).url)
      this.iconForm.controls.localUrl.setValue((element as DashboardFile).url)
      if (this.isURLLocal((element as DashboardFile).url)) {
        this.iconForm.controls.url.disable()
      } else {
        this.iconForm.controls.localUrl.setValue('external')
        this.iconForm.controls.url.enable()
      }
    }

    this.refreshSelect()
  }

  public addElement(): void {
    let updateURL: string
    if (!(this.iconForm.value.image instanceof FileList) && this.iconForm.value.image !== null) {
      this.originalImage = String(this.iconForm.value.image)
      this.iconForm.controls.image.setValue(null)
    }
    if (!this.isURLLocal(this.iconForm.value.localUrl)) {
      updateURL = this.iconForm.value.url
    } else {
      updateURL = this.iconForm.value.localUrl
    }
    this.menuService.addElement(this.iconForm.value.name, this.iconForm.value.type, this.parentDirectoryID, this.iconForm.value.icon, this.iconForm.value.image, updateURL).then(success => {
      this.currentDirectory.push(success)
      this.cancelForm()
      this.currentDirectory.sort((a, b) => a.type == b.type ? a.name < b.name ? -1 : a.name > b.name ? 1 : 0 : a.type == 'directory' ? -1 : 1)
    })
  }

  public editElement(): void {
    let updateURL: string
    if (!(this.iconForm.value.image instanceof FileList) && this.iconForm.value.image !== null) {
      this.originalImage = String(this.iconForm.value.image)
      this.iconForm.controls.image.setValue(null)
    }
    if (!this.isURLLocal(this.iconForm.value.localUrl)) {
      updateURL = this.iconForm.value.url
    } else {
      updateURL = this.iconForm.value.localUrl
    }
    this.menuService.editElement(this.iconForm.value.id, this.iconForm.value.name, this.iconForm.value.icon, this.iconForm.value.image, updateURL).then(success => {
      let temp: any = this.currentDirectory.find((x => x.id == this.iconForm.value.id))
      temp.name = this.iconForm.value.name
      if (this.iconForm.value.icon != null) {
        temp.icon = this.iconForm.value.icon
        temp.image = null
        this.originalImage = null
        this.previewURL = null
      }
      if (this.iconForm.value.image != null && this.iconForm.value.image !== String(this.iconForm.value.image)) {
        temp.image = success.image
        temp.icon = null
      } else {
        if (this.originalImage != null) {
          this.iconForm.controls.image.setValue(String(this.originalImage))
        }
      }
      if (temp.type == 'link' && updateURL != null && updateURL != '') {
        temp.url = updateURL
      }
      this.cancelForm()
      this.currentDirectory.sort((a, b) => a.type == b.type ? a.name < b.name ? -1 : a.name > b.name ? 1 : 0 : a.type == 'directory' ? -1 : 1)
    })
  }

  public onImageFileSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = (event: any) => {
        this.previewURL = event.target.result
        this.iconForm.controls.icon.setValue(null)
      }
      reader.readAsDataURL(event.target.files[0])
      this.iconForm.controls.image.setValue(event.target.files)
    } else {
      this.previewURL = null
      this.iconForm.controls.image.setValue(null)
    }
  }

  public onIconSelected(): void {
    this.previewURL = null
    this.originalImage = null
    this.iconForm.controls.image.setValue(null)
    if (this.iconForm.value.icon == '') {
      this.iconForm.controls.icon.setValue(null)
    }
    $('.fileControl').val('')
  }

  public onURLChange(): void {
    if (this.isURLLocal(this.iconForm.value.localUrl)) {
      this.iconForm.controls.url.setValue(this.iconForm.value.localUrl)
      this.iconForm.controls.url.disable()
    } else {
      this.iconForm.controls.url.setValue('')
      this.iconForm.controls.url.enable()
    }
  }

  public cancelForm(): void {
    this.isIcon = true
    this.originalImage = null
    this.previewURL = null
    this.editMode = false
    this.addMode = false
  }

  public refreshSelect(): void {
    setTimeout(function () {
      $('select').material_select()
    }, 200)
  }
}