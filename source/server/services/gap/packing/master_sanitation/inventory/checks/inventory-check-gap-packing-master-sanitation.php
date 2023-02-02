<?php

require_once realpath(dirname(__FILE__).'/../../../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Master Sanitation Schedule',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $rows = $scope->daoFactory->get('gap\packing\masterSanitation\Types')
      ->selectByAreaID($request['area_id']);

    $types = [];

    $type = [
      'id' => 0,
      'name' => '',
      'inventory' => []
    ];

    foreach ($rows as $item) {
      // check if this item belongs to a new type
      $hasTypeChanged = $type['id'] != $item['type_id'];
      if ($hasTypeChanged) {
        // if it does, check if the current accumulated items inventory is 
        // not empty
        if ($type['id'] != 0) {
          // if it is not, push it to the final storage
          array_push($types, $type);
        }

        // now save the current item's data
        $inventoryItem = [
          'id' => $item['id'],
          'is_active' => $item['is_active'],
          'position' => $item['position'],
          'name' => $item['name']
        ];

        // and create a new storage for the items of the new type pushing 
        // the current item to its inventory
        $type = [
          'id' => $item['type_id'],
          'name' => $item['type_name'],
          'inventory' => (isset($item['id'])) ? [
            $inventoryItem
          ] : []
        ];
      } else {
        // if the type has not changed, push the current item to the 
        // current type's inventory
        array_push($type['inventory'], [
          'id' => $item['id'],
          'is_active' => $item['is_active'],
          'position' => $item['position'],
          'name' => $item['name']
        ]);
      }
    }

    if ($type['id'] != 0) {
      array_push($types, $type);
    }

    return $types;
  }
);

?>
