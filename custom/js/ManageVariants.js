let ApiURL = $("#ApiURL").val();
let searchParamsURL = new URLSearchParams(window.location.search);
let ProductID = searchParamsURL.get('ProductID');
let pinV;
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
getProductList()
getUNITList()

$("#addVariantForm").on("submit", function(e) {
    e.preventDefault();
    loadingButton("#VariantSaveButton", "Saving...")
    $("#message").html('')
    let data = new FormData(this);
    data.append("ProductID",ProductID)

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Product/addVariant',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#addVariantForm')[0].reset();
            $("#AddVariantModal").modal('hide')
            loadingButton("#VariantSaveButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getProductList()
        },
        error : function(err){
            loadingButton("#VariantSaveButton", "Save Changes")
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})



function getProductList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Product/getProductList?ProductID='+ProductID,
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            if(responseData.ProductList.length>0){
                pinV = responseData.ProductList[0].PinVariant;
                $("#Pname").html(responseData.ProductList[0].ProductName)
                $("#PCate").html(responseData.ProductList[0].CategoryName)
                $("#Storename").html(responseData.ProductList[0].Name)
                $("#ProductName").html(responseData.ProductList[0].ProductName + " Variant " + `<li class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#AddVariantModal">Add New Variant</li>`)
                getVariantList()
            }else{
                window.location = "Products";
            }
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function getVariantList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Product/getVariantList?ProductID='+ProductID,
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setVariantInTable(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function getUNITList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Product/getUNITList.php',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#varientUnitSelectBox').html(`<option value="">Select UNIT</option>`);
            $.each(responseData.UNITList, function(i,Unit){
                $('#varientUnitSelectBox').append(`<option value="${Unit.UNITID}">${Unit.UnitText}</option>`)
            })
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

$("#MRPCheckBox").on("change",function(){
    if($(this).prop('checked') == true){
        $("#PriceInput").val($("#MRPInput").val())
    }else{
        $("#PriceInput").val("")
    }
})

$("#MRPInput").on("keyup",function(){
    if($("#MRPCheckBox").prop('checked') == true){
        $("#PriceInput").val($("#MRPInput").val())
    }
})

function setVariantInTable(jsonData){
    let pinned;
    $('#variantTable').html("")
    $.each(jsonData.VariantList, function(i,Variant){
        let pinned = (pinV == Variant.ID)? "checked" : "";

        $('#variantTable').append(`<tr>
        <td><input type="radio" id="pinvariantCheckbox" name="PinVariant" value="${Variant.ID}" ${pinned}/></td>
        <td>${Variant.ID}</td>
        <td>${Variant.VariantTitle}</td>
        <td>${Variant.MRP}</td>
        <td>${Variant.Price}</td>
        <td>${Variant.AvailableQuantity==null?"" : Variant.AvailableQuantity}</td>
        <td><button class="btn btn-dark btn-sm">EDIT</button></td>
        </tr>`)
    })
}