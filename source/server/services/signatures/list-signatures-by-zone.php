<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'zone_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // first connect to the database and retrieve the supervisor list
    $rows = $scope->daoFactory->get('Users')
      ->selectInfoAndSignatureByZoneID($request['zone_id']);

    // temporal storage for the list of supervisors to return to the user
    $supervisors = [];

    // prepare the final supervisor list
    foreach ($rows as $row) {
      array_push($supervisors, [
        'id' => $row['id'],
        'employee_num' => $row['employee_num'],
        'username' => $row['username'],
        'full_name' => "{$row['first_name']} {$row['last_name']}",
        'signature_path' => $row['signature_path']
      ]);
    }

    // return it to the user
    return $supervisors;
  }
];

?>