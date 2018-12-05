<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'items_name' => 'areas',
    'extra_info' => [
      // NULL
    ],
    'function' => function($scope, $segment, $logDate) {
      $items = $scope->daoFactory->get('gap\packing\waterResource\Logs')
          ->selectByCaptureDateID(
            $logDate['id']
          );
      
      $areas = [];

      $area = [
        'id' => 0
      ];

      foreach ($items as $item) {
        $hasAreaChanged = $item['area_id'] != $area['id'];
        if ($hasAreaChanged) {
          if ($area['id'] != 0) {
            array_push($areas, $area);
          }

          $area = [
            'id' => $item['area_id'],
            'name' => $item['area_name'],
            'items' => [
              [
                'id' => $item['id'],
                'name' => $item['name'],
                'date' => $item['date'],
                'compliance' => $item['compliance'],
                'corrective_actions' => $item['corrective_actions']
              ]
            ]
          ];
        } else {
          array_push($area['items'], [
            'id' => $item['id'],
            'name' => $item['name'],
            'date' => $item['date'],
            'compliance' => $item['compliance'],
            'corrective_actions' => $item['corrective_actions']
          ]);
        }
      }

      if ($area['id'] != 0) {
        array_push($areas, $area);
      }

      return $areas;
    }
  ]
);

?>