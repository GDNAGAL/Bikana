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


    getUserList()
    getUserRolesList()

    $("#userEmail").on("blur", function(e) {
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

    $("#userMobile").on("blur", function(e) {
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
                    // $("#emailValidator").html(`<span class="text-success">${responseData.Message}</span>`)
                },
                error : function(err){
                    $("#UsersaveButton").prop("disabled",true)
                    $("#mobileValidator").html(`<span class="text-danger">${err.responseJSON.Message}</span>`) 
                }
            });
        }else{
            $("#UserSaveButton").prop("disabled",true)
            $("#mobileValidator").html(`<span class="text-danger">Invalid Mobile No.</span>`)
        }
    })


 $("#addUserForm").on("submit", function(e) {
    loadingButton("#UserSaveButton", "Loading...")
    e.preventDefault();
    $("#message").html('')
    let data = new FormData(this);
    
    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/User/addUser',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addUserForm')[0].reset();
            $("#AddUserModal").modal('hide')
            loadingButton("#UserSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getUserList()
        },
        error : function(err){
            loadingButton("#UserSaveButton", "Save Changes")
        }
    });
  
})


function getUserList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/User/getUserList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setUserRowInTable(responseData)
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

function setUserRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#UserTable').DataTable().destroy();

    $('#UserTable').DataTable({
        data: jsonData.UserList,  // Get the data object
        columns: [
            { 'data': 'ID' },
            { 'data': 'Name' },
            { 'data': 'Mobile' },
            { 'data': 'UserGroupName' },
            { 'data': 'ID',
              'render': function(data, type, row, meta){
                return `<a href="UserView?UserID=${row.ID}"><button class="btn btn-dark btn-sm">View</button></a>`;
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