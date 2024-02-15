<?php require("inc/User.php");
  if(!userpermission("CanManageUserRoles")){
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
                <h5 class="card-title border-bottom pb-4">User Roles 
                  <li class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#AddUserRoleModal">Add New User Role</li>
                </h5>
                <div class="list-group" id="roles"></div>
            </div>
          </div>

        </div>
        <div class="col-lg-8">

          <div class="card">
            <div class="card-body">
                <h5 class="card-title">User Role Permissions 
                  <li class="btn btn-success float-end d-none ms-2" id="savePermissionButton">Save Permissions</li>
                  <li class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#addNewPermissionModal" id="addNewPermission">Add New Permissions</li>
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


    <!-- Modal -->
    <div class="modal fade hide" id="AddUserRoleModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog" id="mdialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User Roles</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="addUserRoleForm" autocomplete="off">
        <div class="modal-body">
          <span id="message"></span>
          <div class="row">
            <div class="" id="sdiv">
              <div class="mb-3 autocomplete">
                <label class="form-label" for="categorytitle">User Role Name :</label>
                <input type="text" class="form-control shadow-none" id="SearchInventoryTextBox" placeholder="Enter User Role Name" name="UserRoleName" required>
              </div>
            </div>
            <!-- <div class="col-md-6"></div> -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" id="UserRolesaveButton" class="btn btn-dark float-start">Save Changes</button>
        </div>
        </form>
      </div>
    </div>
  </div>

     <!-- Modal -->
    <div class="modal fade hide" id="addNewPermissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog" id="mdialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Permission</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="addPermissionForm" autocomplete="off">
        <div class="modal-body">
          <span id="message"></span>
          <div class="row">
              <div class="mb-3 autocomplete">
                <label class="form-label" for="categorytitle">Permission Key <span style="font-size:12px">(Without Space)</span> :</label>
                <input type="text" class="form-control shadow-none" id="permissionKeyInput" placeholder="Permission Key Name Without Space" name="PermissionKey" required>
              </div>
              <div class="mb-3 autocomplete">
                <label class="form-label" for="categorytitle">Permission Description :</label>
                <input type="text" class="form-control shadow-none" placeholder="Enter User Role Name" name="PermissionText" required>
              </div>
            <!-- <div class="col-md-6"></div> -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" id="addPermissionSaveButton" class="btn btn-dark float-start">Save Changes</button>
        </div>
        </form>
      </div>
    </div>
  </div>

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