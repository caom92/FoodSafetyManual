export interface CustomerComplaintForm {
  id: number
  creator_id: number
  subject: string
  corrective_action: string
  customer: string
  complaint_date: string
  sales_order_number: string
  account_manager: string
  shipped_to: string
  complaint_reason: string
  root_cause: string
  shipping_point: string
  incoming_qc_score: string
  product_age: number
  shipping_age: number
  transit_time: number
  complaint_age: number
  closure_date: string
  notes: string
  product_details: Array<CustomerComplaintDetails>
  sources: Array<CustomerComplaintSource>
}

export interface CustomerComplaintDetails {
  entry_num: number
  product: string
  cost: number
  quantity: number
}

export interface CustomerComplaintSource {
  id: number
}