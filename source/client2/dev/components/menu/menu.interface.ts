export interface AbstractDashboardElement {
  id?: number
  name: string
  parent_id?: number
  type?: string
  image?: string
  icon?: string
}

export interface DashboardDirectory extends AbstractDashboardElement {
  children?: Array<DashboardDirectory | DashboardLink>
}

export interface DashboardLink extends AbstractDashboardElement {
  url?: string
}

export interface DashboardFile extends AbstractDashboardElement {
  file_id?: number
  file_path?: string
}

export interface LocalURL {
  name: string
  route: string
}