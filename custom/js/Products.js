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
getProductList()
getUNITList()

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
    $('#categorySelectBox').html(`<option value="">Select Category</option>`);
    $.each(jsonData.ProductCategoryList, function(i,Category){
        $('#categorySelectBox').append(`<option value="${Category.CategoryID}">${Category.CategoryName}</option>`)
    })
}

function getProductList(){
    ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/Product/getProductList',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setProductRowInTable(responseData)
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

function setProductRowInTable(jsonData){
    // let data = localStorage.getItem("ProductCategory");
    $('#productTable').DataTable().destroy();

    $('#productTable').DataTable({
        data: jsonData.ProductList,  // Get the data object
        columns: [
            { 'data': 'ProductID' },
            { 'data': 'ProductName' },
            { 'data': 'CategoryName' },
            { 'data': 'Name',
              'render': function(data, type, row, meta){
                return `<a href="javascript:void(0)">${data}</a>`;
              }
            },
            { 'data': 'Created_At' },
            { 'data': 'ProductID',
              'render': function(data, type, row, meta){
                return `<a href="ManageVariants?ProductID=${row.ProductID}"><button class="btn btn-dark btn-sm">Manage</button></a>`;
              }
            },
        ]
    });
}

$("#SearchInventoryTextBox").on("keyup",function(e){
    if(e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Enter"){

    }else{
        let SearchText = $(this).val(); 
        $.ajax({
            type: "GET",
            // data: data,
            url: ApiURL + '/Inventory/searchInventory?SearchText='+SearchText,
            headers: {
                'Authorization': 'Bearer ' + getCookie('Token')
            },
            contentType: false,       
            cache: false,             
            processData:false,
            success: function(responseData){
                InventorySuggestions(responseData.InventoryList, SearchText)
                HideLoader()
            },
            error : function(err){
                HideLoader()
                
            }
        });
    }
})


function InventorySuggestions(arr,val,e){
    resetProductInputs()
    let inputc = document.getElementById("SearchInventoryTextBox");
    var currentFocus;
    var a, b, i, inval = val;
    closeAllList();
    $("#InventoryIDTextBox").val("")
    if(val == ""){
        closeAllLists(e.target);
        return;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", inputc.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inputc.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        let productName = arr[i].InventoryID +"-"+arr[i].ProductName;
        // console.log(productName)
        if (productName.toUpperCase().includes(inval.toUpperCase())) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            const indexOfMatch = productName.toUpperCase().indexOf(inval.toUpperCase());
            b.innerHTML += productName.substring(0, indexOfMatch);
            b.innerHTML += "<strong>" + productName.substring(indexOfMatch, indexOfMatch + inval.length) + "</strong>";
            b.innerHTML += productName.substring(indexOfMatch + inval.length);
            // console.log(productName.substring(0, indexOfMatch)+ "<strong>" + productName.substring(indexOfMatch, indexOfMatch + inval.length) + "</strong>" + productName.substring(indexOfMatch + inval.length))
            
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].InventoryID + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                let selectedProductObj = arr.find(item => item.InventoryID === this.getElementsByTagName("input")[0].value);
                inputc.value = `${selectedProductObj.InventoryID}-${selectedProductObj.ProductName}`;
                fillProductDetailInputs(selectedProductObj)
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
        }
      }
    //   console.log(b)
    /*execute a function presses a key on the keyboard:*/
    inputc.addEventListener("keydown", function(e) {
        // console.log(e)
        var x = document.getElementById(this.id + "autocomplete-list");

        if (x) x = x.getElementsByTagName("div");
        if (e.key == "ArrowDown") {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.key == "ArrowUp") { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.key == "Enter") {
            $("#restForm").show()
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllList(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inputc) {
            x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inputc) {
            x[i].parentNode.removeChild(x[i]);
            }
        }
    }
}

  
function fillProductDetailInputs(productArr){
    if(productArr!=null){
        $("#ProductSaveButton").prop("disabled",false)
        $("#mdialog").addClass("modal-lg")
        $("#restForm").removeClass("d-none")

        $("#InventoryIDTextBox").val(productArr.InventoryID)
        $("#ProductNameInput").val(productArr.ProductName)
        $("#ProductDescInput").val(productArr.ProductDesc)
        $("#categorySelectBox").val(productArr.CategoryID);

        $("#VariantTitleInput").val(productArr.ProductTitle)
    }
}

function resetProductInputs(){
    $("#ProductSaveButton").prop("disabled",true)
    $("#mdialog").removeClass("modal-lg")
    $("#restForm").addClass("d-none")
    $("#InventoryIDTextBox").val('')
    $("#ProductNameInput").val('')
    $("#ProductDescInput").val('')
    $("#categorySelectBox").val('')
    
    $("#VariantTitleInput").val('')
    $("#MRPInput").val('')
    $("#PriceInput").val('')
    $("#varientUnitSelectBox").val('')
}