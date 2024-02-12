<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dist/css/style.css"></head>
    <link rel="stylesheet" href="custom/css/style.css">
    <script defer="defer" src="dist/js/main.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
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
                        <tbody id="productCategoryTableBody">
                          <!-- <tr>
                            <td>PC001</td>
                            <td> <img src="" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>PC001</td>
                            <td> <img src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/10/31/Photos/Processed/fruits-kFLF--621x414@LiveMint.jpg" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                          <tr>
                            <td>PC001</td>
                            <td> <img src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/10/31/Photos/Processed/fruits-kFLF--621x414@LiveMint.jpg" width="50px" height="50px" alt="" srcset=""></td>
                            <td>Fruits</td>
                            <td>Edinburgh jksdgjk kjsdhgbjkbsd gkjbsjkdgb ijsbjdkgb ijsdbgk ksdgibkjs gijsbdgkj kjsbdg</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr> -->

                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <form id="addProductCategoryForms" action="your-action-url" method="post">
    <!-- form content here -->
    <input type="submit" value="Submit">
</form>
        <?php require("inc/footer.php");?>
      </div>
    </div>
  </body>


  <!-- Modal -->
  <div class="modal fade hide" id="AddProductCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Product Category</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" id="addProductCategoryForm" autocomplete="off">
        <div class="modal-body">
          <span id="message"></span>
            <div class="mb-3">
              <label class="form-label" for="categorytitle">Category Title :</label>
              <input type="text" class="form-control" id="categorytitle" placeholder="Enter Product Category Title" name="CategoryName" required>
            </div>
            <div class="mb-3">
              <label class="form-label" for="CategoryDescription">Category Description :</label>
              <textarea type="text" class="form-control" id="CategoryDescription" rows="4" placeholder="Enter Description" name="CategoryDesc" required></textarea>
            </div>
            <!-- <div class="mb-3">
              <label class="form-label" for="categoryIcon">Category Small Image :</label>
              <input type="file" class="form-control" id="categoryIcon" name="SmallImage" required>
            </div> -->
          
          <!-- <img id="CategoryIconPreview" width="100px" height="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUUZHBKzPyHHgcB_-1Rb5-oCUKWxC-vNFVw&usqp=CAU" alt="your image" /> -->
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-grayy float-start">Save Changes</button>
        </div>
        </form>
      </div>
    </div>
  </div>




    <!-- <script defer="defer" src="dist/js/jquery-3.7.1.js"></script> -->
    <script defer="defer" src="custom/js/functions.js"></script>
    <script defer="defer" src="custom/js/ProductCategory.js"></script>
    <script defer="defer" src="custom/js/test.js"></script>
</html>
