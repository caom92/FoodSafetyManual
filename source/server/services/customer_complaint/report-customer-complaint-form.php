<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director'],
    'start_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'end_date' => [
      'type' => 'datetime',
      'format' => 'Y-m-d'
    ],
    'sources' => [
      'type' => 'array',
      'optional' => true,
      'values' => [
        'id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $customerComplaintForms = $scope->daoFactory->get('customerComplaint\Logs');
    $customerComplaintDetails = $scope->daoFactory->get('customerComplaint\Details');
    $customerComplaintSources = $scope->daoFactory->get('customerComplaint\Sources');
    $zoneID = $segment->get('zone_id');

    if (isset($request['sources']) && array_key_exists('sources', $request)) {
      if (count($request['sources']) > 0) {
        $zones = '';
        foreach ($request['sources'] as $source) {
          $zones = $zones.$source['id'].',';
        }
        $zones = substr($zones, 0, -1);

        $forms = $customerComplaintForms->selectByDateIntervalAndZones($request['start_date'], $request['end_date'], $zones);
      } else {
        $forms = $customerComplaintForms->selectByDateInterval($request['start_date'], $request['end_date']);  
      }
    } else {
      $forms = $customerComplaintForms->selectByDateInterval($request['start_date'], $request['end_date']);
    }

    foreach ($forms as &$form) {
      $form['creator_name'] = $form['creator_first_name'].' '.$form['creator_last_name'];
      unset($form['creator_first_name']);
      unset($form['creator_last_name']);
      unset($form['accepter_id']);
      unset($form['accepter_first_name']);
      unset($form['accepter_last_name']);
      $form['details'] = $customerComplaintDetails->selectByFormID($form['id']);
      $form['sources'] = $customerComplaintSources->selectByFormID($form['id']);
    }

    return $forms;
  }
];

?>