<?php

// This script straightforwardly closes the current session
session_start();
session_unset();
session_destroy();
echo "good bye";

?>