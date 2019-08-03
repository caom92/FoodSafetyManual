import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'gap-doc-control-doc-control',
    data: { suffix: 'gap-doc-control-doc-control' },
    loadChildren: './gap-doc-control-doc-control/gap-doc-control-doc-control-inventory.module#GAPDocControlDocControlInventoryModule'
  },
  {
    path: 'gap-packing-harvest-tool',
    data: { suffix: 'gap-packing-harvest-tool' },
    loadChildren: './gap-packing-harvest-tool/gap-packing-harvest-tool-inventory.module#GAPPackingHarvestToolInventoryModule'
  },
  {
    path: 'gap-packing-preop',
    data: { suffix: 'gap-packing-preop' },
    loadChildren: './gap-packing-preop/gap-packing-preop-inventory.module#GAPPackingPreopInventoryModule'
  },
  {
    path: 'gap-packing-water-resource',
    data: { suffix: 'gap-packing-water-resource' },
    loadChildren: './gap-packing-water-resource/gap-packing-water-resource-inventory.module#GAPPackingWaterResourceInventoryModule'
  },
  {
    path: 'gmp-doc-control-doc-control',
    data: { suffix: 'gmp-doc-control-doc-control' },
    loadChildren: './gmp-doc-control-doc-control/gmp-doc-control-doc-control-inventory.module#GMPDocControlDocControlInventoryModule'
  },
  {
    path: 'gmp-packing-atp-luminometer',
    data: { suffix: 'gmp-packing-atp-luminometer' },
    loadChildren: './gmp-packing-atp-luminometer/gmp-packing-atp-luminometer-inventory.module#GMPPackingATPLuminometerInventoryModule'
  },
  {
    path: 'gmp-packing-cold-room-temp',
    data: { suffix: 'gmp-packing-cold-room-temp' },
    loadChildren: './gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-inventory.module#GMPPackingColdRoomTempInventoryModule'
  },
  {
    path: 'gmp-packing-glass-brittle',
    data: { suffix: 'gmp-packing-glass-brittle' },
    loadChildren: './gmp-packing-glass-brittle/gmp-packing-glass-brittle-inventory.module#GMPPackingGlassBrittleInventoryModule'
  },
  {
    path: 'gmp-packing-hand-washing',
    data: { suffix: 'gmp-packing-hand-washing' },
    loadChildren: './gmp-packing-hand-washing/gmp-packing-hand-washing-inventory.module#GMPPackingHandWashingInventoryModule'
  },
  {
    path: 'gmp-packing-harvest-tool',
    data: { suffix: 'gmp-packing-harvest-tool' },
    loadChildren: './gmp-packing-harvest-tool/gmp-packing-harvest-tool-inventory.module#GMPPackingHarvestToolInventoryModule'
  },
  {
    path: 'gmp-packing-ozone-water',
    data: { suffix: 'gmp-packing-ozone-water' },
    loadChildren: './gmp-packing-ozone-water/gmp-packing-ozone-water-inventory.module#GMPPackingOzoneWaterInventoryModule'
  },
  {
    path: 'gmp-packing-preop',
    data: { suffix: 'gmp-packing-preop' },
    loadChildren: './gmp-packing-preop/gmp-packing-preop-inventory.module#GMPPackingPreopInventoryModule'
  },
  {
    path: 'gmp-packing-scale-calibration',
    data: { suffix: 'gmp-packing-scale-calibration' },
    loadChildren: './gmp-packing-scale-calibration/gmp-packing-scale-calibration-inventory.module#GMPPackingScaleCalibrationInventoryModule'
  },
  {
    path: 'gmp-packing-scissors-knives',
    data: { suffix: 'gmp-packing-scissors-knives' },
    loadChildren: './gmp-packing-scissors-knives/gmp-packing-scissors-knives-inventory.module#GMPPackingScissorsKnivesInventoryModule'
  },
  {
    path: 'gmp-packing-thermo-calibration',
    data: { suffix: 'gmp-packing-thermo-calibration' },
    loadChildren: './gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-inventory.module#GMPPackingThermoCalibrationInventoryModule'
  },
  {
    path: 'gmp-self-inspection-pest-control',
    data: { suffix: 'gmp-self-inspection-pest-control' },
    loadChildren: './gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-inventory.module#GMPSelfInspectionPestControlInventoryModule'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InventoryRoutingModule { }