<?php

require_once realpath(dirname(__FILE__).'/ServiceProvider.php');
require_once realpath(dirname(__FILE__).'/dao/TableFactory.php');
require_once realpath(dirname(__FILE__).'/services/services.php');

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
            'User does not have the proper role.',
            117
          );
        }
      }
    } else {
      throw new Exception('The user is not logged in', 118);
    }
  }
);

ServiceProvider::addValidationRule(
  'has_privileges',
  function($scope, $name, $value, $options) {
    // first, get the session segment
    $segment = $scope->session->getSegment('fsm');

    // check if a single or multiple permissions are required
    if (is_array($options['privilege'])) {
      $isSingle = count($options['privilege']) == 1;
    } else {
      $isSingle = true;
    }

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
        'User is not allowed to use this service',
        119
      );
    }
  }
);

// Instanciamos el provedor de servicios
$controller = new ServiceProvider(
  [
    'daoFactory' => function($config) use (
      $zone, $server, $programs, $contact, $authorizations, $account,
      $atp, $calibration, $finishedProduct, $glass, $handWash, $preop, 
      $scissors, $thermometers, $gmpOthersUnusualOccurrences, 
      $gapOthersUnusualOccurrences, $selfInspection, $footers, $gapPreop, 
      $docControl, $coldRoomTemp, $agedProduct, $ozoneWater, $waterResource, $menu,
      $gapDocControl, $capa, $atpLuminometer, $gmpHarvestTool, $gapHarvestTool,
      $productRevision, $harvestBlockInspection, $gapSelfInspection, $customerComplaint,
      $gapBathroomCleaning, $gmpBathroomCleaning, $harvestMachineCleaning, $gpSignatures,
      $cropRegistry, $registers, $vehicleCleaning, $gapPestControlInspectionExterior,
      $gmpPestControlInspectionExterior, $gapPestControlInspectionInterior,
      $gmpPestControlInspectionInterior, $gapPestControlInspectionFlytrap,
      $gmpPestControlInspectionFlytrap, $gapMasterSanitation, $gapCoolerCleaning, 
      $registerOzoneWater, $workOrder, $finishedProductRegister) {
      return new db\TableFactory(
        'fsm\database\\',
        $zone['tables'] +
        $server['tables'] +
        $programs['tables'] +
        $contact['tables'] +
        $authorizations['tables'] +
        $account['tables'] +
        $atp['tables'] +
        $gapBathroomCleaning['tables'] +
        $gmpBathroomCleaning['tables'] +
        $calibration['tables'] +
        $finishedProduct['tables'] +
        $glass['tables'] +
        $handWash['tables'] +
        $preop['tables'] +
        $scissors['tables'] +
        $thermometers['tables'] +
        $gmpOthersUnusualOccurrences['tables'] +
        $gapOthersUnusualOccurrences['tables'] +
        $selfInspection['tables'] +
        $footers['tables'] +
        $gapPreop['tables'] +
        $gpSignatures['tables'] +
        $docControl['tables'] +
        $coldRoomTemp['tables'] +
        $agedProduct['tables'] +
        $ozoneWater['tables'] +
        $waterResource['tables'] +
        $gapDocControl['tables'] +
        $atpLuminometer['tables'] +
        $gmpHarvestTool['tables'] +
        $gapHarvestTool['tables'] +
        $harvestMachineCleaning['tables'] +
        $productRevision['tables'] +
        $harvestBlockInspection['tables'] +
        $gapSelfInspection['tables'] +
        $menu['tables'] +
        $capa['tables'] +
        $workOrder['tables'] +
        $cropRegistry['tables'] +
        $registers['tables'] +
        $vehicleCleaning['tables'] +
        $registerOzoneWater['tables'] +
        $finishedProductRegister['tables'] +
        $gapPestControlInspectionExterior['tables'] +
        $gmpPestControlInspectionExterior['tables'] +
        $gapPestControlInspectionInterior['tables'] +
        $gmpPestControlInspectionInterior['tables'] +
        $gapPestControlInspectionFlytrap['tables'] +
        $gmpPestControlInspectionFlytrap['tables'] +
        $gapMasterSanitation['tables'] +
        $gapCoolerCleaning['tables'] +
        $customerComplaint['tables'] +
        [
          'Shifts' =>
            realpath(dirname(__FILE__).'/services/Shifts.php'),
          'QualityTypes' =>
            realpath(dirname(__FILE__).'/services/QualityTypes.php')
        ]
      );
    }
  ],
  [
    'POST' => 
      $zone['services'] +
      $session['services'] +
      $server['services'] +
      $programs['services'] +
      $contact['services'] +
      $authorizations['services'] +
      $account['services'] +
      $atp['services'] +
      $gapBathroomCleaning['services'] +
      $gmpBathroomCleaning['services'] +
      $calibration['services'] +
      $finishedProduct['services'] +
      $glass['services'] +
      $handWash['services'] +
      $preop['services'] +
      $scissors['services'] +
      $thermometers['services'] +
      $gmpOthersUnusualOccurrences['services'] +
      $gapOthersUnusualOccurrences['services'] +
      $selfInspection['services'] +
      $footers['services'] +
      $gapPreop['services'] +
      $signatures['services'] +
      $gpSignatures['services'] +
      $docControl['services'] +
      $coldRoomTemp['services'] +
      $agedProduct['services'] +
      $ozoneWater['services'] +
      $waterResource['services'] +
      $gapDocControl['services'] +
      $atpLuminometer['services'] +
      $gmpHarvestTool['services'] +
      $gapHarvestTool['services'] +
      $harvestMachineCleaning['services'] +
      $productRevision['services'] +
      $harvestBlockInspection['services'] +
      $gapSelfInspection['services'] +
      $menu['services'] +
      $capa['services'] +
      $workOrder['services'] +
      $cropRegistry['services'] +
      $registers['services'] +
      $vehicleCleaning['services'] +
      $registerOzoneWater['services'] +
      $finishedProductRegister['services'] +
      $gapPestControlInspectionExterior['services'] +
      $gmpPestControlInspectionExterior['services'] +
      $gapPestControlInspectionInterior['services'] +
      $gmpPestControlInspectionInterior['services'] +
      $gapPestControlInspectionFlytrap['services'] +
      $gmpPestControlInspectionFlytrap['services'] +
      $gapMasterSanitation['services'] +
      $gapCoolerCleaning['services'] +
      $customerComplaint['services']
  ]
);

// Proveemos el servicio
$controller->serveRemoteClient();

?>