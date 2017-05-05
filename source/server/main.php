<?php

require_once realpath(dirname(__FILE__).'/ServiceProvider.php');
require_once realpath(dirname(__FILE__).'/../dao/TableFactory.php');

// Declaramos los espacios de nombre que vamos a utilizar
use fsm\database as db;

// Definimos los validadores personalizados que vamos a utilizar en
// este proyecto
ServiceProvider::addValidationRule(
  'logged_in', 
  function($scope, $name, $value, $options) {
    $service = NULL;
    include_once realpath(dirname(__FILE__).'/services/session/check-session.php');

    // check if the user has logged in
    if ($service['callback']($scope, NULL)) {
      // get the session segment
      $segment = $scope->session->getSegment('fsm');

      // if she is, then check if the service is expecting
      // the user to have an specific role
      $mustCheckRoles = $options !== 'any';
      if ($mustCheckRoles) {
        // retrieve the current role of the user
        $role = $segment->get('role_name');
        $hasProperRole = false;

        // check if the user's role correspond to any of
        // the roles that the service is expecting
        foreach ($options as $requiredRole) {
          if ($role === $requiredRole) {
            $hasProperRole = true;
            break;
          }
        }

        if (!$hasProperRole) {
          throw new Exception(
            'User does not have the proper role.');
        }
      }
    } else {
      throw new Exception('The user is not logged in');
    }
  }
);

ServiceProvider::addValidationRule(
  'has_privileges',
  function($scope, $name, $value, $options) {
    // first, get the session segment
    $segment = $scope->session->getSegment('fsm');

    // check if a single or multiple permissions are required
    $isSingle = count($options['privilege']) == 1;

    // then check if the user has the given privilege in the
    // specified log
    $hasPrivilege = false;

    // temporal storage of the input data
    $p = $options['program'];
    $m = $options['module'];
    $l = $options['log'];
    $r = $options['privilege'];

    // temporal storage of the user privileges array
    $userPrivileges = $segment->get('privileges');

    // temporal storage for array keys
    $k = array_keys($userPrivileges);
    $k = $k[1];

    if ($isSingle) {
      $hasPrivilege = 
        isset($userPrivileges[$k][$p]['names'][$m][$l]) 
        && $userPrivileges[$k][$p]['names'][$m][$l]['privilege']['name'] == $r;
    } else {
      foreach ($r as $privilege) {
        $hasPrivilege =
          isset($userPrivileges[$k][$p]['names'][$m][$l]) 
          && $userPrivileges[$k][$p]['names'][$m][$l]['privilege']['name'] == $privilege;

        if ($hasPrivilege) {
          break;
        }
      }
    }

    if (!$hasPrivilege) {
      throw new Exception(
        'User is not allowed to use this service');
    }
  }
);

// Instanciamos el provedor de servicios
$controller = new ServiceProvider(
  [
    'daoFactory' => function($config) {
      return new db\TableFactory(
        'fsm\database\\',
        [
          'Zones' => 
            realpath(dirname(__FILE__).'/services/zone/Zones.php'),
          'Users' => 
            realpath(dirname(__FILE__).'/services/account/Users.php'),
          'UsersLogsPrivileges' => 
            realpath(dirname(__FILE__).'/services/session/UsersLogsPrivileges.php'),
          'Logs' =>
            realpath(dirname(__FILE__).'/services/server/Logs.php'),
          'Modules' => 
            realpath(dirname(__FILE__).'/services/programs/Modules.php'),
          'Programs' => 
            realpath(dirname(__FILE__).'/services/programs/Programs.php'),
          'ContactInfo' =>
            realpath(dirname(__FILE__).'/services/contact/Contact.php'),
          'Customers' =>
            realpath(dirname(__FILE__).'/services/contact/Customers.php'),
          'Products' =>
            realpath(dirname(__FILE__).'/services/contact/Products.php'),
          'Suppliers' =>
            realpath(dirname(__FILE__).'/services/contact/Suppliers.php'),
          'WorkingAreas' =>
            realpath(dirname(__FILE__).'/services/area/WorkingAreas.php'),
          'gmp\packing\preop\Items' =>
            realpath(dirname(__FILE__).'/services/gmp/packing/preop/Items.php'),
          'gmp\packing\preop\ItemTypes' =>
            realpath(dirname(__FILE__).'/services/gmp/packing/preop/ItemTypes.php'),
          'CapturedLogs' =>
            realpath(dirname(__FILE__).'/services/authorizations/CapturedLogs.php'),
          'SupervisorsEmployees' =>
            realpath(dirname(__FILE__).'/services/authorizations/SupervisorsEmployees.php'),
          'Roles' =>
            realpath(dirname(__FILE__).'/services/account/Roles.php'),
          'Privileges' =>
            realpath(dirname(__FILE__).'/services/account/Privileges.php'),
        ]
      );
    }
  ],
  [
    'POST' => [
      'add-zone' => 
        realpath(dirname(__FILE__).'/services/zone/add-zone.php'),
      'is-zone-name-duplicated' => 
        realpath(dirname(__FILE__).'/services/zone/is-zone-name-duplicated.php'),
      'list-zones' => 
        realpath(dirname(__FILE__).'/services/zone/list-zones.php'),
      'check-session' => 
        realpath(dirname(__FILE__).'/services/session/check-session.php'),
      'login' => 
        realpath(dirname(__FILE__).'/services/session/login.php'),
      'logout' =>
        realpath(dirname(__FILE__).'/services/session/logout.php'),
      'get-log-manual' =>
        realpath(dirname(__FILE__).'/services/server/get-log-manual.php'),
      'list-programs-modules-logs' =>
        realpath(dirname(__FILE__).'/services/server/list-programs-modules-logs.php'),
      'send-bug-report' =>
        realpath(dirname(__FILE__).'/services/server/send-bug-report.php'),
      'status' =>
        realpath(dirname(__FILE__).'/services/server/status.php'),
      'get-modules-of-program' =>
        realpath(dirname(__FILE__).'/services/programs/get-modules-of-program.php'),
      'list-programs' =>
        realpath(dirname(__FILE__).'/services/programs/list-programs.php'),
      'add-customer' =>
        realpath(dirname(__FILE__).'/services/contact/add-customer.php'),
      'add-product' =>
        realpath(dirname(__FILE__).'/services/contact/add-product.php'),
      'add-supplier' =>
        realpath(dirname(__FILE__).'/services/contact/add-supplier.php'),
      'list-customers' =>
        realpath(dirname(__FILE__).'/services/contact/list-customers.php'),
      'list-products' =>
        realpath(dirname(__FILE__).'/services/contact/list-products.php'),
      'list-suppliers' =>
        realpath(dirname(__FILE__).'/services/contact/list-suppliers.php'),
      'toggle-products' =>
        realpath(dirname(__FILE__).'/services/contact/toggle-products.php'),
      'add-new-inventory-item' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/add-new-inventory-item.php'),
      'add-workplace-area' =>
        realpath(dirname(__FILE__).'/services/area/add-workplace-area.php'),
      'change-order-of-item' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/change-order-of-item.php'),
      'get-areas-of-zone' =>
        realpath(dirname(__FILE__).'/services/area/get-areas-of-zone.php'),
      'get-items-of-area' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/get-items-of-area.php'),
      'list-item-types' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/list-item-types.php'),
      'log-gmp-packing-preop' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/log-gmp-packing-preop.php'),
      'toggle-item-activation' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/toggle-item-activation.php'),
      'approve-log' =>
        realpath(dirname(__FILE__).'/services/authorizations/approve-log.php'),
      'assign-employees-to-supervisors' =>
        realpath(dirname(__FILE__).'/services/authorizations/assign-employees-to-supervisors.php'),
      'get-num-pending-logs' =>
        realpath(dirname(__FILE__).'/services/authorizations/get-num-pending-logs.php'),
      'get-supervisor-num-of-employees' =>
        realpath(dirname(__FILE__).'/services/authorizations/get-supervisor-num-of-employees.php'),
      'list-employees-of-supervisors' =>
        realpath(dirname(__FILE__).'/services/authorizations/list-employees-of-supervisors.php'),
      'list-supervisors-by-zone' =>
        realpath(dirname(__FILE__).'/services/authorizations/list-supervisors-by-zone.php'),
      'list-unapproved-logs-of-user' =>
        realpath(dirname(__FILE__).'/services/authorizations/list-unapproved-logs-of-users.php'),
      'reject-log' =>
        realpath(dirname(__FILE__).'/services/authorizations/reject-log.php'),
      'add-user' =>
        realpath(dirname(__FILE__).'/services/account/add-user.php'),
      'change-password' =>
        realpath(dirname(__FILE__).'/services/account/change-password.php'),
      'change-username' =>
        realpath(dirname(__FILE__).'/services/account/change-username.php'),
      'director-change-zones' =>
        realpath(dirname(__FILE__).'/services/account/director-change-zones.php'),
      'edit-user-privileges' =>
        realpath(dirname(__FILE__).'/services/account/edit-user-privileges.php'),
      'edit-user-role' =>
        realpath(dirname(__FILE__).'/services/account/edit-user-role.php'),
      'edit-user-zone' =>
        realpath(dirname(__FILE__).'/services/account/edit-user-zone.php'),
      'get-employee-info' =>
        realpath(dirname(__FILE__).'/services/account/get-employee-info.php'),
      'get-privileges-of-employee' =>
        realpath(dirname(__FILE__).'/services/account/get-privileges-of-employee.php'),
      'is-employee-num-duplicated' =>
        realpath(dirname(__FILE__).'/services/account/is-employee-num-duplicated.php'),
      'is-login-name-duplicated' =>
        realpath(dirname(__FILE__).'/services/account/is-login-name-duplicated.php'),
      'list-privileges' =>
        realpath(dirname(__FILE__).'/services/account/list-privileges.php'),
      'list-user-roles' =>
        realpath(dirname(__FILE__).'/services/account/list-user-roles.php'),
      'list-users' =>
        realpath(dirname(__FILE__).'/services/account/list-users.php'),
      'toggle-account-activation' =>
        realpath(dirname(__FILE__).'/services/account/toggle-account-activation.php'),
    ]
  ]
);

// Proveemos el servicio
$controller->serveRemoteClient();

?>