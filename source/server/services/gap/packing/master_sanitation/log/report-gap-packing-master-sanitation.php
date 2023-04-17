<?php

require_once realpath(dirname(__FILE__).'/../../../../service_creators.php');

$service = fsm\createReportService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    'items_name' => 'areas',
    'extra_info' => [
      'notes',
      'album_url'
    ],
    'function' => function($scope, $segment, $logDate) {
      $areas = $scope->daoFactory->get('gap\packing\masterSanitation\AreasLogs')
        ->selectByCaptureDateID($logDate['id']);

      // final array where the working areas are going to be stored
      $areasLogEntries = [];

      // for each row obtained from the data base...
      //var_dump($areas);
      foreach ($areas as $areaData) {
        $items = $scope->daoFactory->get('gap\packing\masterSanitation\ChecksLogs')
          ->selectByAreaLogID($areaData['id']);
        $tempAreaLogEntry = [
          'id' => $items[0]['area_id'],
          'name' => $items[0]['area_name'],
          'person_performing_sanitation' =>
            $areaData['person_performing_sanitation'],
          'notes' => $areaData['notes'],
          'time' => $areaData['time'],
          'types' => []
        ];

        $currentType = $items[0]['type_id'];
        $tempItems = [
          'id' => $items[0]['type_id'],
          'name' => $items[0]['type_name'],
          'items' => []
        ];

        foreach ($items as $item) {
          $hasTypeChanged = $tempItems['id'] != $item['type_id'];
          if (!$hasTypeChanged) {
            array_push($tempItems['items'], [
              'id' => $item['item_id'],
              'order' => $item['item_order'],
              'name' => $item['item_name'],
              'status' => $item['status'],
              'corrective_action' => 
                $item['corrective_action'],
              'notes' => $item['notes']
            ]);
          } else {
            array_push($tempAreaLogEntry['types'], $tempItems);
            $tempItems = [
              'id' => $item['type_id'],
              'name' => $item['type_name'],
              'items' => [[
                'id' => $item['item_id'],
                'order' => $item['item_order'],
                'name' => $item['item_name'],
                'status' => $item['status'],
                'corrective_action' => 
                  $item['corrective_action'],
                'notes' => $item['notes']
              ]]
            ];
          }
        }

        array_push($tempAreaLogEntry['types'], $tempItems);
        array_push($areasLogEntries, $tempAreaLogEntry);
      }
      
      return [
        'areas' => $areasLogEntries
      ];
    },
    'organization' => [
      'areas'
    ]
  ],
  FALSE,
  TRUE
);

?>
