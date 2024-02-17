<?php require("inc/User.php");
  if(!userpermission("CanManageUsers")){
    header("Location: UnAuthorized");
    exit;
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Dashboard</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/favicon.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">


  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <!-- Custom CSS File -->
  <link href="custom/css/style.css" rel="stylesheet">
</head>

<body>

<?php require("inc/topbar.php");?>
<?php require("inc/sidebar.php");?>
  <main id="main" class="main">

  <!-- <div class="pagetitle">
      <h1>Data Tables</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Data</li>
        </ol>
      </nav>
    </div> -->

    <section class="section">
      <div class="row">
        <div class="col-lg-4">

          <div class="card">
            <div class="card-body">
                <h5 class="card-title pb-4">User Profile</h5>
                <div class="list-group" id="UserProfile">
                  <div class="row pt-2 pb-1 border-bottom">
                    <div class="col-md-6">Name :</div>
                    <div class="col-md-6 text-end text-primary ">Gordhan</div>
                  </div>
                  <div class="row pt-2 pb-1 border-bottom">
                    <div class="col-md-6">Mobile :</div>
                    <div class="col-md-6 text-end text-primary ">91 9001881117</div>
                  </div>
                  <div class="row pt-2 pb-1 border-bottom">
                    <div class="col-md-6">Username :</div>
                    <div class="col-md-6 text-end text-primary ">GDNAGAL1536</div>
                  </div>
                  <div class="row pt-2 pb-1 border-bottom">
                    <div class="col-md-6">User Role :</div>
                    <div class="col-md-6 text-end text-primary ">Store Keeper</div>
                  </div>

                </div>
            </div>
          </div>

        </div>
        <div class="col-lg-8">

          <div class="card">
            <div class="card-body">
                <h5 class="card-title">User Permissions 
                  <li class="btn btn-success float-end d-none ms-2" id="savePermissionButton">Save Permissions</li>
                </h5>
                <div>
                <table class="table table-bordered" style="corner-radius:5px">
                  <tr>
                    <th class="text-center">Status</th>
                    <th>Permission Name</th>
                  </tr>
                  <tbody id="permissions">

                  </tbody>
                </table>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->


  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/jquery/jquery-3.7.1.js"></script>
  <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/chart.js/chart.umd.js"></script>
  <script src="assets/vendor/echarts/echarts.min.js"></script>
  <script src="assets/vendor/quill/quill.min.js"></script>
  <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="assets/vendor/tinymce/tinymce.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

  <!-- Custom JS Files -->
  <script src="custom/js/UserRoles.js"></script>
  <script src="custom/js/functions.js"></script>
</body>

</html>