export interface AbstractDashboardElement {
  id?: number
  name: string
  parent_id?: number
  type?: string
  image?: string
  icon?: string
}

export interface DashboardDirectory extends AbstractDashboardElement {
  children?: Array<DashboardDirectory | DashboardFile>
}

export interface DashboardFile extends AbstractDashboardElement {
  url?: string
} 