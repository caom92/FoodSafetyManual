<?php
    require_once "header.php";
    
    $f3 = require(\espresso\F3."base.php");
    $f3->route("GET /",
        function()
        {
            require_once "test.php";
        }
     );
     $f3->run();
    
    require_once "footer.php";
?>