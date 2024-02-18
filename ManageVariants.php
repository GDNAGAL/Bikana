<?php require("inc/User.php");
  if(!userpermission("CanManageProducts")){
    header("Location: UnAuthorized");
    exit;
  }
  if($_GET['ProductID']==null || $_GET['ProductID']==""){
    header("Location: Products");
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
                <div class="row mt-2">
                  <div class="col-md-6">
                    <h5 class="card-title mb-0 mt-0 pt-0 pb-0"><span style="font-size:16px">Product Name : </span> <h4 id="Pname"></h4></h5>
                    <h5 class="card-title mb-0 pt-0 pb-0"><span style="font-size:16px">Product Category : </span> <h4 id="PCate"></h4></h5>
                  </div>
                  <div class="col-md-6">
                    <h5 class="card-title mb-0 pb-0 mt-0 pt-0"><span style="font-size:16px">Store Name : </span> <h4 id="Storename"></h4></h5>
                    <!-- <h5 class="card-title mb-0 pt-0 pb-0"><span style="font-size:16px">Pin Variant : </span> <select class="form-control shadow-none" id="PCate">
                      <option value="">1st</option>
                    </select></h5> -->
                  </div>
                </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <?php if($UserGroupID==2){ ?>
                <h5 class="card-title" id="ProductName"></h5>
              <?php } ?>
              <!-- Table with stripped rows -->
              <div class="table-responsive">
                <table class="table table-hovers text-center align-middle" width="100%">
                  <thead>
                    <tr>
                      <th scope="col">Pin Variant</th>
                      <!-- <th scope="col">Vriant Code</th> -->
                      <th scope="col">Variant Title</th>
                      <th scope="col"></th>
                      <th scope="col">MRP</th>
                      <th scope="col">Price</th>
                      <th scope="col">Available Qty.</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody id="variantTable">
                  
                  </tbody>
                </table>
                <!-- End Table with stripped rows -->
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->


    <!-- Modal -->
  <div class="modal fade hide" id="AddVariantModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg" id="mdialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Variant</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="addVariantForm" autocomplete="off">
        <div class="modal-body">
          <span id="message"></span>
          <div>
            <div class="mb-3">
              <label class="form-label" for="categorytitle">Variant Title :</label>
              <input type="text" class="form-control shadow-none" placeholder="Enter Variant Name" name="VariantTitle" required>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">Select UNIT :</label>
                  <select class="form-control shadow-none" id="varientUnitSelectBox" name="UnitID" required></select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">Available Qty. (optional) :</label>
                  <input type="number" class="form-control shadow-none" placeholder="Enter Available Quantity" name="AvailableQuantity">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">MRP :</label>
                  <input type="number" class="form-control shadow-none" id="MRPInput" placeholder="Enter MRP" name="MRP" required>
                  <li style="list-style-type: none;">
                    <input id="MRPCheckBox"  type="checkbox" checked/>
                    <label for="MRPCheckBox"  style="word-wrap:break-word">MRP and Price Are Same</label>
                  </li>
                  <!-- <input type="checkbox" class="shadow-none" id="MRPCheckBox"><label class="form-label" for="MRPCheckBox">MRP and Price Are Same</label> -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">Price :</label>
                  <input type="number" class="form-control shadow-none" id="PriceInput" placeholder="Enter Price" name="Price" required>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" id="VariantSaveButton" class="btn btn-dark float-start">Save Changes</button>
        </div>
        </form>
      </div>
    </div>
  </div>


    <!-- Modal -->
    <div class="modal fade hide" id="updateMRPModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog" id="mdialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update MRP and Price</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="updatePriceForm" autocomplete="off">
        <div class="modal-body">
          <span id="message"></span>
          <div>
            <h5 id="ptitle"></h5> 
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">MRP :</label>
                  <input type="number" class="form-control shadow-none" id="uMRPInput" placeholder="Enter MRP" name="MRP" required>
                  <input type="hidden" class="form-control shadow-none" id="variantidInput" name="VariantID" required>
                  <!-- <li style="list-style-type: none;">
                    <input id="uMRPCheckBox"  type="checkbox" checked/>
                    <label for="MRPCheckBox"  style="word-wrap:break-word">MRP and Price Are Same</label>
                  </li> -->
                  <!-- <input type="checkbox" class="shadow-none" id="MRPCheckBox"><label class="form-label" for="MRPCheckBox">MRP and Price Are Same</label> -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label" for="categorytitle">Price :</label>
                  <input type="number" class="form-control shadow-none" id="uPriceInput" placeholder="Enter Price" name="Price" required>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" id="VariantUpdateButton" class="btn btn-dark float-start">Save Changes</button>
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
  <script src="custom/js/ManageVariants.js"></script>
  <script src="custom/js/functions.js"></script>
</body>

</html>