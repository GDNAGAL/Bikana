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


    getVendorList()
    getUserRolesList()

    $("#vendorEmail").on("blur", function(e) {
        e.preventDefault();
        $("#emailValidator").html('')
        if(ValidateEmail($(this).val())){
            let data = new FormData();
            data.append("Email",$(this).val())
            
            $.ajax({
                type: "POST",
                data: data,
                url: ApiURL + '/Vendor/verifyEmail',
                headers: {
                    'Authorization': 'Bearer ' + getCookie('Token')
                },
                contentType: false,       
                cache: false,             
                processData:false,
                success: function(responseData){
                    $("#UserSaveButton").prop("disabled",false)
                    // $("#emailValidator").html(`<span class="text-success">${responseData.Message}</span>`)
                },
                error : function(err){
                    $("#UserSaveButton").prop("disabled",true)
                    $("#emailValidator").html(`<span class="text-danger">${err.responseJSON.Message}</span>`)   
                }
            });
        }else{
            $("#UserSaveButton").prop("disabled",true)
            $("#emailValidator").html(`<span class="text-danger">Invalid Email Address.</span>`)
        }
    })

    $("#vendorMobile").on("blur", function(e) {
        e.preventDefault();
        $("#mobileValidator").html('')
        let mobile = $(this).val().trim();
        if(mobile.length==10){
            let data = new FormData();
            data.append("Mobile",mobile)
            
            $.ajax({
                type: "POST",
                data: data,
                url: ApiURL + '/Vendor/verifyMobile',
                headers: {
                    'Authorization': 'Bearer ' + getCookie('Token')
                },
                contentType: false,       
                cache: false,             
                processData:false,
                success: function(responseData){
                    $("#UserSaveButton").prop("disabled",false)
                    $("#storeusername").val(mobile)
                    $("#storepassword").val(mobile)
                    // $("#emailValidator").html(`<span class="text-success">${responseData.Message}</span>`)
                },
                error : function(err){
                    $("#UserSaveButton").prop("disabled",true)
                    $("#mobileValidator").html(`<span class="text-danger">${err.responseJSON.Message}</span>`) 
                    $("#storeusername").val("")
                    $("#storepassword").val("")  
                }
            });
        }else{
            $("#UserSaveButton").prop("disabled",true)
            $("#mobileValidator").html(`<span class="text-danger">Invalid Mobile No.</span>`)
            $("#storeusername").val("")
            $("#storepassword").val("") 
        }
    })


 $("#addVendorForm").on("submit", function(e) {
    loadingButton("#UserSaveButton", "Loading...")
    e.preventDefault();
    $("#message").html('')
    let data = new FormData(this);
    
    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Vendor/addVendor',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addVendorForm')[0].reset();
            $("#AddVendorModal").modal('hide')
            loadingButton("#UserSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getVendorList()
        },
        error : function(err){
            loadingButton("#UserSaveButton", "Save Changes")
        }
    });
  
})


function getVendorList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Vendor/getVendorList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setVendorRowInTable(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function getUserRolesList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/UserRoles/getRolesList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#userRoleSelectBox').html(`<option value="">Select User Role</option>`);
            $.each(responseData.RolesList, function(i,Roles){
                //User Role Should Not Store
                if(Roles.UserRoleID!=2){
                    $('#userRoleSelectBox').append(`<option value="${Roles.UserRoleID}">${Roles.UserGroupName}</option>`)
                }
            })
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function setVendorRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#UserTable').DataTable().destroy();

    $('#UserTable').DataTable({
        data: jsonData.VendorList,  // Get the data object
        columns: [
            { 'data': 'VendorCode' },
            { 'data': 'VendorName' },
            { 'data': 'Email' },
            { 'data': 'Mobile' },
            { 'data': 'Created_By' },
            { 'data': 'Created_At' },
            { 'data': 'VendorCode',
              'render': function(data, type, row, meta){
                return `<button class="btn btn-danger btn-sm">Delete</button>`;
              }
            },
        ]
    });
}


function ValidateEmail(email) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
      return true;
    } else {  
      return false;
    }
  
  }