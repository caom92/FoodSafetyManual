import { Component, Input, OnInit } from '@angular/core'
import { Events } from 'ionic-angular'

import { InventoryType } from '../interfaces/gmp.packing.scale.calibration.inventory.interface'

import { DragulaService } from 'ng2-dragula'

@Component({
  selector: 'gmp-packing-scale-calibration-inventory-list',
  templateUrl: './gmp.packing.scale.calibration.inventory.list.html'
})

export class GMPPackingScaleCalibrationInventoryListComponent implements OnInit {
  @Input()
  type: InventoryType

  constructor(private dragulaService: DragulaService, public events: Events) {
    
  }

  ngOnInit(){
    this.dragulaService.setOptions(this.type.name, {
      moves: function (el, container, handle) {
        return (handle.classList.contains('handle'))
      },
      revertOnSpill: true
    })

    this.dragulaService.drag.subscribe((value) => {
      //console.log(`drag: ${value[0]}`);
      this.events.publish("scroll:stop", "Scroll Stopped")
      this.onDrag(value.slice(1));
    })

    this.dragulaService.dragend.subscribe((value) => {
      //console.log(`drag: ${value[0]}`);
      this.events.publish("scroll:start", "Scroll Started")
      this.onDrag(value.slice(1))
      let index = 1
      for(let item in this.type.items){
        this.type.items[item].order = index++
      }
      console.log("New order")
      console.log(this.type.items)
    })

    /*this.dragulaService.drop.subscribe((value) => {
      const [bagName, e, el] = value;
      //console.log('id is:', e.dataset.id);
      //console.log('order is:', e.dataset.order);
      //console.log(el)
      //console.log(value)
      this.events.publish("scroll:start", "Scroll Started")
      this.onDrop(value.slice(1))
      let index = 1
      for(let item in this.type.items){
        this.type.items[item].order = index++
      }
      console.log("New order")
      console.log(this.type.items)
    })*/
  }

  onDrop(args) {
    let [e, el] = args;
    // do something
  }

  onDrag(args) {
    let [e, el] = args;
    // do something
  }
}