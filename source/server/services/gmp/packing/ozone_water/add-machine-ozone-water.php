<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor'],
    'has_privileges' => [
      'privilege' => ['Read', 'Write'],
      'program' => 'GMP',
      'module' => 'Packing',
      'log' => 'Ozone Water Test Log'
    ],
    'area_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');

    $machines = $scope->daoFactory->get('gmp\packing\ozone\Machines');
    $isNameDuplicated = $machines->hasByNameAndZoneID(
      $request['area_name'], $segment->get('zone_id')
    );

    if (!$isNameDuplicated) {
      $numMachines = $machines->countByZoneID(
        $segment->get('zone_id')
      );

      $position = $numMachines + 1;
      $id = $machines->insert([
        'zone_id' => $segment->get('zone_id'),
        'position' => $position,
        'name' => $request['area_name']
      ]);

      $fields = 
        $scope->daoFactory->get('gmp\packing\ozone\Fields')->selectAll();
      $machinesFields = 
        $scope->daoFactory->get('gmp\packing\ozone\MachinesFields');
      foreach ($fields as $field) {
        $machinesFields->insert([
          'machine_id' => $id,
          'field_id' => $field['id']
        ]);
      }

      return [
        'id' => $id,
        "position" => $position,
        'name' => $request['area_name']
      ];
    } else {
      throw new \Exception(
        'Failed to add new machine; the name is already taken.'
      );
    }
  }
];

?>