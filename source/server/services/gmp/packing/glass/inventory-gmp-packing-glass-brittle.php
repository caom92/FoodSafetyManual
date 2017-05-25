<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GMP',
  'Packing',
  'Glass & Brittle Plastic Inspection',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    // get the items from the data base
    return $scope->daoFactory->get('gmp\packing\glass\AreaGlass')
      ->selectByAreaID($request['area_id']);
  }
);

?>