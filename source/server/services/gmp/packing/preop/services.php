<?php

$preop = [
  'tables' => [
    'gmp\packing\preop\AreaLogs' =>
      realpath(dirname(__FILE__).'/AreaLogs.php'),
    'gmp\packing\preop\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gmp\packing\preop\ItemLogs' =>
      realpath(dirname(__FILE__).'/ItemLogs.php'),
    'gmp\packing\preop\Items' =>
      realpath(dirname(__FILE__).'/Items.php'),
    'gmp\packing\preop\ItemTypes' =>
      realpath(dirname(__FILE__).'/ItemTypes.php'),
    'gmp\packing\preop\WorkingAreas' =>
      realpath(dirname(__FILE__).'/WorkingAreas.php')
  ],
  'services' => [
    'upload-manual-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-packing-preop.php'),
    'log-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/log-gmp-packing-preop.php'),
    'capture-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/capture-gmp-packing-preop.php'),
    'report-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/report-gmp-packing-preop.php'),
    'inventory-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/inventory-gmp-packing-preop.php'),
    'add-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/add-gmp-packing-preop.php'),
    'toggle-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/toggle-gmp-packing-preop.php'),
    'reorder-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/reorder-gmp-packing-preop.php'),
    'list-corrective-actions-gmp-packing-preop' => realpath(dirname(__FILE__)
      .'/list-corrective-actions-gmp-packing-preop.php'),
    'update-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/update-gmp-packing-preop.php'),
    'add-workplace-area-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/add-workplace-area-gmp-packing-preop.php'),
    'get-areas-of-zone-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/get-areas-of-zone-gmp-packing-preop.php'),
    'get-items-of-area-gmp-packing-preop' => 
      realpath(dirname(__FILE__).'/get-items-of-area-gmp-packing-preop.php'),
    'authorization-report-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-packing-preop.php'),
    'reorder-area-gmp-packing-preop' =>
      realpath(dirname(__FILE__).'/reorder-area-gmp-packing-preop.php')
  ]
];

?>