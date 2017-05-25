<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // first, get the items from the data base
    $rows = $scope->daoFactory->get('gmp\packing\preop\ItemTypes')
      ->selectByAreaID($request['area_id']);

    // temporal storage for the items organized by type
    $types = [];

    // temporal storage for each individual type's items
    $type = [
      'id' => 0,
      'name' => '',
      'inventory' => []
    ]; 

    // visit each row obtained from the data base
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

    // push the last item to the final storage
    if ($type['id'] != 0) {
      array_push($types, $type);
    }

    return $types;
  }
]

?>