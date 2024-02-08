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
                    <h4 class="c-grey-900 mB-10 d-inline">Product Category</h4>
                    <button class="btn btn-grayy float-end" data-bs-toggle="modal" data-bs-target="#AddProductCategoryModal">Add New Product Category</button>
                    <table id="" class="table table-hover mT-20 align-middle text-center" cellspacing="0" width="100%">
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
  <div class="modal fade hide" id="AddProductCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="inputAddress">Search Product</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="Search Product">
          </div>
          <form class="d-none">
            <div class="row">
              <div class="mb-3 col-md-6">
                <label class="form-label" for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
              </div>
              <div class="mb-3 col-md-6">
                <label class="form-label" for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label" for="inputAddress2">Address 2</label>
              <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label class="form-label" for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity">
              </div>
              <div class="mb-3 col-md-4">
                <label class="form-label" for="inputState">State</label>
                <select id="inputState" class="form-control">
                  <option selected="selected">Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="mb-3 col-md-2">
                <label class="form-label" for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 col-md-6">
                <label class="form-label fw-500">Birthdate</label>
                <div class="timepicker-input input-icon mb-3">
                  <div class="input-group">
                    <div class="input-group-text bgc-white bd bdwR-0">
                      <i class="ti-calendar"></i>
                    </div>
                    <input type="text" class="form-control bdc-grey-200 start-date" placeholder="Datepicker" data-provide="datepicker">
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                <input type="checkbox" id="inputCall2" name="inputCheckboxesCall" class="peer">
                <label for="inputCall2" class="form-label peers peer-greed js-sb ai-c">
                  <span class="peer peer-greed">Call John for Dinner</span>
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-color">Sign in</button>
          </form>
        </div>
        <div class="modal-header">
          <button type="button" class="btn btn-grayy">Save Changes</button>
        </div>
      </div>
    </div>
  </div>



    <script defer="defer" src="dist/js/jquery-3.7.1.js"></script>
    <script defer="defer" src="custom/js/functions.js"></script>
    <script defer="defer" src="custom/js/Products.js"></script>
</html>
