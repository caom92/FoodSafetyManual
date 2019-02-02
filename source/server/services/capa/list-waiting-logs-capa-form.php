<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Supervisor', 'Manager', 'Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $capaForms = $scope->daoFactory->get('capa\Logs');
    $capaFiles = $scope->daoFactory->get('capa\Files');
    $capaImages = $scope->daoFactory->get('capa\Images');

    $zoneID = $segment->get('zone_id');

    $forms = $capaForms->selectCapturingByZoneID($zoneID);

    foreach ($forms as &$form) {
      $form['creator_name'] = $form['creator_first_name'].' '.$form['creator_last_name'];
      unset($form['creator_first_name']);
      unset($form['creator_last_name']);
    }

    return $forms;
  }
]

?>