<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'new_zone' => [
      'type' => 'string',
      'length' => 3
    ],
    'company_name' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ],
    'company_address' => [
      'type' => 'string',
      'min_length' => 1,
      'max_length' => 255
    ]
  ],
  'callback' => function($scope, $request) {
    $zones = $scope->daoFactory->get('Zones'); 
    $isZoneNameDuplicated = $zones->hasByName($request['new_zone']);

    if (!$isZoneNameDuplicated) {
      $zoneID = $zones->insert([
        'name' => $request['new_zone'],
        'company_name' => $request['company_name'],
        'address' => $request['company_address']
      ]);

      $logs = $scope->daoFactory->get('Logs')->selectAll();
      $footers = $scope->daoFactory->get('ReportFooters');

      foreach ($logs as $log) {
        $footers->insert([
          'zone_id' => $zoneID,
          'log_id' => $log['id'],
          'capture_form_footer' => '',
          'report_document_footer' => ''
        ]);
      }

      return $zoneID;
    } else {
      throw new \Exception('Cannot add new zone; name is already taken.');
    }
  }
];

?>