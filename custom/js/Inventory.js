let ApiURL = $("#ApiURL").val();

function HideLoader(){
    $(".backdrop").hide()
}

function ShowLoader(){
    $(".backdrop").show()
}

function loadingButton(id, text){
    if($(id).attr('disabled')){
        $(id).attr('disabled',false)
        $(id).html(text)
    }else{
        $(id).attr('disabled',true)
        $(id).html(text)
    }
}

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let indexOfEquals = el.indexOf('=');
        if (indexOfEquals !== -1) {
            let key = el.substring(0, indexOfEquals).trim();
            let value = el.substring(indexOfEquals + 1).trim();
            cookie[key] = value;
        }
    });
    return cookie[cookieName];
  }








//Call Starting Functions
getProductCategoryList()
getInventoryList()

$("#addInventoryForm").on("submit", function(e) {
    loadingButton("#InventorySaveButton", "Saving...")
    e.preventDefault();
    $("#message").html('')
    let data = new FormData(this);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Inventory/addInventory',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addInventoryForm')[0].reset();
            $("#AddInventoryModal").modal('hide')
            loadingButton("#InventorySaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: "Added Successfully",
                icon: "success",
            });
            getInventoryList()
        },
        error : function(err){
            loadingButton("#InventorySaveButton", "Save Changes")
        }
    });
})


function getProductCategoryList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/ProductCategory/getProductCategoryList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setCategoryInSelectBox(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}


function setCategoryInSelectBox(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#categorySelectBox').html(`<option value="" selected disabled>Select Category</option>`);
    $.each(jsonData.ProductCategoryList, function(i,Category){
        $('#categorySelectBox').append(`<option value="${Category.CategoryID}">${Category.CategoryName}</option>`)
    })
}

function getInventoryList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Inventory/getInventoryList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setInventoryRowInTable(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function setInventoryRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#inventoryTable').DataTable().destroy();

    $('#inventoryTable').DataTable({
        data: jsonData.InventoryList,  // Get the data object
        columns: [
            { 'data': 'InventoryID' },
            { 'data': 'ProductName' },
            { 'data': 'CategoryName',
              'render': function(data, type, row, meta){
                return `<a href="ViewCategory?CategoryID=${row.CategoryID}">${data}</a>`;
              } },
            { 'data': 'Created_By',
              'render': function(data, type, row, meta){
                return `<a href="javascript:void(0)">${data}</a>`;
              }
            },
            { 'data': 'Created_At' },
            { 'data': 'CategoryID',
              'render': function(data, type, row, meta){
                return `<button class="btn btn-danger btn-sm">Delete</button>`;
              }
            },
        ]
    });
}