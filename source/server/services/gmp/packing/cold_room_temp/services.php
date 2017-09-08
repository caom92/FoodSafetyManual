<?php

$coldRoomTemp = [
  'tables' => [
    'gmp\packing\coldRoomTemp\Rooms' =>
      realpath(dirname(__FILE__).'/Rooms.php'),
    'gmp\packing\coldRoomTemp\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-cold-room.php'),
    'log-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-cold-room.php'),
    'capture-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-cold-room.php'),
    'report-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-cold-room.php'),
    'inventory-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-cold-room.php'),
    'add-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-cold-room.php'),
    'toggle-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-cold-room.php'),
    'update-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-cold-room.php'),
    'authorization-report-gmp-packing-cold-room' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-cold-room.php'),
  ]
];

?>