<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Environmental ATP Testing',
  [
    'items_name' => 'entries',
    'extra_info' => [
      'notes'
    ],
    'function' => function($scope, $segment, $logDate) {
      // get the areas corresponding to this log date
      $areaLogs = $scope->daoFactory->get('gmp\packing\atp\TimeLogs')
        ->selectByCaptureDateID($logDate['id']);
        
      // initialize the array of per-area info
      $areas = [];

      // visit each per area log info
      foreach ($areaLogs as $area) {
        // retrieve the data of all the items registered to this area
        $items = $scope->daoFactory->get('gmp\packing\atp\Logs')
          ->selectByTimeLogID($area['time_log_id']);

        // push the complete area data to the final storage
        array_push($areas, [
          'name' => $area['area_name'],
          'time' => $area['time'],
          'items' => $items
        ]);
      }

      return $areas;
    }
  ]
);

?>