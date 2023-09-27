import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'gap-doc-control-doc-control',
    data: { suffix: 'gap-doc-control-doc-control' },
    loadChildren: './gap-doc-control-doc-control/gap-doc-control-doc-control-authorization.module#GAPDocControlDocControlAuthorizationModule'
  },
  {
    path: 'gap-others-unusual-occurrence',
    data: { suffix: 'gap-others-unusual-occurrence' },
    loadChildren: './gap-others-unusual-occurrence/gap-others-unusual-occurrence-authorization.module#GAPOthersUnusualOccurrenceAuthorizationModule'
  },
  {
    path: 'gap-packing-bathroom-cleaning',
    data: { suffix: 'gap-packing-bathroom-cleaning' },
    loadChildren: './gap-packing-bathroom-cleaning/gap-packing-bathroom-cleaning-authorization.module#GAPPackingBathroomCleaningAuthorizationModule'
  },
  {
    path: 'gap-packing-cooler-cleaning',
    data: { suffix: 'gap-packing-cooler-cleaning' },
    loadChildren: './gap-packing-cooler-cleaning/gap-packing-cooler-cleaning-authorization.module#GAPPackingCoolerCleaningAuthorizationModule'
  },
  {
    path: 'gap-packing-harvest-block-inspection',
    data: { suffix: 'gap-packing-harvest-block-inspection' },
    loadChildren: './gap-packing-harvest-block-inspection/gap-packing-harvest-block-inspection-authorization.module#GAPPackingHarvestBlockInspectionAuthorizationModule'
  },
  {
    path: 'gap-packing-harvest-machine-cleaning',
    data: { suffix: 'gap-packing-harvest-machine-cleaning' },
    loadChildren: './gap-packing-harvest-machine-cleaning/gap-packing-harvest-machine-cleaning-authorization.module#GAPPackingHarvestMachineCleaningAuthorizationModule'
  },
  {
    path: 'gap-packing-harvest-tool',
    data: { suffix: 'gap-packing-harvest-tool' },
    loadChildren: './gap-packing-harvest-tool/gap-packing-harvest-tool-authorization.module#GAPPackingHarvestToolAuthorizationModule'
  },
  {
    path: 'gap-packing-master-sanitation',
    data: { suffix: 'gap-packing-master-sanitation' },
    loadChildren: './gap-packing-master-sanitation/gap-packing-master-sanitation-authorization.module#GAPPackingMasterSanitationAuthorizationModule'
  },
  {
    path: 'gap-packing-pest-control-inspection-exterior',
    data: { suffix: 'gap-packing-pest-control-inspection-exterior' },
    loadChildren: './gap-packing-pest-control-inspection-exterior/gap-packing-pest-control-inspection-exterior-authorization.module#GAPPackingPestControlInspectionExteriorAuthorizationModule'
  },
  {
    path: 'gap-packing-pest-control-inspection-interior',
    data: { suffix: 'gap-packing-pest-control-inspection-interior' },
    loadChildren: './gap-packing-pest-control-inspection-interior/gap-packing-pest-control-inspection-interior-authorization.module#GAPPackingPestControlInspectionInteriorAuthorizationModule'
  },
  {
    path: 'gap-packing-pest-control-inspection-flytrap',
    data: { suffix: 'gap-packing-pest-control-inspection-flytrap' },
    loadChildren: './gap-packing-pest-control-inspection-flytrap/gap-packing-pest-control-inspection-flytrap-authorization.module#GAPPackingPestControlInspectionFlytrapAuthorizationModule'
  },
  {
    path: 'gap-packing-preop',
    data: { suffix: 'gap-packing-preop' },
    loadChildren: './gap-packing-preop/gap-packing-preop-authorization.module#GAPPackingPreopAuthorizationModule'
  },
  {
    path: 'gap-packing-water-resource',
    data: { suffix: 'gap-packing-water-resource' },
    loadChildren: './gap-packing-water-resource/gap-packing-water-resource-authorization.module#GAPPackingWaterResourceAuthorizationModule'
  },
  {
    path: 'gap-self-inspection-pest-control',
    data: { suffix: 'gap-self-inspection-pest-control' },
    loadChildren: './gap-self-inspection-pest-control/gap-self-inspection-pest-control-authorization.module#GAPSelfInspectionPestControlAuthorizationModule'
  },
  {
    path: 'gmp-doc-control-doc-control',
    data: { suffix: 'gmp-doc-control-doc-control' },
    loadChildren: './gmp-doc-control-doc-control/gmp-doc-control-doc-control-authorization.module#GMPDocControlDocControlAuthorizationModule'
  },
  {
    path: 'gmp-others-unusual-occurrence',
    data: { suffix: 'gmp-others-unusual-occurrence' },
    loadChildren: './gmp-others-unusual-occurrence/gmp-others-unusual-occurrence-authorization.module#GMPOthersUnusualOccurrenceAuthorizationModule'
  },
  {
    path: 'gmp-packing-aged-product',
    data: { suffix: 'gmp-packing-aged-product' },
    loadChildren: './gmp-packing-aged-product/gmp-packing-aged-product-authorization.module#GMPPackingAgedProductAuthorizationModule'
  },
  {
    path: 'gmp-packing-atp-luminometer',
    data: { suffix: 'gmp-packing-atp-luminometer' },
    loadChildren: './gmp-packing-atp-luminometer/gmp-packing-atp-luminometer-authorization.module#GMPPackingATPLuminometerAuthorizationModule'
  },
  {
    path: 'gmp-packing-atp-testing',
    data: { suffix: 'gmp-packing-atp-testing' },
    loadChildren: './gmp-packing-atp-testing/gmp-packing-atp-testing-authorization.module#GMPPackingATPTestingAuthorizationModule'
  },
  {
    path: 'gmp-packing-bathroom-cleaning',
    data: { suffix: 'gmp-packing-bathroom-cleaning' },
    loadChildren: './gmp-packing-bathroom-cleaning/gmp-packing-bathroom-cleaning-authorization.module#GMPPackingBathroomCleaningAuthorizationModule'
  },
  {
    path: 'gmp-packing-cold-room-temp',
    data: { suffix: 'gmp-packing-cold-room-temp' },
    loadChildren: './gmp-packing-cold-room-temp/gmp-packing-cold-room-temp-authorization.module#GMPPackingColdRoomTempAuthorizationModule'
  },
  {
    path: 'gmp-packing-finished-product',
    data: { suffix: 'gmp-packing-finished-product' },
    loadChildren: './gmp-packing-finished-product/gmp-packing-finished-product-authorization.module#GMPPackingFinishedProductAuthorizationModule'
  },
  {
    path: 'gmp-packing-glass-brittle',
    data: { suffix: 'gmp-packing-glass-brittle' },
    loadChildren: './gmp-packing-glass-brittle/gmp-packing-glass-brittle-authorization.module#GMPPackingGlassBrittleAuthorizationModule'
  },
  {
    path: 'gmp-packing-hand-washing',
    data: { suffix: 'gmp-packing-hand-washing' },
    loadChildren: './gmp-packing-hand-washing/gmp-packing-hand-washing-authorization.module#GMPPackingHandWashingAuthorizationModule'
  },
  {
    path: 'gmp-packing-harvest-tool',
    data: { suffix: 'gmp-packing-harvest-tool' },
    loadChildren: './gmp-packing-harvest-tool/gmp-packing-harvest-tool-authorization.module#GMPPackingHarvestToolAuthorizationModule'
  },
  {
    path: 'gmp-packing-ozone-water',
    data: { suffix: 'gmp-packing-ozone-water' },
    loadChildren: './gmp-packing-ozone-water/gmp-packing-ozone-water-authorization.module#GMPPackingOzoneWaterAuthorizationModule'
  },
  {
    path: 'gmp-packing-pest-control-inspection-exterior',
    data: { suffix: 'gmp-packing-pest-control-inspection-exterior' },
    loadChildren: './gmp-packing-pest-control-inspection-exterior/gmp-packing-pest-control-inspection-exterior-authorization.module#GMPPackingPestControlInspectionExteriorAuthorizationModule'
  },
  {
    path: 'gmp-packing-pest-control-inspection-interior',
    data: { suffix: 'gmp-packing-pest-control-inspection-interior' },
    loadChildren: './gmp-packing-pest-control-inspection-interior/gmp-packing-pest-control-inspection-interior-authorization.module#GMPPackingPestControlInspectionInteriorAuthorizationModule'
  },
  {
    path: 'gmp-packing-pest-control-inspection-flytrap',
    data: { suffix: 'gmp-packing-pest-control-inspection-flytrap' },
    loadChildren: './gmp-packing-pest-control-inspection-flytrap/gmp-packing-pest-control-inspection-flytrap-authorization.module#GMPPackingPestControlInspectionFlytrapAuthorizationModule'
  },
  {
    path: 'gmp-packing-preop',
    data: { suffix: 'gmp-packing-preop' },
    loadChildren: './gmp-packing-preop/gmp-packing-preop-authorization.module#GMPPackingPreopAuthorizationModule'
  },
  {
    path: 'gmp-packing-product-revision',
    data: { suffix: 'gmp-packing-product-revision' },
    loadChildren: './gmp-packing-product-revision/gmp-packing-product-revision-authorization.module#GMPPackingProductRevisionAuthorizationModule'
  },
  {
    path: 'gmp-packing-scale-calibration',
    data: { suffix: 'gmp-packing-scale-calibration' },
    loadChildren: './gmp-packing-scale-calibration/gmp-packing-scale-calibration-authorization.module#GMPPackingScaleCalibrationAuthorizationModule'
  },
  {
    path: 'gmp-packing-scissors-knives',
    data: { suffix: 'gmp-packing-scissors-knives' },
    loadChildren: './gmp-packing-scissors-knives/gmp-packing-scissors-knives-authorization.module#GMPPackingScissorsKnivesAuthorizationModule'
  },
  {
    path: 'gmp-packing-thermo-calibration',
    data: { suffix: 'gmp-packing-thermo-calibration' },
    loadChildren: './gmp-packing-thermo-calibration/gmp-packing-thermo-calibration-authorization.module#GMPPackingThermoCalibrationAuthorizationModule'
  },
  {
    path: 'gmp-self-inspection-pest-control',
    data: { suffix: 'gmp-self-inspection-pest-control' },
    loadChildren: './gmp-self-inspection-pest-control/gmp-self-inspection-pest-control-authorization.module#GMPSelfInspectionPestControlAuthorizationModule'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthorizationRoutingModule { }