<?php

// Importamos el proveedor de servicios
require_once realpath(dirname(__FILE__).'/ServiceProvider.php');

// Importamos los DAOs
require_once realpath(dirname(__FILE__).'/dao/data_access_objects.php');

// Importamos los servicios
require_once realpath(dirname(__FILE__).'/services/services.php');

// Declaramos los espacios de nombre que vamos a utilizar
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
    'capturedLogs' => 'fsm\database\CapturedLogsDAO',
    'items' => 'fsm\database\ItemsDAO',
    'itemTypes' => 'fsm\database\ItemTypesDAO',
    'logs' => 'fsm\database\LogsDAO',
    'modules' => 'fsm\database\ModulesDAO',
    'privileges' => 'fsm\database\PrivilegesDAO',
    'programs' => 'fsm\database\ProgramsDAO',
    'roles' => 'fsm\database\RolesDAO',
    'supervisorsEmployees' => 'fsm\database\SupervisorsEmployeesDAO',
    'users' => 'fsm\database\UsersDAO',
    'usersLogsPrivileges' => 'fsm\database\UsersLogsPrivilegesDAO',
    'workingAreas' => 'fsm\database\WorkingAreasDAO',
    'zones' => 'fsm\database\ZonesDAO',
    'scaleLogs' => 'fsm\database\gmp\packing\calibration\ScaleLogsDAO',
    'scales' => 'fsm\database\gmp\packing\calibration\ScalesDAO',
    'scaleTypes' => 'fsm\database\gmp\packing\calibration\ScaleTypesDAO',
    'timeLogs' => 'fsm\database\gmp\packing\calibration\TimeLogsDAO',
    'areasLog' => 'fsm\database\gmp\packing\preop\AreasLogDAO',
    'correctiveActions' => 
      'fsm\database\gmp\packing\preop\CorrectiveActionsDAO',
    'itemsLog' => 'fsm\database\gmp\packing\preop\ItemsLogDAO',
    'knifeGroups' => 'fsm\database\gmp\packing\scissors\GroupsDAO',
    'scissorLogs' => 'fsm\database\gmp\packing\scissors\LogsDAO',
    'thermometers' => 'fsm\database\gmp\packing\thermometers\ThermometersDAO',
    'thermoLogs' => 'fsm\database\gmp\packing\thermometers\LogsDAO',
    'areaGlass' => 'fsm\database\gmp\packing\glass\AreaGlassDAO',
    'glassLogs' => 'fsm\database\gmp\packing\glass\LogsDAO',
    'atpTimeLogs' => 'fsm\database\gmp\packing\atp\TimeLogsDAO',
    'atpLogs' => 'fsm\database\gmp\packing\atp\LogsDAO',
    'handWashLogs' => 'fsm\database\gmp\packing\handWash\LogsDAO',
    'handWashCharacteristics' => 
      'fsm\database\gmp\packing\handWash\CharacteristicsDAO',
    'pestSelfInspectionLogs' => 
      'fsm\database\gmp\pestControl\selfInspection\LogsDAO',
    'pestSelfInspectionStations' => 
      'fsm\database\gmp\pestControl\selfInspection\StationsDAO',
    'pestSelfInspectionRooms' => 
      'fsm\database\gmp\pestControl\selfInspection\RoomsDAO',
    'productionAreas' => 
      'fsm\database\gmp\packing\finishedProduct\ProductionAreasDAO',
    'suppliers' => 'fsm\database\SuppliersDAO',
    'customers' => 'fsm\database\CustomersDAO',
    'qualityTypes' => 'fsm\database\QualityTypesDAO',
    'finishedProductLogs' => 'fsm\database\gmp\packing\finishedProduct\LogsDAO',
    'contactInfo' => 'fsm\database\ContactInfoDAO',
    'unusualOcurrenceLogs' => 
      'fsm\database\gmp\packing\unusualOccurrence\LogsDAO',
    'shifts' => 'fsm\database\ShiftsDAO'
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
      + $gmpPackingThermoServices
      + $gmpPackingScissorServices
      + $gmpPackingGlassServices
      + $gmpPackingATPServices
      + $gmpPackingHandWashServices
      + $gmpPestControlSelfInspectionServices
      + $gmpPackingFinishedProductServices
      + $contactServices
      + $gmpPackingUnusualOccurrenceServices
  ]
);

// Proveemos el servicio
$controller->serveRemoteClient();

?>