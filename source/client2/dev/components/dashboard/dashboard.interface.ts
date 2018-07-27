export interface AbstractDashboardElement {
  id?: number
  name: string
  parent_id?: number
  type?: string
}

export interface DashboardDirectory extends AbstractDashboardElement {
  children: Array<DashboardDirectory | DashboardFile>
}

export interface DashboardFile extends AbstractDashboardElement {
  image?: string
  icon?: string
  url: string
} 