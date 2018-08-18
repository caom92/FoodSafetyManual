import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StateService } from '@uirouter/core'

import { AlertController } from '../../services/alert/app.alert'
import { HomeElementsService } from '../../services/app.home'
import { MenuService } from '../../services/app.menu'
import { DashboardDirectory, DashboardFile } from './dashboard.interface'

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
  addMode: boolean = false
  editMode: boolean = false
  preview: DashboardDirectory | DashboardFile = { name: 'preview' }
  previewURL = null
  isIcon: boolean = true
  isExternal: boolean = true
  originalImage: string = ''
  loadingDirectory: boolean = true
  serverDirectory: Array<DashboardDirectory | DashboardFile> = null
  editIconForm: FormGroup = new FormBuilder().group({})

  constructor(private homeElementsService: HomeElementsService, private router: StateService, private menuService: MenuService, private alertCtrl: AlertController, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    if (this.serverDirectory == null) {
      this.getMenu()
    } else {
      this.getMenuSuccess()
    }

    this.editIconForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      type: ['directory'],
      name: [null, [Validators.maxLength(255)]],
      icon: [null, [Validators.maxLength(255)]],
      url: [null, [Validators.maxLength(65535)]],
      image: [null]
    })
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

  public addElement(): void {
    this.addMode = true
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

  public enableEditMode(element: DashboardDirectory | DashboardFile): void {
    this.editMode = true
    this.editIconForm.controls.id.setValue(element.id)
    this.editIconForm.controls.name.setValue(element.name)
    this.editIconForm.controls.type.setValue(element.type)
    if (element.image !== undefined && element.image !== null) {
      this.editIconForm.controls.image.setValue(element.image)
      this.originalImage = element.image
    }
    if (element.icon !== undefined && element.icon !== null) {
      this.editIconForm.controls.icon.setValue(element.icon)
      setTimeout(() => {
        $('select').material_select()
      })
    }
    if ((element as DashboardFile).url !== undefined) {
      this.editIconForm.controls.url.setValue((element as DashboardFile).url)
    }
  }

  public editElement(): void {
    console.log(this.originalImage)
    console.log(this.editIconForm.value)
    if (this.editIconForm.value.image === String(this.editIconForm.value.image)) {
      this.previewURL = this.editIconForm.value.image
      this.editIconForm.controls.image.setValue(null)
    }
    this.menuService.editElement(this.editIconForm.value.id, this.editIconForm.value.name, this.editIconForm.value.icon, this.editIconForm.value.image, this.editIconForm.value.url).then(success => {
      let temp: any = this.currentDirectory.find((x => x.id == this.editIconForm.value.id))
      temp.name = this.editIconForm.value.name
      if (this.editIconForm.value.icon != null) {
        temp.icon = this.editIconForm.value.icon
        temp.image = null
      }
      if (this.editIconForm.value.image != null && this.editIconForm.value.image !== String(this.editIconForm.value.image)) {
        temp.image = this.previewURL
        temp.icon = null
      }
      if (temp.type == 'link') {
        temp.url = this.editIconForm.value.url
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
        this.editIconForm.controls.icon.setValue(null)
      }
      reader.readAsDataURL(event.target.files[0])
      this.editIconForm.controls.image.setValue(event.target.files)
    } else {
      this.previewURL = null
      this.editIconForm.controls.image.setValue(null)
    }
  }

  public onIconSelected(): void {
    this.previewURL = null
    this.editIconForm.controls.image.setValue(null)
    if (this.editIconForm.value.icon == '') {
      this.editIconForm.controls.icon.setValue(null)
    }
    $('.fileControl').val('')
  }

  public cancelForm(): void {
    this.isIcon = true
    this.isExternal = true
    this.previewURL = null
    this.editMode = false
    this.addMode = false
  }
}