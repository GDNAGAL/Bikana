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
  <link href="custom/css/whatsapp.css" rel="stylesheet">
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
        <div class="col-lg-3">
          <div class="card">
            <div class="card-body p-0" style="height:80vh">
              <div class="conversation_screen d-none" style="height:100%">
                <div class="chat">
                  <div class="chat-container">
                    <div class="user-bar">
                      <div class="back" id="backToChatList">
                        <i class="bi bi-arrow-left-short"></i>
                      </div>
                      <div class="avatar">
                        <!-- <strong>G</strong> -->
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2k2sI1nZyFTtoaKSXxeVzmAwIPchF4tjwg&usqp=CAU" alt="Avatar">
                      </div>
                      <div class="name">
                        <span>Rumbiiha s.</span>
                        <span class="status">online</span>
                      </div>
                    </div>
                    <div class="conversation">
                      <div class="conversation-container">
                        <div class="message sent">
                          What happened last night swaibu?
                          <span class="metadata">
                              <span class="time"></span><span class="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
                          </span>
                        </div>
                        <div class="message received">
                          You were drunk.
                          <span class="metadata"><span class="time"></span></span>
                        </div>
                        <div class="message sent">
                          No I wasn't.
                          <span class="metadata">
                              <span class="time"></span><span class="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
                          </span>
                        </div>
                        <div class="message received">
                          <span id="random">You were hugging an old man with a beard screaming "DUMBLEDORE YOU'RE ALIVE!"</span>
                          <span class="metadata"><span class="time"></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chatlistscreen">
                <div class="chat">
                  <div class="chat-container">
                    <div class="user-bar">
                      <div class="name w-100">
                        <span>WhatsApp</span>
                        <span class="status">Management System</span>
                      </div>
                    </div>
                    <div>
                      <div class="chatrow p-2 pb-1 d-flex border-bottom">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                          <span data-icon="default-user" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="45" height="45">
                              <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                              <g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                              </path>
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div class="ps-2" style="width:calc(100% - 49px)">
                          <div class="d-flex">
                            <span class="w-75">Qasim Pk</span>
                            <div class="w-25 text-end">
                              <span class="_3T2VG" style="color:#A4A4A4; font-size:10px">7:43 PM</span>
                            </div>
                          </div>
                          <div class="_1yct0">
                            <span class="badge rounded-pill text-bg-primary float-end">Info</span>
                          </div>
                        </div>
                      </div>
                      <div class="chatrow p-2 pb-1 d-flex border-bottom">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                          <span data-icon="default-user" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="45" height="45">
                              <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                              <g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                              </path>
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div class="ps-2" style="width:calc(100% - 49px)">
                          <div class="d-flex">
                            <span class="w-75">Qasim Pk</span>
                            <div class="w-25 text-end">
                              <span class="_3T2VG" style="color:#A4A4A4; font-size:10px">7:43 PM</span>
                            </div>
                          </div>
                          <div class="_1yct0">
                            <span class="badge rounded-pill text-bg-success float-end">Done</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
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