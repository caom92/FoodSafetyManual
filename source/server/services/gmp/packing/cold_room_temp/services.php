<?php

$coldRoomTemp = [
  'tables' => [
    'gmp\packing\coldRoomTemp\Rooms' =>
      realpath(dirname(__FILE__).'/Rooms.php'),
    'gmp\packing\coldRoomTemp\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-cold-room-temp.php'),
    'log-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-cold-room-temp.php'),
    'capture-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-cold-room-temp.php'),
    'report-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-cold-room-temp.php'),
    'inventory-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-cold-room-temp.php'),
    'add-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-cold-room-temp.php'),
    'toggle-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-cold-room-temp.php'),
    'update-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-cold-room-temp.php'),
    'authorization-report-gmp-packing-cold-room-temp' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-cold-room-temp.php'),
  ]
];

?>