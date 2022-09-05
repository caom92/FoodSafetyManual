import { RegisterEntryInterface } from '../../interfaces/register.interface'

export interface OzoneWaterEntryInterface extends RegisterEntryInterface {
  time: string,
  initials: string,
  area: string
}