<?php

$account = [
  'tables' => [
    'Users' => 
      realpath(dirname(__FILE__).'/Users.php'),
    'UsersLogsPrivileges' => 
      realpath(dirname(__FILE__).'/UsersLogsPrivileges.php'),
    'Roles' =>
      realpath(dirname(__FILE__).'/Roles.php'),
    'Privileges' =>
      realpath(dirname(__FILE__).'/Privileges.php')
  ],
  'services' => [
    'add-user' =>
      realpath(dirname(__FILE__).'/add-user.php'),
    'change-password' =>
      realpath(dirname(__FILE__).'/change-password.php'),
    'change-username' =>
      realpath(dirname(__FILE__).'/change-username.php'),
    'director-change-zones' =>
      realpath(dirname(__FILE__).'/director-change-zones.php'),
    'edit-user-privileges' =>
      realpath(dirname(__FILE__).'/edit-user-privileges.php'),
    'edit-user-role' =>
      realpath(dirname(__FILE__).'/edit-user-role.php'),
    'edit-user-zone' =>
      realpath(dirname(__FILE__).'/edit-user-zone.php'),
    'get-employee-info' =>
      realpath(dirname(__FILE__).'/get-employee-info.php'),
    'get-privileges-of-employee' =>
      realpath(dirname(__FILE__).'/get-privileges-of-employee.php'),
    'is-employee-num-duplicated' =>
      realpath(dirname(__FILE__).'/is-employee-num-duplicated.php'),
    'is-login-name-duplicated' =>
      realpath(dirname(__FILE__).'/is-login-name-duplicated.php'),
    'list-privileges' =>
      realpath(dirname(__FILE__).'/list-privileges.php'),
    'list-user-roles' =>
      realpath(dirname(__FILE__).'/list-user-roles.php'),
    'list-users' =>
      realpath(dirname(__FILE__).'/list-users.php'),
    'toggle-account-activation' =>
      realpath(dirname(__FILE__).'/toggle-account-activation.php'),
    'edit-user-info' =>
      realpath(dirname(__FILE__).'/edit-user-info.php')
  ]
];

?>