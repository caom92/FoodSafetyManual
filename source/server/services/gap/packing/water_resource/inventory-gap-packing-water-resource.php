<?php

require_once realpath(dirname(__FILE__).'/../../../service_creators.php');

$service = fsm\createInventoryService(
  'GAP',
  'Fields',
  'Annual Water Resource Sanitary Survey Form',
  [
    'area_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  function($scope, $request) {
    return $scope->daoFactory->get('gap\packing\waterResource\Items')
      ->selectByAreaID($request['area_id']);
  }
);

?>