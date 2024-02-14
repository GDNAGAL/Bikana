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
getUserRolesList()

$("#addProductForm").on("submit", function(e) {
    e.preventDefault();
    loadingButton("#ProductSaveButton", "Saving...")
    $("#message").html('')
    let data = new FormData(this);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Product/addProduct',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addProductForm')[0].reset();
            $("#AddProductModal").modal('hide')
            loadingButton("#ProductSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getProductList()
        },
        error : function(err){
            loadingButton("#ProductSaveButton", "Save Changes")
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})


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
            $('#roles').html('');
            $.each(responseData.RolesList, function(i,Roles){
                if(i==0){
                    $('#roles').append(`<a href="javascript:void(0)" id="roleli" class="list-group-item list-group-item-action active roleli" roleid="${Roles.UserRoleID}">${Roles.UserGroupName}</a>`)
                }else{
                    $('#roles').append(`<a href="javascript:void(0)" id="roleli" class="list-group-item list-group-item-action roleli" roleid="${Roles.UserRoleID}">${Roles.UserGroupName}</a>`)
                }
            })
            getPermissionList(responseData.RolesList[0].UserRoleID)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}


function getPermissionList(roleid){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/UserRoles/getPermissionList?roleid='+ roleid,
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#permissions').html('');
            if(responseData.PermissionList[0].isAdministrator){
                $("#savePermissionButton").addClass("d-none")
                $('#permissions').append(`<tr><td colspan="2">Can Not Change Permissions for Administrator.</td></tr>`)
            }else{
                $("#savePermissionButton").removeClass("d-none")
                $.each(responseData.PermissionList, function(i,Permission){
                    if(Permission.isAllowed){
                        $('#permissions').append(`<tr><td class="text-center"><input class="form-check-input shadow-none" type="checkbox" checked/></td><td>${Permission.PermissionText}</td></tr>`)
                    }else{
                        $('#permissions').append(`<tr><td class="text-center"><input class="form-check-input shadow-none" type="checkbox"/></td><td>${Permission.PermissionText}</td></tr>`)
                    }
                })
            }
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

$(document).on("click","#roleli",function(){
    let roleid = $(this).attr("roleid")
    $(".roleli").removeClass("active");
    $(this).addClass("active");
    getPermissionList(roleid)
    
})
