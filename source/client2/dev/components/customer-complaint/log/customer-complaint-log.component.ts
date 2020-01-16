import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Language } from 'angular-l10n'

import { LanguageService } from '../../../services/app.language'
import { CustomerComplaintService } from '../../../services/customer-complaint.service'
import { DataResolverService } from '../../../services/data-resolver.service'
import { FormUtilService } from '../../../services/form-util.service'
import { DateTimeService } from '../../../services/time.service'
import { ToastsService } from '../../../services/toasts.service'
import { CustomerComplaintDetails, CustomerComplaintForm, CustomerComplaintSource } from './customer-complaint-log.interface'

@Component({
  selector: 'customer-complaint-log',
  templateUrl: './customer-complaint-log.component.html'
})

export class CustomerComplaintLogComponent implements OnInit {
  @Language() lang: string
  @Output() closeCustomerComplaint = new EventEmitter<any>()
  @Input() data: CustomerComplaintForm = null
  zoneList
  dateConfig
  customerComplaintForm: FormGroup

  constructor(private langManager: LanguageService, private formBuilder: FormBuilder, private timeService: DateTimeService, private dataResolver: DataResolverService, private customerComplaintService: CustomerComplaintService, private formUtilService: FormUtilService, private toastService: ToastsService) {
    
  }

  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    if (this.data === null || this.data === undefined) {
      // no data input, init a clean form
      let productDetails: Array<CustomerComplaintDetails> = [{
        entry_num: 1,
        product: null,
        cost: null,
        quantity: null
      }]
      let sources: Array<CustomerComplaintSource> = []
      this.data = { id: null, creator_id: null, subject: null, corrective_action: null, customer: null, complaint_date: null, sales_order_number: null, account_manager: null, shipped_to: null, complaint_reason: null, root_cause: null, shipping_point: null, incoming_qc_score: null, product_age: null, shipping_age: null, transit_time: null, complaint_age: null, closure_date: null, product_details: productDetails, sources: sources }
      this.initForm()
    } else {
      // data was received from Input directive, init
      this.initForm()
    }

    this.customerComplaintService.log().then(success => {
      this.zoneList = success
      setTimeout(() => {
        $('select').material_select()
      }, 200)
    }, error => {

    })
  }

  public initForm(): void {
    const complaintDate = this.timeService.getISODate()

    const sourcesControl = new FormControl(this.data.sources, [Validators.required])

    const detailsControl = this.formBuilder.array([])
    for (let detail of this.data.product_details) {
      detailsControl.push(this.initDetails(detail))
    }

    this.customerComplaintForm = this.formBuilder.group({
      subject: [this.dataResolver.resolveString(this.data.subject, ''), []],
      corrective_action: [this.dataResolver.resolveString(this.data.corrective_action, ''), []],
      customer: [this.dataResolver.resolveString(this.data.customer, ''), []],
      complaint_date: [this.dataResolver.resolveString(this.data.complaint_date, complaintDate), [Validators.required]],
      sales_order_number: [this.dataResolver.resolveString(this.data.sales_order_number, ''), []],
      account_manager: [this.dataResolver.resolveString(this.data.account_manager, ''), []],
      shipped_to: [this.dataResolver.resolveString(this.data.shipped_to, ''), []],
      complaint_reason: [this.dataResolver.resolveString(this.data.complaint_reason, ''), []],
      root_cause: [this.dataResolver.resolveString(this.data.root_cause, ''), []],
      shipping_point: [this.dataResolver.resolveString(this.data.shipping_point, ''), []],
      incoming_qc_score: [this.dataResolver.resolveString(this.data.incoming_qc_score, ''), []],
      product_age: [this.dataResolver.resolveNumber(this.data.product_age), []],
      shipping_age: [this.dataResolver.resolveNumber(this.data.shipping_age), []],
      transit_time: [this.dataResolver.resolveNumber(this.data.transit_time), []],
      complaint_age: [this.dataResolver.resolveNumber(this.data.complaint_age), []],
      product_details: detailsControl,
      sources: sourcesControl
    })

    if (this.data.id !== undefined && this.data.id !== null) {
      this.customerComplaintForm.addControl('id', new FormControl(this.data.id, [Validators.required]))
    }
  }

  public compareFn(source, zone) {
    return source && zone ? source.id === zone.id : source === zone
  }

  /*public initSource(source: CustomerComplaintSource): FormGroup {
    let sourceGroup: FormGroup = this.formBuilder.group({
      zone_id: [this.dataResolver.resolveNumber(source.zone_id), [Validators.required]]
    })

    return sourceGroup
  }*/

  public initDetails(details: CustomerComplaintDetails): FormGroup {
    let detailsGroup: FormGroup = this.formBuilder.group({
      entry_num: [this.dataResolver.resolveNumber(details.entry_num), [Validators.required]],
      product: [this.dataResolver.resolveString(details.product), [Validators.required]],
      cost: [this.dataResolver.resolveNumber(details.cost), [Validators.required]],
      quantity: [this.dataResolver.resolveNumber(details.quantity), [Validators.required]]
    })

    return detailsGroup
  }

  public onEntryAdd() {
    this.formUtilService.deepMarkAsDirty(this.customerComplaintForm)

    const control: FormArray = <FormArray>this.customerComplaintForm.controls['product_details']    

    let detail: CustomerComplaintDetails = {
      entry_num: control.controls.length + 1,
      product: null,
      cost: null,
      quantity: null
    }

    this.data.product_details.push(detail)
    control.push(this.initDetails(detail))

    this.formUtilService.deepUpdateValueAndValidity(this.customerComplaintForm)
  }

  public onEntryRemove() {
    this.formUtilService.deepMarkAsDirty(this.customerComplaintForm)

    const control: FormArray = <FormArray>this.customerComplaintForm.controls['product_details']

    if (control.controls.length > 1) {
      control.controls.pop()
      this.data.product_details.pop()
      this.formUtilService.deepUpdateValueAndValidity(this.customerComplaintForm)
    }
  }

  public cleanForm(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.customerComplaintForm.controls.subject)
    controlArray.push(this.customerComplaintForm.controls.corrective_action)
    controlArray.push(this.customerComplaintForm.controls.customer)
    controlArray.push(this.customerComplaintForm.controls.complaint_date)
    controlArray.push(this.customerComplaintForm.controls.sales_order_number)
    controlArray.push(this.customerComplaintForm.controls.account_manager)
    controlArray.push(this.customerComplaintForm.controls.shipped_to)
    controlArray.push(this.customerComplaintForm.controls.complaint_reason)
    controlArray.push(this.customerComplaintForm.controls.root_cause)
    controlArray.push(this.customerComplaintForm.controls.shipping_point)
    controlArray.push(this.customerComplaintForm.controls.incoming_qc_score)
    controlArray.push(this.customerComplaintForm.controls.product_age)
    controlArray.push(this.customerComplaintForm.controls.shipping_age)
    controlArray.push(this.customerComplaintForm.controls.transit_time)
    controlArray.push(this.customerComplaintForm.controls.complaint_age)

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }
  }

  public enableForm(): void {
    this.customerComplaintForm.enable()
  }

  public save(): void {
    if (this.data.id === undefined || this.data.id === null) {
      this.capture()
    } else {
      this.update()
    }
  }

  public capture(): void {
    // send initial capture request
    this.cleanForm()
    if (this.customerComplaintForm.valid == true) {
      this.customerComplaintService.capture(this.customerComplaintForm.value).then(success => {
        this.enableForm()
        this.customerComplaintForm.markAsPristine()
        if (Number(success) > 0) {
          this.data.id = Number(success)
          this.customerComplaintForm.addControl('id', new FormControl(this.data.id, [Validators.required]))
        }
      }, error => {
        this.enableForm()
      })
    } else {
      this.formUtilService.deepMarkAsDirty(this.customerComplaintForm)
      this.enableForm()
      this.toastService.showClientMessage('incomplete-log', 1)
    }
  }

  public update(): void {
    // send update requests (only after first capture)
    this.cleanForm()
    if (this.customerComplaintForm.valid == true) {
      this.customerComplaintService.update(this.customerComplaintForm.value).then(success => {
        this.enableForm()
        this.customerComplaintForm.markAsPristine()
      }, error => {
        this.enableForm()
      })
    } else {
      this.formUtilService.deepMarkAsDirty(this.customerComplaintForm)
      this.enableForm()
      this.toastService.showClientMessage('incomplete-log', 1)
    }
  }

  public close(): void {
    if (this.customerComplaintForm.pristine && this.data.id === Number(this.data.id)) {
      this.customerComplaintService.close(this.data.id).then(success => {
        this.back()
      }, error => {

      })
    }
  }

  public back(): void {
    this.closeCustomerComplaint.emit()
  }
}