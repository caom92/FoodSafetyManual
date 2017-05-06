<?php

require_once realpath(dirname(__FILE__).'/ServiceProvider.php');
require_once realpath(dirname(__FILE__).'/../dao/TableFactory.php');
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
        $zone['tables'] +
        $server['tables'] +
        $programs['tables'] +
        $contact['tables'] +
        $authorizations['tables'] +
        $area['tables'] +
        $account['tables'] +
        [
          
          
          
          
          
          
          'gmp\packing\preop\Items' =>
            realpath(dirname(__FILE__).'/services/gmp/packing/preop/Items.php'),
          'gmp\packing\preop\ItemTypes' =>
            realpath(dirname(__FILE__).'/services/gmp/packing/preop/ItemTypes.php'),
          
          
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
      $area['services'] +
      $account['services'] +
    [
      
      
      
      
      
      'add-new-inventory-item' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/add-new-inventory-item.php'),
      
      'change-order-of-item' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/change-order-of-item.php'),
      
      'get-items-of-area' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/get-items-of-area.php'),
      'list-item-types' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/list-item-types.php'),
      'log-gmp-packing-preop' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/log-gmp-packing-preop.php'),
      'toggle-item-activation' =>
        realpath(dirname(__FILE__).'/services/gmp/packing/preop/toggle-item-activation.php'),
      
      
    ]
  ]
);

// Proveemos el servicio
$controller->serveRemoteClient();

?>