<?php
$UserName = "";
$UserGroupID;
$UserGroupName="";
if (isset($_COOKIE['Token'])) {
    $tokenValue = $_COOKIE['Token'];

    require('AppConfig.php');
    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => $ApiURL.'/User/UserInfo',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer '.$tokenValue
    ),
    ));

    $response = json_decode(curl_exec($curl),true);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if($httpCode == 200){
        global $UserName, $UserGroupID, $UserGroupName;
        $UserName = $response['User']['Name'];
        $UserGroupID = $response['User']['UserGroupID'];
        $UserGroupName = $response['User']['UserGroupName'];
        
        // echo $response;
        
        
        
        
        
    }else{
        header("Location: logout");
    }
    curl_close($curl);
    
} else {
    header("Location: logout");
}

function userpermission($permissionName){
    if($UserGroupID == 1){
        return true;
    }else{
        if($permissions[$permissionName]==1){
            return true;
        }else{
            return false;
        }
    }
}




?>