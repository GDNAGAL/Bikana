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
  <style>
    td{
      padding:0 !important;
    }
    .invoice-input{
      width:100%;
      outline:none;
      border:none;
      padding-left:5px;
      text-align:center;
      background:transparent;
    }
    .cus-input{
      background:#EAB1B1 !important;
      margin-bottom:2px;
    }
    .ctable ,th, td{
      border:none;
    }
  </style>
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
              <h3 class="card-title pb-0">Genrate Order</h3>
              <div class="row">
                <div class="col-md-3 mb-1">
                  <div class="autocomplete">
                    <!-- <label for="validationCustom01">Enter Mobile No.</label> -->
                    <input type="number" autocomplete="nope" class="text-uppercase form-control form-control-sm shadow-none" id="CustomerMobileInput" placeholder="Enter Mobile No" name="SearchCustomer" required>
                    <input type="hidden" class="form-control shadow-none" id="CustomerID"  name="InventoryID" required>
                  </div>
                </div>
                <div class="col-md-3 mb-1"></div>
                <div class="col-md-3 mb-1"></div>
                <div class="col-md-3 mb-1">
                  <!-- <label for="validationCustom01">Order Date</label> -->
                  <input type="date" autocomplete="nope" class="text-uppercase form-control form-control-sm shadow-none" value="2024-02-19" disabled required>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-6 mb-1">
                      <!-- <label for="validationCustom01">Customer Name</label> -->
                      <input type="text" autocomplete="nope" id="CustomerNameInput" class="text-uppercase form-control form-control-sm shadow-none" placeholder="Enter Customer Name" required>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-1">
                      <!-- <label for="validationCustom01">Address</label> -->
                      <input type="text" autocomplete="nope" id="AddressInput" class="text-uppercase form-control form-control-sm shadow-none" placeholder="Enter Address" required>
                    </div>
                    <div class="col-md-4 mb-1">
                      <!-- <label for="validationCustom01">Select Colony</label> -->
                      <select id="ColonySelectBox" class="text-uppercase form-control form-control-sm shadow-none" autocomplete="off" required></select>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="text-end">
                    <strong>Total Amount : </strong> <div class="d-inline-block bg-black p-2 fw-bold" style="color:yellow">200.00</div>
                  </div>
                </div>
              </div>             
            </div>
          </div>
          <div class="card">
            <!-- <div class="card-body">
                <h5 class="card-title">Customers</h5>
            </div> -->
            <div class="table-responsive">
              <table class="table table-striped text-center table-bordered mb-0" style="border-collapse: separate; !important">
              <thead>
                <tr>
                  <th class="bg-danger text-white" style="width:10%">P Code</th>
                  <th class="bg-danger text-white" style="width:40%">Product Description</th>
                  <th class="bg-danger text-white" style="width:10%">QTY</th>
                  <th class="bg-danger text-white" style="width:10%">UOM</th>
                  <th class="bg-danger text-white" style="width:10%">Rate</th>
                  <th class="bg-danger text-white" style="width:10%">Total</th>
                  <th class="bg-danger text-white" style="width:10%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input text-start" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td></td>
                </tr>
                <tr>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input text-start" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td></td>
                </tr>
                <tr>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input text-start" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td><input class="invoice-input" type="text"></td>
                  <td></td>
                </tr>
              </tbody>
              </table>
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


  <script src="https://cdn.datatables.net/fixedheader/3.3.2/js/dataTables.fixedHeader.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.4.1/js/dataTables.responsive.min.js"></script>
  <script src="https://cdn.datatables.net/responsive/2.4.1/js/responsive.bootstrap.min.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

  <!-- Custom JS Files -->
  <script src="custom/js/AddOrder.js"></script>
  <script src="custom/js/functions.js"></script>
</body>
<script>
  // $(document).ready(function() {
  //   $("#productCategoryTable").DataTable();
  // });
</script>
</html>