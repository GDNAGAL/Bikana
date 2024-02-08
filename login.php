<?php
    require("inc/AppConfig.php");
    if (isset($_COOKIE['Token'])) {
        header("Location: index");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <title>Sign In</title>
        <link rel="stylesheet" href="dist/css/style.css"></head>
        <link rel="stylesheet" href="custom/css/style.css">
        <script defer="defer" src="dist/js/main.js"></script>
    </head>
    <body class="app">
        <div id="loader">
            <div class="spinner"></div>
        </div>
        <div class="peers ai-s fxw-nw h-100vh">
        <div class="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" style='background-image: url("dist/img/bg.jpgd")'>
            <div class="pos-a centerXY">
            <div class="bgc-white bdrs-50p pos-r" style="width: 120px; height: 120px;">
                <img class="pos-a centerXY" src="dist/img/logo.png" alt="">
            </div>
            </div>
        </div>
        <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style="min-width: 320px;">
            <h3 class="fw-300 c-grey-900 mB-40">Login</h3>
            <span id="message"></span>
            <form autocomplete="off" id="loginForm">
            <!-- <input autocomplete="false" name="hidden" type="text" style="display:none;"> -->
            <div class="mb-3">
                <label class="text-normal text-dark form-label">Username</label>
                <input type="text" class="form-control" placeholder="ENTER USERNAME" name="Username">
            </div>
            <div class="mb-3">
                <label class="text-normal text-dark form-label">Password</label>
                <input type="password" class="form-control" autocomplete="off" placeholder="ENTER PASSWORD" name="Password">
            </div>
            <div class="">
                <div class="peers ai-c jc-sb fxw-nw">
                <div class="peer">
                    <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                    <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" class="peer">
                    <label for="inputCall1" class="peers peer-greed js-sb ai-c form-label">
                        <span class="peer peer-greed">Remember Me</span>
                    </label>
                    </div>
                </div>
                <div class="peer">
                    <button type="submit" class="btn btn-primary btn-color">Login</button>
                </div>
                </div>
            </div>
            </form>
        </div>
        <input id="ApiURL" type="hidden" value="<?php echo $ApiURL;?>"/>
        </div>
    </body>
    <script defer="defer" src="dist/js/jquery-3.7.1.js"></script>
    <script defer="defer" src="custom/js/functions.js"></script>
    <script defer="defer" src="custom/js/login.js"></script>

</html>
