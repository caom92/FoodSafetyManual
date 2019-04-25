<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createReportService(
  'GMP',
  'Packing',
  'ATP SystemSURE Luminometer',
  [
    'items_name' => 'items',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $items = $scope->daoFactory->get('gmp\packing\atpLuminometer\ItemLogs')
        ->selectByCaptureDateID($logDate['id']);
      
      $types = $scope->daoFactory->get('gmp\packing\atpLuminometer\Types')
        ->selectAll();

      foreach ($items as &$item) {
        $weeks = $scope->daoFactory->get('gmp\packing\atpLuminometer\WeekLogs')
          ->selectByItemLogID($item['item_log_id']);

        unset($item['item_log_id']);

        foreach ($weeks as &$week) {
          $week['types'] = [];
          foreach ($types as $type) {
            $tempType = [
              'id' => $type['id'],
              'name_en' => $type['name_en'],
              'name_es' => $type['name_es'],
              'tests' => $scope->daoFactory->get('gmp\packing\atpLuminometer\TestLogs')
                ->selectByTypeIDAndWeekID($type['id'], $week['id'])
            ];

            array_push($week['types'], $tempType);
          }
        }

        $item['weeks'] = $weeks;
      }
      
      return $items;
    }
  ]
);

?>