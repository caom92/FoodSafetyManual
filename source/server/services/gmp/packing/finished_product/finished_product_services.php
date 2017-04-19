<?php

namespace fsm\services\gmp\pestControl\selfInspection;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingFinishedProductServices = fsm\createServiceDescriptorFromTemplate(
    'GMP', 'Packing', 'Daily Finished Product Check',
    'gmp-packing-finished-product', 'gmp/pracking/finished_product/',
    [
        
    ]
);

?>