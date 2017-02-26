<?php

// Importamos el proveedor de servicios
require_once realpath(dirname(__FILE__).'/ServiceProvider.php');

// Importamos los DAOs
require_once realpath(dirname(__FILE__).'/dao/data_access_objects.php');

// Importamos los servicios
require_once realpath(dirname(__FILE__).'/services/services.php');

// Declaramos los espacios de nombre que vamos a utilizar
use fsm\database as db;
use fsm\database\gmp\packing\calibration as cal;
use fsm\database\gmp\packing\preop as preop;
use fsm\services\session as session;

// Definimos los validadores personalizados que vamos a utilizar en
// este proyecto
ServiceProvider::addValidationRule(
  'logged_in', 
  function($scope, $name, $value, $options) {
    // check if the user has logged in
    if (session\isLoggedIn($scope, NULL)) {
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
  'has_privilege',
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
        isset($userPrivileges[$k][$p][$m][$l]) 
        && $userPrivileges[$k][$p][$m][$l]['privilege']['name'] == $r;
    } else {
      foreach ($r as $privilege) {
        $hasPrivilege =
          isset($userPrivileges[$k][$p][$m][$l]) 
          && $userPrivileges[$k][$p][$m][$l]['privilege']['name'] == $privilege;

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
    'capturedLogs' => function($config) { return new db\CapturedLogsDAO; },
    'items' => function($config) { return new db\ItemsDAO; },
    'itemTypes' => function($config) { return new db\ItemTypesDAO; },
    'logs' => function($config) { return new db\LogsDAO; },
    'modules' => function($config) { return new db\ModulesDAO; },
    'privileges' => function($config) { return new db\PrivilegesDAO; },
    'programs' => function($config) { return new db\ProgramsDAO; },
    'roles' => function($config) { return new db\RolesDAO; },
    'supervisorsEmployees' => function($config) { 
      return new db\SupervisorEmployeesDAO; 
    },
    'users' => function($config) { return new db\UsersDAO; },
    'usersLogsPrivileges' => function($config) { 
      return new db\UsersLogsPrivilegesDAO; 
    },
    'workingAreas' => function($config) { return new db\WorkingAreasDAO; },
    'zones' => function($config) { return new db\ZonesDAO; },
    'scaleLogs' => function($config) { return new cal\ScaleLogsDAO; },
    'scales' => function($config) { return new cal\ScalesDAO; },
    'timeLogs' => function($config) { return new cal\TimeLogsDAO; },
    'areasLog' => function($config) { return new preop\AreasLogDAO; },
    'correctiveActions' => function($config) { 
      return new preop\CorrectiveActionsDAO; 
    },
    'itemsLog' => function($config) { return new preop\ItemsLogDAO; }
  ],
  [
    'POST' => 
      $serverServices 
      + $sessionServices
      + $accountServices 
      + $zoneServices 
      + $programServices 
      + $inventoryServices 
      + $authorizationServices 
      + $gmpPackingPreopServices 
      + $gmpPackingCalServices
  ]
);

// Proveemos el servicio
$controller->serveRemoteClient();

?>