<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');


$service = fsm\createLogService(
  'GMP',
  'Packing',
  'Ozone Water Test Log',
  [
    'items_name' => 'items',
    'function' => function($scope, $segment) {
      $machines = $scope->daoFactory->get('gmp\packing\ozone\Machines')
        ->selectActiveByZoneID($segment->get('zone_id'));
      $fieldsTable = 
        $scope->daoFactory->get('gmp\packing\ozone\MachinesFields');
      
      foreach ($machines as &$machine) {
        $fields = $fieldsTable->selectActiveByMachineID($machine['id']);
        $machine['fields'] = $fields;
      }

      unset($machine);

      return $machines;
    }
  ]
);

?>