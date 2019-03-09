import { Injectable } from '@angular/core'
import { FormArray, FormGroup, FormControl } from '@angular/forms'

@Injectable()
export class FormUtilService {
  constructor() {

  }

  public deepMarkAsDirty(control: FormGroup | FormArray) {
    control.markAsDirty()
    for (let i in control.controls) {
      if (control.controls[i] instanceof FormControl) {
        control.controls[i].markAsDirty()
      } else {
        this.deepMarkAsDirty(control.controls[i])
      }
    }
  }

  public deepMarkAsPending(control: FormGroup | FormArray) {
    control.markAsPending()
    for (let i in control.controls) {
      if (control.controls[i] instanceof FormControl) {
        control.controls[i].markAsPending()
      } else {
        this.deepMarkAsPending(control.controls[i])
      }
    }
  }

  public deepMarkAsPristine(control: FormGroup | FormArray) {
    control.markAsPristine()
    for (let i in control.controls) {
      if (control.controls[i] instanceof FormControl) {
        control.controls[i].markAsPristine()
      } else {
        this.deepMarkAsPristine(control.controls[i])
      }
    }
  }

  public deepMarkAsTouched(control: FormGroup | FormArray) {
    control.markAsTouched()
    for (let i in control.controls) {
      if (control.controls[i] instanceof FormControl) {
        control.controls[i].markAsTouched()
      } else {
        this.deepMarkAsTouched(control.controls[i])
      }
    }
  }

  public deepMarkAsUntouched(control: FormGroup | FormArray) {
    control.markAsUntouched()
    for (let i in control.controls) {
      if (control.controls[i] instanceof FormControl) {
        control.controls[i].markAsUntouched()
      } else {
        this.deepMarkAsUntouched(control.controls[i])
      }
    }
  }
}