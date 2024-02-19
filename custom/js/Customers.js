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


getCustomersList()

$("#addCustomerForm").on("submit", function(e) {
    loadingButton("#CustomerSaveButton", "Loading...")
    e.preventDefault();
    $("#message").html('')
    let data = new FormData(this);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Customer/addCustomer',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addCustomerForm')[0].reset();
            $("#AddCustomerModal").modal('hide')
            loadingButton("#CustomerSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getCustomersList()
        },
        error : function(err){
            loadingButton("#CustomerSaveButton", "Save Changes")
        }
    });
})


function getCustomersList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Customer/getCustomerList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setCustomerRowInTable(responseData)
            getAreaList()
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}


function setCustomerRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#VendorTable').DataTable().destroy();

    $('#VendorTable').DataTable({
        data: jsonData.CustomerList,  // Get the data object
        responsive: true,
        columns: [
            { 'data': 'ID' },
            { 'data': 'FirstName',
              'render' : function(data, type, row, meta){
                return `${row.FirstName} ${row.LastName}`;
              } 
            },
            { 'data': 'Email' },
            { 'data': 'Mobile' },
            { 'data': 'WhatsappMobile' },
            { 'data': 'Created_At' },
            { 'data': 'ID',
              'render': function(data, type, row, meta){
                return `<button class="btn btn-danger btn-sm">Delete</button>`;
              }
            },
        ]
    });
}

function getAreaList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Address/getAreaList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#AreaIDSelectBox').html(`<option value="">Select Colony</option>`);
            $.each(responseData.AreaList, function(i,Area){
                $('#AreaIDSelectBox').append(`<option value="${Area.ID}">${Area.AreaText}</option>`)
            })
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}