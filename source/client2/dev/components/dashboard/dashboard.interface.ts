export interface AbstractDashboardElement {
  name: string
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