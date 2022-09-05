import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { WorkOrderForm } from './work-order-log.interface'
import { DateTimeService } from '../../../services/time.service'
import { LanguageService } from '../../../services/app.language'
import { WorkOrderService } from '../../../services/work-order.service'
import { Language } from 'angular-l10n'

@Component({
  selector: 'work-order-log',
  templateUrl: './work-order-log.component.html'
})

export class WorkOrderFormComponent {
  @Language() lang: string
  @Output() closeWorkOrder = new EventEmitter<any>()
  @Input() data: WorkOrderForm = null
  workOrderForm: FormGroup
  userID: number = Number(localStorage.getItem('user_id'))
  username: string = localStorage.getItem('user_full_name')
  zoneName: string = localStorage.getItem('zone_name')
  dateConfig
  timeConfig

  constructor(private langManager: LanguageService, private formBuilder: FormBuilder, private timeService: DateTimeService, private workOrderService: WorkOrderService) {

  }
  
  public ngOnInit(): void {
    this.dateConfig = this.langManager.messages.global.datePickerConfig
    this.timeConfig = this.langManager.messages.global.timePickerConfig
    if (this.data === null || this.data === undefined) {
      // no data input, init a clean form
      this.data = { id: null, work_order_number: null, creator_id: null, creator_name: null, capture_date: null, department: null, description: null, received_by: null, assigned_to: null, repair_date: null, repair_time: null, repair_duration: null, repair_work_order_type: null, maintenance_task_performer: null, repair_start_date: null, repair_start_time: null, repair_finish_date: null, repair_finish_time: null, repair_comments: null, sanitation_task_performer: null, sanitation_date: null, sanitation_start_time: null, sanitation_finish_time: null, sanitation_corrective_action: null, cleaning_verification: null, accepter_id: null, accepter_name: null, closing_date: null }
      this.initForm()
    } else {
      // data was received from Input directive, init
      this.initForm()
    }
  }

  public initForm(): void {
    const captureDate = this.timeService.getISODate()
    const currentDate = this.timeService.getISODate()

    this.workOrderForm = this.formBuilder.group({
      work_order_number: [(this.data.work_order_number !== undefined && this.data.work_order_number !== null) ? this.data.work_order_number : ''],
      creator_id: [(this.data.creator_id !== undefined && this.data.creator_id !== null) ? this.data.creator_id : this.userID],
      creator_name: [(this.data.creator_name !== undefined && this.data.creator_name !== null) ? this.data.creator_name : this.username],
      zone_name: [this.zoneName],
      capture_date: [(this.data.capture_date !== undefined && this.data.capture_date !== null) ? this.data.capture_date : captureDate],
      department: [(this.data.department !== undefined && this.data.department !== null) ? this.data.department : ''],
      description: [(this.data.description !== undefined && this.data.description !== null) ? this.data.description : ''],
      received_by: [(this.data.received_by !== undefined && this.data.received_by !== null) ? this.data.received_by : ''],
      assigned_to: [(this.data.assigned_to !== undefined && this.data.assigned_to !== null) ? this.data.assigned_to : ''],
      repair_date: [(this.data.repair_date !== undefined && this.data.repair_date !== null) ? this.data.repair_date : ''],
      repair_time: [(this.data.repair_time !== undefined && this.data.repair_time !== null) ? this.data.repair_time : ''],
      repair_duration: [(this.data.repair_duration !== undefined && this.data.repair_duration !== null) ? this.data.repair_duration : null],
      repair_work_order_type: [(this.data.repair_work_order_type !== undefined && this.data.repair_work_order_type !== null) ? this.data.repair_work_order_type : ''],
      maintenance_task_performer: [(this.data.maintenance_task_performer !== undefined && this.data.maintenance_task_performer !== null) ? this.data.maintenance_task_performer : ''],
      repair_start_date: [(this.data.repair_start_date !== undefined && this.data.repair_start_date !== null) ? this.data.repair_start_date : ''],
      repair_start_time: [(this.data.repair_start_time !== undefined && this.data.repair_start_time !== null) ? this.data.repair_start_time : ''],
      repair_finish_date: [(this.data.repair_finish_date !== undefined && this.data.repair_finish_date !== null) ? this.data.repair_finish_date : ''],
      repair_finish_time: [(this.data.repair_finish_time !== undefined && this.data.repair_finish_time !== null) ? this.data.repair_finish_time : ''],
      repair_comments: [(this.data.repair_comments !== undefined && this.data.repair_comments !== null) ? this.data.repair_comments : ''],
      sanitation_task_performer: [(this.data.sanitation_task_performer !== undefined && this.data.sanitation_task_performer !== null) ? this.data.sanitation_task_performer : ''],
      sanitation_date: [(this.data.sanitation_date !== undefined && this.data.sanitation_date !== null) ? this.data.sanitation_date : ''],
      sanitation_start_time: [(this.data.sanitation_start_time !== undefined && this.data.sanitation_start_time !== null) ? this.data.sanitation_start_time : ''],
      sanitation_finish_time: [(this.data.sanitation_finish_time !== undefined && this.data.sanitation_finish_time !== null) ? this.data.sanitation_finish_time : ''],
      sanitation_corrective_action: [(this.data.sanitation_corrective_action !== undefined && this.data.sanitation_corrective_action !== null) ? this.data.sanitation_corrective_action : ''],
      cleaning_verification: [(this.data.cleaning_verification !== undefined && this.data.cleaning_verification !== null) ? this.data.cleaning_verification : null],
      accepter_id: [this.userID],
      closing_date: [currentDate]
    })

    if (this.data.id !== undefined && this.data.id !== null) {
      this.workOrderForm.addControl('id', new FormControl(this.data.id, [Validators.required]))
    }
  }

  public cleanForm(): void {
    let controlArray: Array<AbstractControl> = []

    controlArray.push(this.workOrderForm.controls.work_order_number)
    controlArray.push(this.workOrderForm.controls.creator_id)
    controlArray.push(this.workOrderForm.controls.capture_date)
    controlArray.push(this.workOrderForm.controls.department)
    controlArray.push(this.workOrderForm.controls.description)
    controlArray.push(this.workOrderForm.controls.received_by)
    controlArray.push(this.workOrderForm.controls.assigned_to)
    controlArray.push(this.workOrderForm.controls.repair_date)
    controlArray.push(this.workOrderForm.controls.repair_time)
    controlArray.push(this.workOrderForm.controls.repair_duration)
    controlArray.push(this.workOrderForm.controls.repair_work_order_type)
    controlArray.push(this.workOrderForm.controls.maintenance_task_performer)
    controlArray.push(this.workOrderForm.controls.repair_start_date)
    controlArray.push(this.workOrderForm.controls.repair_start_time)
    controlArray.push(this.workOrderForm.controls.repair_finish_date)
    controlArray.push(this.workOrderForm.controls.repair_finish_time)
    controlArray.push(this.workOrderForm.controls.repair_comments)
    controlArray.push(this.workOrderForm.controls.sanitation_task_performer)
    controlArray.push(this.workOrderForm.controls.sanitation_date)
    controlArray.push(this.workOrderForm.controls.sanitation_start_time)
    controlArray.push(this.workOrderForm.controls.sanitation_finish_time)
    controlArray.push(this.workOrderForm.controls.sanitation_corrective_action)
    controlArray.push(this.workOrderForm.controls.cleaning_verification)
    controlArray.push(this.workOrderForm.controls.accepter_id)
    controlArray.push(this.workOrderForm.controls.closing_date)

    for (let control of controlArray) {
      if (control.value === null || control.value === '') {
        control.disable()
      }
    }
  }

  public enableForm(): void {
    this.workOrderForm.enable()
  }

  public save(): void {
    if (this.data.id === undefined || this.data.id === null) {
      this.capture()
    } else {
      this.update()
    }
  }

  public capture(): void {
    this.cleanForm()
    if (this.workOrderForm.valid == true) {
      this.workOrderService.capture(this.workOrderForm.value).then(success => {
        this.enableForm()
        if (Number(success.id) > 0) {
          this.data.id = Number(success.id)
          this.workOrderForm.addControl('id', new FormControl(this.data.id, [Validators.required]))
        }
      }, error => {
        this.enableForm()
      })
    }
  }

  public update(): void {
    this.cleanForm()
    if (this.workOrderForm.valid == true) {
      this.workOrderService.update(this.workOrderForm.value).then(success => {
        this.enableForm()
      }, error => {
        this.enableForm()
      })
    }
  }

  public close(): void {
    if (this.workOrderForm.pristine && this.data.id === Number(this.data.id)) {
      this.workOrderService.close(this.data.id).then(success => {
        this.back()
      }, error => {

      })
    }
  }

  public delete(): void {
    if (this.data.id === Number(this.data.id)) {
      this.workOrderService.delete(this.data.id).then(success => {
        this.back()
      }, error => {

      })
    }
  }

  public back(): void {
    this.closeWorkOrder.emit()
  }
}