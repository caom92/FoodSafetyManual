import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'

import { AlertController } from '../../../services/alert/app.alert'
import { MenuService } from '../../../services/app.menu'
import { MenuFile } from '../../document-viewer/list/document.list'
import { DashboardDirectory, DashboardFile, DashboardLink, LocalURL } from '../menu.interface'

@Component({
  selector: 'menu-viewer',
  templateUrl: './menu-viewer.component.html'
})

export class MenuComponent implements OnInit {
  @Language() lang: string
  dashboardIcons: Array<DashboardDirectory | DashboardLink | DashboardFile> = []
  currentDirectory: Array<DashboardDirectory | DashboardLink | DashboardFile> = []
  parentDirectoryID: number = null
  directories: Array<string> = []
  breadcrumbs: Array<string> = []
  errorDirectory: boolean = false
  errorNetwork: boolean = false
  addMode: boolean = false
  editMode: boolean = false
  preview: DashboardDirectory | DashboardLink | DashboardFile = { name: 'preview' }
  previewURL = null
  isIcon: boolean = true
  originalImage: string = null
  loadingDirectory: boolean = true
  serverDirectory: Array<DashboardDirectory | DashboardLink | DashboardFile> = null
  fileList: Array<MenuFile>
  iconForm: FormGroup = new FormBuilder().group({})
  localURLs: Array<LocalURL> = []
  readonly canAddFiles: boolean = localStorage.getItem('role_name') === 'Supervisor' || localStorage.getItem('role_name') === 'Employee'

  constructor(private router: StateService, private menuService: MenuService, private alertCtrl: AlertController, private formBuilder: FormBuilder) {

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
      name: [null, [Validators.required, Validators.maxLength(255)]],
      is_icon: [true],
      icon: [null, [Validators.maxLength(255)]],
      url: [null, [Validators.required, Validators.maxLength(65535)]],
      local_url: [null, [Validators.required, Validators.maxLength(65535)]],
      image: [null],
      file_id: [null, [Validators.required]],
      file_name: [null, [Validators.required, Validators.maxLength(255)]],
      file: [null, [Validators.required, Validators.maxLength(255)]]
    })

    this.iconForm.controls.url.disable()
    this.iconForm.controls.local_url.disable()
    this.iconForm.controls.file_id.disable()
    this.iconForm.controls.file.disable()
    this.iconForm.controls.file_name.disable()
  }

  public getMenu(): void {
    this.menuService.getMenu().then(success => {
      this.serverDirectory = success.menu
      this.fileList = success.files
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

  public deleteElement(element: DashboardDirectory | DashboardLink | DashboardFile): void {
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

    this.iconForm.reset({
      id: 0,
      type: 'directory',
      name: null,
      is_icon: true,
      icon: null,
      url: null,
      local_url: null,
      image: null,
      file_id: null,
      file_name: null,
      file: null
    })

    this.refreshSelect()
  }

  public enableEditMode(element: DashboardDirectory | DashboardLink | DashboardFile): void {
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
    if ((element as DashboardLink).url !== undefined) {
      this.iconForm.controls.url.setValue((element as DashboardLink).url)
      this.iconForm.controls.local_url.setValue((element as DashboardLink).url)
      if (this.isURLLocal((element as DashboardLink).url)) {
        this.iconForm.controls.url.disable()
      } else {
        this.iconForm.controls.local_url.setValue('external')
        this.iconForm.controls.url.enable()
      }
    }
    if ((element as DashboardFile).file_id !== undefined) {
      this.iconForm.controls.file_id.setValue((element as DashboardFile).file_id)
    }

    this.onTypeChange()

    this.refreshSelect()
  }

  public addElement(): void {
    if (this.iconForm.valid) {
      let updateURL: string
      let fileID: number
      if (!(this.iconForm.value.image instanceof FileList) && this.iconForm.value.image !== null) {
        this.originalImage = String(this.iconForm.value.image)
        this.iconForm.controls.image.setValue(null)
      }
      if (!this.isURLLocal(this.iconForm.value.local_url)) {
        updateURL = this.iconForm.value.url
      } else {
        updateURL = this.iconForm.value.local_url
      }
      if (this.iconForm.value.file !== undefined && this.iconForm.value.file !== null &&
        this.iconForm.value.file_name !== undefined && this.iconForm.value.file_name !== null) {
        fileID = null
      } else {
        fileID = this.iconForm.value.file_id
      }
      this.menuService.addElement(this.iconForm.value.name,
        this.iconForm.value.type,
        this.parentDirectoryID,
        this.iconForm.value.icon,
        this.iconForm.value.image,
        updateURL,
        this.iconForm.value.file,
        this.iconForm.value.file_name,
        fileID).then(success => {
        this.currentDirectory.push(success)
        this.cancelForm()
        this.currentDirectory.sort((a, b) => a.type == 'directory' && b.type != 'directory' ? -1 : b.type == 'directory' && a.type != 'directory' ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
      })
    }
  }

  public editElement(): void {
    let updateURL: string
    let fileID: number
    if (!(this.iconForm.value.image instanceof FileList) && this.iconForm.value.image !== null) {
      this.originalImage = String(this.iconForm.value.image)
      this.iconForm.controls.image.setValue(null)
    }
    if (!this.isURLLocal(this.iconForm.value.local_url)) {
      updateURL = this.iconForm.value.url
    } else {
      updateURL = this.iconForm.value.local_url
    }
    if (this.iconForm.value.file !== undefined && this.iconForm.value.file !== null &&
      this.iconForm.value.file_name !== undefined && this.iconForm.value.file_name !== null) {
      fileID = null
    } else {
      fileID = this.iconForm.value.file_id
    }
    this.menuService.editElement(this.iconForm.value.id, this.iconForm.value.name, this.iconForm.value.icon, this.iconForm.value.image, updateURL,this.iconForm.value.file, this.iconForm.value.file_name, fileID).then(success => {
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
      if (success.image == null && this.iconForm.value.icon == null) {
        temp.icon = null
        temp.image = null
      }
      if (success.path !== undefined && success.path !== null) {
        temp.path = success.path
        temp.file_id = success.file_id
      } else if (success.file_id !== undefined && success.file_id !== null) {
        temp.file_id = success.file_id
        temp.path = this.fileList.find((x => x.id == success.file_id)).path
      }
      this.cancelForm()
      this.currentDirectory.sort((a, b) => a.type == 'directory' && b.type != 'directory' ? -1 : b.type == 'directory' && a.type != 'directory' ? 1 : a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
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

  public onPDFFileSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.iconForm.controls.file.setValue(event.target.files)
    } else {
      this.iconForm.controls.file.setValue(null)
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

  public onTypeChange(): void {
    if (this.iconForm.controls.type.value === 'directory') {
      this.iconForm.controls.url.disable()
      this.iconForm.controls.local_url.disable()
      this.iconForm.controls.file_id.disable()
      this.iconForm.controls.file.disable()
      this.iconForm.controls.file_name.disable()
    }

    if (this.iconForm.controls.type.value === 'link') {
      this.iconForm.controls.file_id.disable()
      this.iconForm.controls.file.disable()
      this.iconForm.controls.file_name.disable()
      this.iconForm.controls.url.enable()
      this.iconForm.controls.local_url.enable()      
      this.onURLChange()
    }

    if (this.iconForm.controls.type.value === 'file') {
      this.iconForm.controls.url.disable()
      this.iconForm.controls.local_url.disable()
      this.iconForm.controls.file_id.enable()
      this.onFileChange()
    }
  }

  public onURLChange(): void {
    if (this.isURLLocal(this.iconForm.controls.local_url.value) || this.iconForm.controls.local_url.value === null) {
      this.iconForm.controls.url.setValue(this.iconForm.controls.local_url.value)
      this.iconForm.controls.url.disable()
    } else {
      if (this.isURLLocal(this.iconForm.controls.url.value)) {
        this.iconForm.controls.url.setValue(null)
      }
      this.iconForm.controls.url.enable()
    }
  }

  public onFileChange(): void {
    if (this.iconForm.controls.file_id.value === 'new_file') {
      this.iconForm.controls.file.enable()
      this.iconForm.controls.file_name.enable()
    } else {
      this.iconForm.controls.file.disable()
      this.iconForm.controls.file_name.disable()
    }
  }

  public cancelForm(): void {
    this.isIcon = true
    this.iconForm.controls.is_icon.setValue(true)
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