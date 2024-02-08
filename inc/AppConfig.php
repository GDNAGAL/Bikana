<?php
$AppMode = "TEST";   // TEST PRODUCTION
if($AppMode == "TEST"){

    $AppURL = "http://localhost:3000/Grocery";
    $ApiURL = "http://localhost:3000/GroceryAPIs";

}elseif($AppMode == "PRODUCTION"){

    $AppURL = "";
    $ApiURL = "";

}



?>