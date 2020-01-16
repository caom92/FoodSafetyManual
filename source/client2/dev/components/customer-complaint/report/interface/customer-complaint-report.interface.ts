export interface CustomerComplaintReportInterface {
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
  product_details: Array<CustomerComplaintReportDetails>
  sources: Array<CustomerComplaintReportSource>
}

export interface CustomerComplaintReportDetails {
  id: number
  entry_num: number
  product: string
  cost: number
  quantity: number
}

export interface CustomerComplaintReportSource {
  id: number
  zone_id: number
  zone_name: number
}

export interface ActiveCustomerComplaint {
  id: string | number
}