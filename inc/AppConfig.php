<?php
$AppMode = "LOCAL";   // TEST PRODUCTION LOCAL
if($AppMode == "LOCAL"){

    $AppURL = "http://localhost:3000/Grocery";
    $ApiURL = "http://localhost:3000/GroceryAPIs";

}elseif($AppMode == "TEST"){

    $AppURL = "";
    $ApiURL = "http://groceryapi.royalplay.live";

}elseif($AppMode == "PRODUCTION"){

    $AppURL = "";
    $ApiURL = "http://groceryapi.royalplay.live";

}



?>