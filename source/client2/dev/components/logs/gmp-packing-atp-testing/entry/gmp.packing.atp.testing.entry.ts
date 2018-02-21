import { Component, Input } from '@angular/core'
import { FormGroup, FormGroupName, Validators, FormBuilder, FormArray } from '@angular/forms'
import { LogEntry } from '../interfaces/gmp.packing.atp.testing.log.interface'
import { LogService } from '../../../../services/app.logs'

@Component({
  selector: 'gmp-packing-atp-testing-entry',
  templateUrl: './gmp.packing.atp.testing.entry.html'
})

export class GMPPackingATPTestingEntryComponent {
  @Input() entryNumber: number
  @Input('group') public entryForm: FormGroup
  entries: Array<number> = []

  constructor(private _fb: FormBuilder, private logService: LogService) {
    
  }

  public ngOnInit(): void {
    const control = <FormArray>this.entryForm.controls['items']

    control.push(this.initEmptyItem(this.entries.length + 1))
    this.entries.push(this.entries.length + 1)
  }

  public initEmptyItem(test: number): FormGroup {
    return this._fb.group({
      test_number: [test, [Validators.required]],
      test1: [null, [Validators.required]],
      results1: [null, [Validators.required]],
      corrective_action: [null, [Validators.required]],
      test2: [null, [Validators.required]],
      results2: [null,  [Validators.required]]
    })
  }

  public addItem(): void {
    let control = <FormArray>this.entryForm.controls['items']
    control.push(this.initEmptyItem(this.entries.length + 1))
    this.entries.push(this.entries.length + 1)
  }

  public removeItem(): void {
    if(this.entries.length > 1){
      let control = <FormArray>this.entryForm.controls['items']
      control.controls.pop()
      this.entries.pop()
      this.logService.refreshFormGroup(this.entryForm)
    }
  }
}