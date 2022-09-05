<?php

require_once realpath(dirname(__FILE__).'/../../service_creators.php');

$service = fsm\createRegisterInfoService(
  'finished-product',
  [],
  function($scope, $request) {
    $finishedProductCodes = $scope->daoFactory->get('finishedProduct\Codes');
    $finishedProductStatus = $scope->daoFactory->get('finishedProduct\Status');

    $codes = $finishedProductCodes->selectAll();
    $status = $finishedProductStatus->selectAll();

    return [
      'codes' => $codes,
      'status' => $status
    ];
  },
  ['codes', 'status']
);

?>
