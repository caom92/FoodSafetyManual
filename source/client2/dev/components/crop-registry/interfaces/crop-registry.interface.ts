export interface CropRegistryEntryInterface {
  id: number
  submitter_first_name: string
  submitter_last_name: string
  zone_name: string
  date: string
  crop: string
  variety: string
  section: string
  block: string
  weight: number
  people: number
  hours: number
}

export interface CropRegistryAutocompleteInterface {
  data: { [key: string]: string }
  limit: number
  //current: string
  //count: number
  //arr?: Array<string>
}