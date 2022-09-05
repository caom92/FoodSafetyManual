import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'
import { CustomValidators } from '../../../directives/custom.validators'

import { ProcessFinishedProductService } from '../../../services/process-finished-product.service'
import { LanguageService } from '../../../services/app.language'
import { ProcessFinishedProductEntryInterface } from '../interfaces/process-finished-product.interface'

@Component({
  selector: 'process-finished-product-add',
  templateUrl: './process-finished-product-add.component.html'
})

export class ProcessFinishedProductAddComponent implements OnInit {
  @Language() lang: string
  @Output() addRegister = new EventEmitter<ProcessFinishedProductEntryInterface>()
  //@Input() autocompleteCrops
  //@Input() autocompleteVarieties
  autocompleteCodes
  dateConfig
  productForm: FormGroup

  constructor(private processFinishedProductService: ProcessFinishedProductService, private langManager: LanguageService, private _fb: FormBuilder) {

  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig

    this.productForm = this._fb.group({
      /*date: [null, [CustomValidators.dateValidator()]],
      crop: [null, [Validators.maxLength(255)]],
      variety: [null, [Validators.maxLength(255)]],
      section: [null, [Validators.maxLength(255)]],
      block: [null, [Validators.maxLength(255)]],
      weight: [null, [Validators.min(1)]],
      people: [null, [Validators.min(1)]],
      hours: [null, [Validators.min(1)]]*/
    })

    this.autocompleteCodes = { data: { 'Aaaa': null, 'Bbbbb': null }, limit: 5, current: null, count: 0, arr: [] }

    setTimeout(() => {
      this.autocompleteCodes = { data: { 'AXF': null, 'BCD': null, 'CXX': null, 'DFG': null, 'EAB': null }, limit: 5, current: null, count: 0, arr: [] }
    }, 3000)
  }

  public onAddRegister(): void {
    /*this.processFinishedProductService.addRegistry(this.productForm.value).then(success => {
      this.addRegister.emit({
        id: success,
        submitter_first_name: '',
        submitter_last_name: '',
        zone_name: localStorage.getItem('zone_name'),
        date: this.productForm.value.date,
        crop: this.productForm.value.crop,
        variety: this.productForm.value.variety,
        section: this.productForm.value.section,
        block: this.productForm.value.block,
        weight: this.productForm.value.weight,
        people: this.productForm.value.people,
        hours: this.productForm.value.hours
      })

      this.productForm.reset()
    })*/
  }
}
