<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'user_id' => [
      'type' => 'int',
      'min' => 1
    ],
    'privileges' => [
      'type' => 'array',
      'values' => [
        'log_id' => [
          'type' => 'int',
          'min' => 1
        ],
        'privilege_id' => [
          'type' => 'int',
          'min' => 1
        ]
      ]
    ]
  ],
  'callback' => function($scope, $request) {
    // update the log privileges of the user
    $usersLogsPrivileges = $scope->daoFactory->get('UsersLogsPrivileges');
    foreach ($request['privileges'] as $privilege) {
      $id = $usersLogsPrivileges->getIDByUserAndLogID(
        $request['user_id'],
        $privilege['log_id']
      );

      if (isset($id)) {
        $usersLogsPrivileges->updatePrivilegeByID(
          $id,
          $privilege['privilege_id']
        );
      } else {
        $usersLogsPrivileges->insert([
          'user_id' => $request['user_id'],
          'log_id' => $privilege['log_id'],
          'privilege_id' => $privilege['privilege_id']
        ]);
      }
    }
  }
];

?>