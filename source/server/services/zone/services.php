<?php

$zone = [
  'tables' => [
    'Zones' => 
      realpath(dirname(__FILE__).'/Zones.php')
  ],
  'services' => [
    'add-zone' => 
      realpath(dirname(__FILE__).'/add-zone.php'),
    'is-zone-name-duplicated' => 
      realpath(dirname(__FILE__).'/is-zone-name-duplicated.php'),
    'list-zones' => 
      realpath(dirname(__FILE__).'/list-zones.php')
  ]
];

?>