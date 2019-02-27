import { Injectable } from '@angular/core'

@Injectable()
export class FlattenService {
  constructor() {

  }

  // https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
  public flatten(data: Object): Object {
    let result = {}

    function recurse(value: any, key: string) {
      if (Object(value) !== value) {
        result[key] = value
      } else if (Array.isArray(value)) {
        let l = value.length
        for (let i = 0; i < l; i++)
          recurse(value[i], key + '[' + i + ']')
        if (l == 0) result[key] = []
      } else {
        if (value instanceof FileList || value instanceof File) {
          result[key] = value
        } else {
          let isEmpty = true
          for (let k in value) {
            isEmpty = false
            recurse(value[k], key ? key + '[' + k + ']' : k)
          }
          if (isEmpty && key) {
            result[key] = {}
          }
        }
      }
    }

    if (Object(data) !== data) {
      throw Error('Non-object parameter can\'t be flattened')
    } else {
      recurse(data, '')
    }

    return result
  }

  public formDataFromFlatObject(data: Object): FormData {
    let form = new FormData()

    for (let key in data) {
      if (data[key] === true) {
        form.append(key, '1')
      } else if (data[key] === false) {
        form.append(key, '0')
      } else if (data[key] instanceof FileList) {
        for (let file of data[key]) {
          form.append(key + '[]', file, file.name)
        }
      } else if (data[key] instanceof File) {
        form.append(key, data[key], data[key].name)
      } else {
        form.append(key, data[key])
      }
    }

    return form
  }
}