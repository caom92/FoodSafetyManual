<?php

$selfInspection = [
  'tables' => [
    'gmp\pestControl\selfInspection\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\pestControl\selfInspection\Rooms' =>
      realpath(dirname(__FILE__).'/Rooms.php'),
    'gmp\pestControl\selfInspection\Stations' =>
      realpath(dirname(__FILE__).'/Stations.php'),
  ],
  'services' => [
    'upload-manual-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-pest-control-self-inspection.php'),
    'log-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/log-gmp-pest-control-self-inspection.php'),
    'capture-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/capture-gmp-pest-control-self-inspection.php'),
    'report-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/report-gmp-pest-control-self-inspection.php'),
    'inventory-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/inventory-gmp-pest-control-self-inspection.php'),
    'add-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/add-gmp-pest-control-self-inspection.php'),
    'toggle-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/toggle-gmp-pest-control-self-inspection.php'),
    'reorder-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/reorder-gmp-pest-control-self-inspection.php'),
    'add-room-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/add-room-gmp-pest-control-self-inspection.php'),
    'rooms-gmp-pest-control-self-inspection' =>
      realpath(dirname(__FILE__).'/rooms-gmp-pest-control-self-inspection.php'),
  ]
];

?>