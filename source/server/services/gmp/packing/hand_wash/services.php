<?php

$handWash = [
  'tables' => [
    'gmp\packing\handWash\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
    'gmp\packing\handWash\Characteristics' =>
      realpath(dirname(__FILE__).'/Characteristics.php'),
  ],
  'services' => [
    'upload-manual-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-hand-washing.php'),
    'log-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-hand-washing.php'),
    'capture-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-hand-washing.php'),
    'report-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-hand-washing.php'),
    'inventory-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-hand-washing.php'),
    'add-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-hand-washing.php'),
    'toggle-gmp-packing-hand-washing' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-hand-washing.php'),
  ]
];

?>