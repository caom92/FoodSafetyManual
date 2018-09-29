<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Director']
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $usersTable = $scope->daoFactory->get('Users');
    $menuTable = $scope->daoFactory->get('MenuItems');
    $users = $usersTable->selectSupervisorsAndEmployyeesByZoneID($segment->get('zone_id'));
    $results = array();

    foreach ($users as $user) {
      //$hasMenu = $menuTable->selectByUserId($user['id']);

      $hasMenu = count($menuTable->selectByUserId($user['id']));

      $user['has_menu'] = ($hasMenu > 0 ? 1 : 0);

      array_push($results, $user);
    }

    return $results;
  }
];

?>