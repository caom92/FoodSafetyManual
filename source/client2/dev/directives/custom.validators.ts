import { ValidatorFn, AbstractControl } from "@angular/forms"

export class CustomValidators {
  public static timeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const timeRegex = /(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g
      const allowed = timeRegex.test(control.value)
      return allowed ? null : { 'invalidTime': { value: control.value } }
    }
  }

  public static dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const dateRegex = /[012]\d{3}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/g
      const allowed = dateRegex.test(control.value) || control.value == null || control.value == ""
      return allowed ? null : { 'invalidDate': { value: control.value } }
    }
  }

  public static exactLength(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const allowed = control.value.length == length || control.value == null || control.value == ""
      return allowed ? null : { 'invalidLength': { value: control.value } }
    }
  }

  public static numeric(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const allowed = control.value === Number(control.value) || control.value == null
      return allowed ? null : { 'invalidNumber': { value: control.value } }
    }
  }

  //public static urlValidator(): ValidatorFn {
  //return (control: AbstractControl): {[key: string]: any} => {
  //const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
  //const allowed = urlRegex.test(control.value)
  //return allowed ? null : {'invalidUrl': {value: control.value}}
  //return null
  //}
  //}
}