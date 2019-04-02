import { FormBuilder, FormGroup } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'

import { AreaInventoryService } from '../../../services/area-inventory.service'
import { SuperInventoryAreaInterface, SuperInventoryEditAreaInterface } from './super.area.inventory.interface'

export class SuperInventoryAreaComponent {
  protected area: SuperInventoryAreaInterface
  protected newArea: FormGroup = new FormBuilder().group({})
  protected toggleValue: boolean = true
  private toggleError: boolean = false
  private previousValue: boolean = null
  private suffix: string = null
  protected editMode: boolean = false

  constructor(private events: PubSubService,
    private _fb: FormBuilder,
    private areaInventoryService: AreaInventoryService) {

  }

  public setToggleValue(status: boolean): void {
    if (this.area.is_active == 1) {
      this.toggleValue = true
    } else {
      this.toggleValue = false
    }
  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newArea = this._fb.group(controlsConfig)
  }

  public editArea(areaData: SuperInventoryEditAreaInterface) {
    if (this.newArea.valid && this.newArea.value.name != this.area.name) {
      this.areaInventoryService.editArea(this.suffix, areaData).then(success => {
        this.editMode = false
        this.area.name = this.newArea.value.name
        this.events.$pub('area:edit', this.area)
      }, error => {

      })
    } else if (!this.newArea.valid) {
      console.log('New item not valid')
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    } else if (this.newArea.value.name == this.area.name) {
      console.log('New and old name are the same')
      // TODO Poner un toast aquí para mostrar el mensaje al usuario
    }
  }

  public toggleArea(): void {
    if (this.toggleError) {
      this.toggleValue = this.previousValue
      this.toggleError = false
    } else {
      this.previousValue = this.toggleValue
      this.areaInventoryService.toggleArea(this.suffix, this.area).then(success => {

      }, error => {
        this.toggleError = true
        this.toggleArea()
      })
    }
  }
}