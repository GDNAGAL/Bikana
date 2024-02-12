// document.write('<script type="text/javascript" src="functions.js"></script>');
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


getProductCategoryList()




  $("#addProductCategoryForm").on("submit", function(e) {
    loadingButton("#CategorySaveButton", "Loading...")
    e.preventDefault();
    $("#message").html('')
    let data = new FormData(this);
    data.append("SmallImage",null)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getCookie('Token')}`);
    const requestOptions = {
        method: 'POST',
        body: data, 
        headers: myHeaders,
        credentials: 'include',
      };

      $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/ProductCategory/addProductCategory',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addProductCategoryForm')[0].reset();
            $("#AddProductCategoryModal").modal('hide')
            loadingButton("#CategorySaveButton", "Save Changes")
            getProductCategoryList()
        },
        error : function(err){
            loadingButton("#CategorySaveButton", "Save Changes")
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
            setCategoryRowInTable(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}


function setCategoryRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#productCategoryTable').DataTable().destroy();

    $('#productCategoryTable').DataTable({
        data: jsonData.ProductCategoryList,  // Get the data object
        columns: [
            { 'data': 'CategoryID' },
            {
                'data': 'SmallImage',
                'render': function (data, type, row, meta) {
                    let path;
                    if(data == null){
                        path = "custom/img/noimage.jpg";
                    }else{
                        path = data;
                    }
                    return `<img src="${path}" width="35px"/>`;
                }
            },
            { 'data': 'CategoryName' },
            { 'data': 'Created_By' },
            { 'data': 'Created_At' },
            { 'data': 'CategoryID',
              'render': function(data, type, row, meta){
                return `<button class="btn btn-danger btn-sm">Delete</button>`;
              }
            },
        ]
    });
}