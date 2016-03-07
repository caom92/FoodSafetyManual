<?php

require_once "dao/config.php";

echo "host: ".\espresso\HOST."<br>";

$a = "p";
$b = "g";
$c = "perro";
$d = "gato";

$v = array($a => $c);
array_push($v, $b => $d);

foreach ($v as $x) {
    echo $x ."<br>";
}

echo $v["g"]."<br>";

?>