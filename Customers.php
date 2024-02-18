<?php require("inc/User.php");?>
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


  <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.1/css/responsive.bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.3.2/css/fixedHeader.bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css">


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
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
                <h5 class="card-title">Customers
                  <li class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#AddCustomerModal">Add New Customer</li>
                </h5>
              <!-- Table with stripped rows -->
              <table class="table table-hovers text-center align-middle" id="VendorTable" width="100%">
                <thead>
                  <tr>
                    <th scope="col">CustomerID</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Whatsapp Mobile</th>
                    <th scope="col">Created Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 
                </tbody>
              </table>
              <!-- End Table with stripped rows -->

            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->


    <!-- Modal -->
    <div class="modal fade hide" id="AddCustomerModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Customer</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="addCustomerForm" autocomplete="off">
        <div class="modal-body">
        <!-- <h6 class="fw-bold">Customer Detail </h6> -->
          <span id="message"></span>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">First Name :</label>
                <input type="text" class="form-control shadow-none" placeholder="Enter First Name" name="FirstName" required>
              </div>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Last Name :</label>
                <input type="text" class="form-control shadow-none" placeholder="Enter Last Name" name="LastName" required>
              </div>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Email :</label>
                <input type="email" class="form-control shadow-none" id="vendorEmail" placeholder="Enter Email Address" name="Email" required>
              </div>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Mobile No. :</label>
                <input type="text" class="form-control shadow-none" id="vendorMobile" placeholder="Enter Mobile No." name="Mobile" required>
                <!-- <span class="ps-1" style="font-size:12px" id="mobileValidator"></span> -->
              </div>
              <h6 class="fw-bold">Address </h6>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Address Line 1 :</label>
                <input type="text" class="form-control shadow-none" placeholder="Address Line 1" name="AddressLine1" required>
              </div>
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Address Line 1 :</label>
                <input type="text" class="form-control shadow-none" placeholder="Address Line 2" name="AddressLine2" required>
              </div>
            
              <div class="mb-2">
                <label class="form-label" for="categorytitle">Select Area :</label>
                <select class="form-control shadow-none" id="AreaIDSelectBox" name="AreaID" required></select>
              </div>
        </div>
        <div class="modal-footer">
          <button type="submit" id="CustomerSaveButton" class="btn btn-dark float-start" >Save Changes</button>
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


  <script src="https://cdn.datatables.net/fixedheader/3.3.2/js/dataTables.fixedHeader.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.4.1/js/dataTables.responsive.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.4.1/js/responsive.bootstrap.min.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

  <!-- Custom JS Files -->
  <script src="custom/js/Customers.js"></script>
  <script src="custom/js/functions.js"></script>
</body>
<script>
  // $(document).ready(function() {
  //   $("#productCategoryTable").DataTable();
  // });
</script>
</html>