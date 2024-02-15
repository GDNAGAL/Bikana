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

let roleid;





//Call Starting Functions
getUserRolesList()

$("#addUserRoleForm").on("submit", function(e) {
    e.preventDefault();
    loadingButton("#UserRolesaveButton", "Saving...")
    $("#message").html('')
    let data = new FormData(this);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/UserRoles/addRole',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addUserRoleForm')[0].reset();
            $("#AddUserRoleModal").modal('hide')
            loadingButton("#UserRolesaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getUserRolesList()
        },
        error : function(err){
            loadingButton("#UserRolesaveButton", "Save Changes")
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})

$("#addPermissionForm").on("submit", function(e) {
    e.preventDefault();
    loadingButton("#addPermissionSaveButton", "Saving...")
    $("#message").html('')
    let data = new FormData(this);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/UserRoles/addPermission',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addPermissionForm')[0].reset();
            $("#addNewPermissionModal").modal('hide')
            loadingButton("#addPermissionSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getUserRolesList()
        },
        error : function(err){
            $('#addPermissionForm')[0].reset();
            loadingButton("#addPermissionSaveButton", "Save Changes")
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
            let activeRole = roleid;
            let acrol;
            $.each(responseData.RolesList, function(i, Roles) {
                const isActive = activeRole !== undefined ? i == activeRole : i == 0;
                const roleClass = isActive ? 'active ' : '';
                if(isActive){
                    acrol = Roles.UserRoleID
                }
                $('#roles').append(`
                    <a href="javascript:void(0)" id="roleli" class="list-group-item list-group-item-action ${roleClass}roleli" roleid="${Roles.UserRoleID}">
                        ${Roles.UserGroupName}
                    </a>
                `);
            });
            
            getPermissionList((acrol !== undefined) ? acrol : responseData.RolesList[0].UserRoleID)
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
                        $('#permissions').append(`<tr><td class="text-center"><input id="permissionCheckBox" class="form-check-input shadow-none" type="checkbox" pkey="${Permission.PermissionID}" ugid="${roleid}" checked/></td><td>${Permission.PermissionText}</td></tr>`)
                    }else{
                        $('#permissions').append(`<tr><td class="text-center"><input id="permissionCheckBox" class="form-check-input shadow-none" type="checkbox" pkey="${Permission.PermissionID}" ugid="${roleid}" /></td><td>${Permission.PermissionText}</td></tr>`)
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
    let rolewid = $(this).attr("roleid")
    roleid = $(".roleli").index(this);
    $(".roleli").removeClass("active");
    $(this).addClass("active");
    getPermissionList(rolewid)
    
})

$("#savePermissionButton").on("click",function(){
    let permissionArr = [];
    $('#permissionCheckBox:checked').each(function () {
        permissionArr.push($(this).attr('pkey'))
    });

    let data = new FormData(this);
    data.append("Permission",permissionArr);
    data.append("UserGroupID",roleid);

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/UserRoles/updatePermission',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getUserRolesList()
        },
        error : function(err){
            loadingButton("#addPermissionSaveButton", "Save Changes")
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})
