import { FormBuilder, FormGroup } from '@angular/forms'
import { PubSubService } from 'angular2-pubsub'

import { AreaInventoryService } from '../../../services/area-inventory.service'
import { FormUtilService } from '../../../services/form-util.service'

export class SuperInventoryAddAreaComponent {
  protected newArea: FormGroup = new FormBuilder().group({})
  private suffix: string = null

  constructor(protected _fb: FormBuilder,
    private areaInventoryService: AreaInventoryService,
    private events: PubSubService,
    private formUtilService: FormUtilService) {

  }

  public setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  public createItemForm(controlsConfig: { [key: string]: any }): void {
    this.newArea = this._fb.group(controlsConfig)
  }

  public addArea(listData: any, itemData: any) {
    if (this.newArea.valid) {
      this.areaInventoryService.addArea(this.suffix, itemData).then(success => {
        listData.area.id = success.id
        listData.area.position = success.position
        this.events.$pub('area:add', listData.area)
      }, error => {

      })
    } else {
      this.formUtilService.deepMarkAsDirty(this.newArea)
    }
  }
}