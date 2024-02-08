<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dist/css/style.css"></head>
    <link rel="stylesheet" href="custom/css/style.css">
    <script defer="defer" src="dist/js/main.js"></script>
  <body class="app">
    <?php require("inc/User.php");?>
    <?php require("inc/sidebar.php");?>
    <div>
      <!-- #Main ============================ -->
      <div class="page-container">
      <?php require("inc/topbar.php");?>
        <!-- ### $App Screen Content ### -->
        <main class="main-content bgc-grey-100">
          <div id="mainContent">
          <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <div class="bgc-white bd bdrs-3 p-20 mB-20">
                    <h4 class="c-grey-900 mB-10 d-inline">Product Inventory</h4>
                    <button class="btn btn-grayy float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Inventory</button>
                    <table id="dataTable" class="table table-hover mT-20 align-middle text-center" cellspacing="0" width="100%">
                        <thead>
                          <tr>
                            <th>Category ID</th>
                            <th></th>
                            <th>Category Title</th>
                            <th>Category Description</th>
                            <th>Category Created Date</th>
                            <th>Category Created By</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>PC001</td>
                            <td> <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>PC001</td>
                            <td> <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>PC001</td>
                            <td> <img src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>

                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <?php require("inc/footer.php");?>
      </div>
    </div>
  </body>


  <!-- Modal -->
  <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>



    <script defer="defer" src="dist/js/jquery-3.7.1.js"></script>
    <script defer="defer" src="custom/js/functions.js"></script>
    <script defer="defer" src="custom/js/Products.js"></script>
</html>
