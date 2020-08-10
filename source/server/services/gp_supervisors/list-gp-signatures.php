<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator']
  ],
  'callback' => function($scope, $request) {    
    $assignedZones = $scope->daoFactory->get('gpSupervisors\AssignedZones');

    // retrieve active users with a GP Supervisor role
    $rows = $scope->daoFactory->get('Users')->selectGpSupervisors();

    $gpSupervisors = [];

    foreach ($rows as $row) {
      array_push($gpSupervisors, [
        'id' => $row['id'],
        'employee_num' => $row['employee_num'],
        'username' => $row['username'],
        'full_name' => "{$row['first_name']} {$row['last_name']}",
        'signature_path' => (strlen($row['signature_path']) > 0) ? $row['signature_path'] : 'default.png',
        'zones' => $assignedZones->selectZoneIDByUserID($row['id'])
      ]);
    }

    return $gpSupervisors;
  }
];

?>