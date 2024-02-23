export interface WorkOrderReportInterface {
  id: number
  work_order_number: string
  creator_id: number
  creator_name: string
  capture_date: string
  department: string
  description: string
  received_by: string
  assigned_to: string
  repair_date: string
  repair_time: string
  repair_duration: number
  repair_work_order_type: string
  maintenance_task_performer: string
  repair_start_date: string
  repair_start_time: string
  repair_finish_date: string
  repair_finish_time: string
  repair_comments: string
  sanitation_task_performer: string
  sanitation_date: string
  sanitation_start_time: string
  sanitation_finish_time: string
  sanitation_corrective_action: string
  cleaning_verification: boolean
  closing_date: string
}

export interface ActiveWorkOrder {
  id: string | number
}