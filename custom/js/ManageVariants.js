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
// getUNITList()

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
            getVariantList()
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
            getUNITList()
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
    const currentDateTime = new Date();
    const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
    const targetTimeInMinutes = 11 * 60;

    
    let pinned;
    $('#variantTable').html("")
    $.each(jsonData.VariantList, function(i,Variant){
        let sign;
        const lastModifiedHoures = Math.floor((currentDateTime - (new Date(Variant.Modified_At))) / (1000 * 60 * 60))
        if (currentMinutes > targetTimeInMinutes) {
            if(lastModifiedHoures>20 || isNaN(lastModifiedHoures)){
               sign = `<i class="bi bi-record-btn text-danger"></i>`;
            }else{
                sign = `<i class="bi bi-record-btn text-success"></i>`;
            }
        }

        let pinned = (pinV == Variant.ID)? "checked" : "";

        $('#variantTable').append(`<tr>
        <td><input type="radio" id="pinvariantCheckbox" name="PinVariant" value="${Variant.ID}" ${pinned}/></td>
        <td>${Variant.VariantTitle}</td>
        <td>${sign}</td>
        <td>₹ ${Variant.MRP}/${Variant.UnitText} <a href="javascript:void(0)" variantidInput="${Variant.ID}" mrp="${Variant.MRP}" price="${Variant.Price}" ptitle="${Variant.VariantTitle}" id="updateMRP"><i class="bi bi-pencil-square"></i></a></td>
        <td>₹ ${Variant.Price}/${Variant.UnitText}</td>
        <td>${Variant.AvailableQuantity==null?"" : Variant.AvailableQuantity +" "+ Variant.UnitText}</td>
        <td><button class="btn btn-dark btn-sm">EDIT</button></td>
        </tr>`)
    })
}

$(document).on("change","#pinvariantCheckbox",function(e){
    ShowLoader()
    e.preventDefault();
    let data = new FormData();
    data.append("VariantID",this.value)
    data.append("ProductID",ProductID)

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Product/pinVariant',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            ShowLoader()
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getProductList()
        },
        error : function(err){
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})

$(document).on("click","#updateMRP",function(){
    $("#updateMRPModal").modal("show");
    
    $("#uMRPInput").val($(this).attr("mrp"))
    $("#uPriceInput").val($(this).attr("price"))
    $("#ptitle").html($(this).attr("ptitle"))
    $("#variantidInput").val($(this).attr("variantidinput"))
})

$("#updatePriceForm").on("submit", function(e) {
    e.preventDefault();
    loadingButton("#VariantUpdateButton", "Saving...")
    $("#message").html('')
    let data = new FormData(this);
    data.append("ProductID",ProductID)

    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Product/updateVariantPrice',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#updatePriceForm')[0].reset();
            $("#updateMRPModal").modal('hide')
            loadingButton("#VariantUpdateButton", "Save Changes")
            Swal.fire({
                title: "Success",
                text: responseData.Message,
                icon: "success",
            });
            getVariantList()
        },
        error : function(err){
            loadingButton("#VariantUpdateButton", "Save Changes")
            Swal.fire({
                title: "Failed",
                text: err.responseJSON.Message,
                icon: "error",
            });
        }
    });
})