import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { BackendService } from './app.backend'
import { LoaderService } from './app.loaders'
import { ToastsService } from './app.toasts'

@Injectable()
export class MenuService {
  constructor(private loaderService: LoaderService,
    private toastService: ToastsService,
    private server: BackendService) {

  }

  public getMenuFiles(): Promise<any> {
    let menuPromise = new Promise<any>((resolve, reject) => {
      let menuLoader = this.loaderService.koiLoader()

      this.server.update(
        'get-menu-files',
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              for (let file of response.data) {
                file.upload_date = new Date(new Date(file.upload_date).getTime() + new Date(file.upload_date).getTimezoneOffset() * 60 * 1000)
              }
              resolve(response.data)
              menuLoader.dismiss()
            } else {
              reject('bad request')
              menuLoader.dismiss()
              this.toastService.showText('serverUnreachable')
            }
          } else {
            reject(response)
            menuLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          menuLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return menuPromise
  }

  public getMenu(userID?: number): Promise<any> {
    let menuPromise = new Promise<any>((resolve, reject) => {
      let menuLoader = this.loaderService.koiLoader()

      const suffix = (userID === Number(userID)) ? '-by-user' : ''
      let formData = new FormData()

      if (userID === Number(userID))
        formData.append('user_id', String(userID))

      this.server.update(
        'get-menu' + suffix,
        formData,
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              menuLoader.dismiss()
            } else {
              reject('bad request')
              menuLoader.dismiss()
              this.toastService.showText('serverUnreachable')
            }
          } else {
            reject('bad request')
            menuLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          menuLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return menuPromise
  }

  public deleteElement(id: number): Promise<any> {
    let deletePromise = new Promise<any>((resolve, reject) => {
      let deleteLoader = this.loaderService.koiLoader()
      let deleteForm = new FormData()

      deleteForm.append('id', String(id))

      this.server.update(
        'delete-menu-element',
        deleteForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            resolve(response.data)
            deleteLoader.dismiss()
          } else {
            reject('bad request')
            deleteLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          deleteLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return deletePromise
  }

  public editElement(id: number, name?: string, icon?: string, image?: FileList, url?: string, file?: FileList, fileName?: string, fileID?: number): Promise<any> {
    let editPromise = new Promise<any>((resolve, reject) => {
      let editLoader = this.loaderService.koiLoader()
      let editForm = new FormData()

      editForm.append('id', String(id))

      if (name !== undefined && name !== null) {
        if (name.length > 0) {
          editForm.append('name', name)
        }
      }

      if (icon !== undefined && icon !== null) {
        if (icon.length > 0) {
          editForm.append('icon', icon)
        }
      }

      if (url !== undefined && url !== null) {
        if (url.length > 0) {
          editForm.append('url', url)
        }
      }

      if (image !== undefined && image !== null) {
        editForm.append('image', image[0], image[0].name)
      }

      if (file !== undefined && file !== null) {
        editForm.append('file', file[0], file[0].name)
      }

      if (fileName !== undefined && fileName !== null) {
        if (fileName.length > 0) {
          editForm.append('file_name', fileName)
        }
      }

      if (fileID !== undefined && fileID !== null) {
        if (fileID === Number(fileID)) {
          editForm.append('file_id', String(fileID))
        }
      }

      this.server.update(
        'edit-menu-element',
        editForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            resolve(response.data)
            editLoader.dismiss()
          } else {
            reject('bad request')
            editLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          editLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return editPromise
  }

  public addElement(name: string, type: string, parentID?: number, icon?: string, image?: FileList, url?: string, file?: FileList, fileName?: string, fileID?: number): Promise<any> {
    let addPromise = new Promise<any>((resolve, reject) => {
      let addLoader = this.loaderService.koiLoader()
      let addForm = new FormData()

      if (parentID !== undefined && parentID !== null) {
        addForm.append('parent_id', String(parentID))
      }      

      if (name !== undefined && name !== null) {
        if (name.length > 0) {
          addForm.append('name', name)
        }
      }

      if (icon !== undefined && icon !== null) {
        if (icon.length > 0) {
          addForm.append('icon', icon)
        }
      }

      if (url !== undefined && url !== null) {
        if (url.length > 0) {
          addForm.append('url', url)
        }
      }

      if (image !== undefined && image !== null) {
        addForm.append('image', image[0], image[0].name)
      }

      if (file !== undefined && file !== null) {
        addForm.append('file', file[0], file[0].name)
      }

      if (fileName !== undefined && fileName !== null) {
        if (fileName.length > 0) {
          addForm.append('file_name', fileName)
        }
      }

      if (fileID !== undefined && fileID !== null) {
        if (fileID === Number(fileID)) {
          addForm.append('file_id', String(fileID)) 
        }
      }

      this.server.update(
        'add-menu-' + type,
        addForm,
        (response: any) => {
          if (response.meta.return_code == 0) {
            resolve(response.data)
            addLoader.dismiss()
          } else {
            reject('bad request')
            addLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          addLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return addPromise
  }

  public getMenuUsers(): Promise<any> {
    let menuPromise = new Promise<any>((resolve, reject) => {
      let menuLoader = this.loaderService.koiLoader()

      this.server.update(
        'list-supervisors-employees-by-zone',
        new FormData(),
        (response: any) => {
          if (response.meta.return_code == 0) {
            if (response.data) {
              resolve(response.data)
              menuLoader.dismiss()
            } else {
              reject('bad request')
              menuLoader.dismiss()
              this.toastService.showText('serverUnreachable')
            }
          } else {
            reject(response)
            menuLoader.dismiss()
            this.toastService.showString('Error ' + response.meta.return_code + ', server says: ' + response.meta.message)
          }
        }, (error: any, caught: Observable<void>) => {
          reject('network error')
          menuLoader.dismiss()
          this.toastService.showText('serverUnreachable')
          return []
        }
      )
    })

    return menuPromise
  }
}