<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    $registersTable = $scope->daoFactory->get('Registers');
    $footersTable = $scope->daoFactory->get('RegisterFooters');

    $footers = $footersTable->selectByZoneID($request['zone_id']);
    $registers = $registersTable->selectAll();

    $footerList = [];

    foreach($registers as $register) {
      // See if a register has a corresponding match in footers
      $key = array_search($register['id'], array_column($footers, 'register_id'));
      if ($key !== false) {
        // Use the info in footers
        array_push($footerList, [
          'id' => $footers[$key]['id'],
          'zone_id' => $footers[$key]['zone_id'],
          'register_id' => $footers[$key]['register_id'],
          'name' => [
            'en' => $footers[$key]['name_en'],
            'es' => $footers[$key]['name_es']
          ],
          'footer' => $footers[$key]['footer'] !== NULL ? $footers[$key]['footer'] : ''
        ]);
      } else {
        // Create a new entry with the info from registers
        array_push($footerList, [
          'id' => NULL,
          'zone_id' => $request['zone_id'],
          'register_id' => $register['id'],
          'name' => [
            'en' => $register['name_en'],
            'es' => $register['name_es']
          ],
          'footer' => ''
        ]);
      }
    }

    return $footerList;
  }
];

?>