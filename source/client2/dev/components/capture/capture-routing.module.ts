import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'gap-others-unusual-occurrence',
    data: { suffix: 'gap-others-unusual-occurrence' },
    loadChildren: './gap-others-unusual-occurrence/gap-others-unusual-occurrence-capture.module#GAPOthersUnusualOccurrenceCaptureModule'
  },
  {
    path: 'gap-packing-preop',
    data: { suffix: 'gap-packing-preop' },
    loadChildren: './gap-packing-preop/gap-packing-preop-capture.module#GAPPackingPreopCaptureModule'
  },
  {
    path: 'gmp-doc-control-doc-control',
    data: { suffix: 'gmp-doc-control-doc-control' },
    loadChildren: './gmp-doc-control-doc-control/gmp-doc-control-doc-control-capture.module#GMPDocControlDocControlCaptureModule'
  },
  {
    path: 'gmp-others-unusual-occurrence',
    data: { suffix: 'gmp-others-unusual-occurrence' },
    loadChildren: './gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-capture.module#GMPOthersUnusualOccurrenceCaptureModule'
  },
  {
    path: 'gmp-packing-aged-product',
    data: { suffix: 'gmp-packing-aged-product' },
    loadChildren: './gmp-packing-aged-product/gmp-packing-aged-product-capture.module#GMPPackingAgedProductCaptureModule'
  },
  {
    path: 'gmp-packing-atp-testing',
    data: { suffix: 'gmp-packing-atp-testing' },
    loadChildren: './gmp-packing-atp-testing/gmp-packing-atp-testing-capture.module#GMPPackingATPTestingCaptureModule'
  },
  {
    path: 'gmp-packing-cold-room-temp',
    data: { suffix: 'gmp-packing-cold-room-temp' },
    loadChildren: './gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-capture.module#GMPPackingColdRoomTempCaptureModule'
  },
  {
    path: 'gmp-packing-finished-product',
    data: { suffix: 'gmp-packing-finished-product' },
    loadChildren: './gmp-packing-finished-product/gmp-packing-finished-product-capture.module#GMPPackingFinishedProductCaptureModule'
  },
  {
    path: 'gmp-packing-glass-brittle',
    data: { suffix: 'gmp-packing-glass-brittle' },
    loadChildren: './gmp-packing-glass-brittle/gmp-packing-glass-brittle-capture.module#GMPPackingGlassBrittleCaptureModule'
  },
  {
    path: 'gmp-packing-hand-washing',
    data: { suffix: 'gmp-packing-hand-washing' },
    loadChildren: './gmp-packing-hand-washing/gmp-packing-hand-washing-capture.module#GMPPackingHandWashingCaptureModule'
  },
  {
    path: 'gmp-packing-ozone-water',
    data: { suffix: 'gmp-packing-ozone-water' },
    loadChildren: './gmp-packing-ozone-water/gmp-packing-ozone-water-capture.module#GMPPackingOzoneWaterCaptureModule'
  },
  {
    path: 'gmp-packing-preop',
    data: { suffix: 'gmp-packing-preop' },
    loadChildren: './gmp-packing-preop/gmp-packing-preop-capture.module#GMPPackingPreopCaptureModule'
  },
  {
    path: 'gmp-packing-scale-calibration',
    data: { suffix: 'gmp-packing-scale-calibration' },
    loadChildren: './gmp-packing-scale-calibration/gmp-packing-scale-calibration-capture.module#GMPPackingScaleCalibrationCaptureModule'
  },
  {
    path: 'gmp-packing-scissors-knives',
    data: { suffix: 'gmp-packing-scissors-knives' },
    loadChildren: './gmp-packing-scissors-knives/gmp-packing-scissors-knives-capture.module#GMPPackingScissorsKnivesCaptureModule'
  },
  {
    path: 'gmp-packing-thermo-calibration',
    data: { suffix: 'gmp-packing-thermo-calibration' },
    loadChildren: './gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-capture.module#GMPPackingThermoCalibrationCaptureModule'
  },
  {
    path: 'gmp-self-inspection-pest-control',
    data: { suffix: 'gmp-self-inspection-pest-control' },
    loadChildren: './gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-capture.module#GMPSelfInspectionPestControlCaptureModule'
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CaptureRoutingModule { }