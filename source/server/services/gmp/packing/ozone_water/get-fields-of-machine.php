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
    return $scope->daoFactory->get('gmp\packing\ozone\MachinesFields')
      ->selectAllByMachineID($request['area_id']);
  }
];

?>