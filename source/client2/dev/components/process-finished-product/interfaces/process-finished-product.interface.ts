export interface ProcessFinishedProductEntryInterface {
  id: number
  code_id: number
  code: string
  description: string
  brix: number
  color: number
  action_id: number
  action: string
  date: string
}

export interface ProcessFinishedProductCodeInterface {
  id: number
  code: string
  description: string
}

export interface ProcessFinishedProductActionInterface {
  id: number
  action: string
}

export interface ProcessFinishedProductInfoInterface {
  codes: Array<ProcessFinishedProductCodeInterface>
  actions: Array<ProcessFinishedProductActionInterface>
  entries: Array<ProcessFinishedProductEntryInterface>
}
