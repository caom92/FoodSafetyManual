<?php

$gapPreop = [
  'tables' => [
    'gap\packing\preop\AreaLogs' =>
      realpath(dirname(__FILE__).'/AreaLogs.php'),
    'gap\packing\preop\CorrectiveActions' =>
      realpath(dirname(__FILE__).'/CorrectiveActions.php'),
    'gap\packing\preop\ItemLogs' =>
      realpath(dirname(__FILE__).'/ItemLogs.php'),
    'gap\packing\preop\Items' =>
      realpath(dirname(__FILE__).'/Items.php'),
    'gap\packing\preop\ItemTypes' =>
      realpath(dirname(__FILE__).'/ItemTypes.php'),
    'gap\packing\preop\WorkingAreas' =>
      realpath(dirname(__FILE__).'/WorkingAreas.php')
  ],
  'services' => [
    'upload-manual-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-packing-preop.php'),
    'log-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/log-gap-packing-preop.php'),
    'capture-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/capture-gap-packing-preop.php'),
    'report-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/report-gap-packing-preop.php'),
    'inventory-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/inventory-gap-packing-preop.php'),
    'add-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/add-gap-packing-preop.php'),
    'toggle-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/toggle-gap-packing-preop.php'),
    'reorder-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/reorder-gap-packing-preop.php'),
    'list-corrective-actions-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/list-corrective-actions-gap-packing-preop.php'),
    'update-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/update-gap-packing-preop.php'),
    'add-workplace-area-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/add-workplace-area-gap-packing-preop.php'),
    'get-areas-of-zone-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/get-areas-of-zone-gap-packing-preop.php'),
    'get-items-of-area-gap-packing-preop' => 
      realpath(dirname(__FILE__).'/get-items-of-area-gap-packing-preop.php'),
    'authorization-report-gap-packing-preop' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-packing-preop.php')
  ]
];

?>