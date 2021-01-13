<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createAuthorizationReportService(
  'GMP',
  'Packing',
  'Pre-Operational Inspection',
  [
    'items_name' => 'areas',
    'extra_info' => [
      'notes',
      'album_url'
    ],
    'function' => function($scope, $segment, $logDate) {
      $areasLogEntries = [];
      $areas = $scope->daoFactory->get('gmp\packing\preop\AreaLogs')
        ->selectByCaptureDateID($logDate['id']);

      foreach ($areas as $areaData) {
        $items = $scope->daoFactory->get('gmp\packing\preop\ItemLogs')
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
          'en' => $items[0]['type_name_en'],
          'es' => $items[0]['type_name_es'],
          'items' => []
        ];

        foreach ($items as $item) {
          $hasTypeChanged = $tempItems['id'] != $item['type_id'];
          if (!$hasTypeChanged) {
            array_push($tempItems['items'], [
              'id' => $item['item_id'],
              'order' => $item['position'],
              'name' => $item['item_name'],
              'status' => $item['is_acceptable'],
              'corrective_action_id' => 
                $item['corrective_action_id'],
              'corrective_action' => $item['corrective_action'],
              'comment' => $item['comment']
            ]);
          } else {
            array_push($tempAreaLogEntry['types'], $tempItems);
            $tempItems = [
              'id' => $item['type_id'],
              'en' => $item['type_name_en'],
              'es' => $item['type_name_es'],
              'items' => [[
                'id' => $item['item_id'],
                'order' => $item['position'],
                'name' => $item['item_name'],
                'status' => $item['is_acceptable'],
                'corrective_action_id' => 
                  $item['corrective_action_id'],
                'corrective_action' => $item['corrective_action'],
                'comment' => $item['comment']
              ]]
            ];
          }
        }

        array_push($tempAreaLogEntry['types'], $tempItems);
        array_push($areasLogEntries, $tempAreaLogEntry);
      }

      $subject = $scope->daoFactory->get('gmp\packing\preop\SubjectLogs')->selectByCaptureDateID($logDate['id']);

      return [
        'areas' => [
          'corrective_actions' => $scope->daoFactory->get('gmp\packing\preop\CorrectiveActions')->selectAllButOptionOther(),
          'logs' => $areasLogEntries
        ],
        'subject' => (isset($subject[0])) ? $subject[0]['subject'] : '',
        'has_subject' => isset($subject[0])
      ];
    },
    'organization' => [
      'areas',
      'subject',
      'has_subject'
    ]
  ],
  FALSE,
  TRUE
);

?>