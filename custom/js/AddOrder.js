let ApiURL = $("#ApiURL").val();
$("body").addClass("toggle-sidebar")
let checkForUpdate;
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
getAreaList()
getProductList()
getUNITList()

//Call All Function on Start
getAllConversations()





let newRow = `<tr>
            <td><input class="invoice-input" type="number" id="searchProductID"></td>
            <td><input class="invoice-input text-start" type="text" id="pdescription"></td>
            <td><input class="invoice-input" type="number" id="qtyinput"></td>
            <td><input class="invoice-input" type="text" id="UOMinput" readonly></td>
            <td><input class="invoice-input" type="number" id="RateInput"></td>
            <td><input class="invoice-input" type="number" id="totalInput"></td>
          </tr>`;



function getAllConversations(){
    // ShowLoader()
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/WhatsApp/getConversations',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setConversationsInRows(responseData)
            checkForUpdate = setInterval(checkForNewMessages, 5000);
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function setConversationsInRows(jsonData){
    if(jsonData.ConversationList!=null){
        $('#AllChatList').html("");
    }
    $.each(jsonData.ConversationList, function(i,Chat){
        let Chatlabel = "";
        if(Chat.Label != null){
            Chatlabel = `<span class="badge rounded-pill ${Chat.Label_B_Class} float-end">${Chat.Label}</span>`;
        }
        if(Chat.Label == "Order Confirmed"){
            $('#AllChatList').append(`
                <div class="chatrow p-2 pb-1 d-flex border-bottom" wa_id="${Chat.wa_id}" profile_name="${Chat.profile_Name}">
                    <div class="_1WliW" style="height: 49px; width: 49px;">
                        <span data-icon="default-user" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="45" height="45">
                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                            <g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                            </path>
                            </g>
                        </svg>
                        </span>
                    </div>
                    <div class="ps-2" style="width:calc(100% - 49px)">
                        <div class="d-flex">
                        <span class="w-75">${Chat.wa_id}</span>
                        <div class="w-25 text-end">
                            <span class="_3T2VG" style="color:#A4A4A4; font-size:10px">${formateLastMessageTime(Chat.Modified_At)}</span>
                        </div>
                        </div>
                        <div class="_1yct0">
                        ${((Chat.UnReadMessageCount)>0) ? `<span class="badge rounded-pill bg-danger float-end ms-2">${Chat.UnReadMessageCount}</span>`:''}
                        ${Chatlabel}
                        </div>
                    </div>
                </div>
            `)
        }
    })
}

function formateLastMessageTime(messagedate){
    const inputDateTimeString = messagedate;
    const inputDateTime = new Date(inputDateTimeString);
    let today = new Date();
    // Get hours and minutes
    const mdate = inputDateTime.getDate();
    const month = inputDateTime.getMonth();
    const year = inputDateTime.getFullYear();
    const hours = inputDateTime.getHours();
    const minutes = inputDateTime.getMinutes();
    
    if(mdate == today.getDate()){
        // Convert to 12-hour format
        const formattedHours = hours % 12 || 12;
        
        // Determine AM/PM
        const ampm = hours < 12 ? "AM" : "PM";
        
        // Display the result
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return formattedTime;
    }else{
        return(`${formateint(mdate)}/${formateint(month)}/${year}`)
    }
    
}

function formateint(data){
    if(data<10){
        return `0`+data;
    }
    return data;
}


function checkForNewMessages(){
    $.ajax({
        type: "GET",
        // data: data,
        url: ApiURL + '/WhatsApp/checkForNewMessages',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            if(responseData.Result == true){
                clearInterval(checkForUpdate)
                getAllConversations()
                var pname = localStorage.getItem("oclientName");
                var wa_id = localStorage.getItem("c_wa_id");
                if(pname && wa_id){
                    getmessagesFromDB(wa_id,"UNREAD")
                }
            }
        },
        error : function(err){
            HideLoader()

        }
    });
}
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
            // setCategoryInSelectBox(responseData)
            $('#ColonySelectBox').html(`<option value="">Select Colony</option>`);
            $.each(responseData.AreaList, function(i,Colony){
                $('#ColonySelectBox').append(`<option value="${Colony.ID}">${Colony.AreaText}</option>`)
            })
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
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
        responsive: true,
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

$("#CustomerMobileInput").on("keyup",function(e){
    if(e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Enter"){

    }else{
        searchCustomer($(this).val(),"TYPE_NUM")
    }
})

function searchCustomer(searchq,type){
    let SearchText;
    if(type == "TYPE_NUM"){
        SearchText = searchq;
    }else{
        SearchText = searchq.toString().slice(-10);
    }
        $.ajax({
            type: "GET",
            // data: data,
            url: ApiURL + '/Customer/searchCustomer?SearchText='+SearchText,
            headers: {
                'Authorization': 'Bearer ' + getCookie('Token')
            },
            contentType: false,       
            cache: false,             
            processData:false,
            success: function(responseData){
                if(type == "TYPE_NUM"){
                    CustomerSuggestions(responseData.CustomerList, SearchText)
                }else{
                    let citem = responseData.CustomerList;
                    let selectedProductObj = citem.find(item => item.Mobile === SearchText);
                    fillCustomerDetailInputs(selectedProductObj)
                }
                HideLoader()
            },
            error : function(err){
                HideLoader()
                
            }
        });
}


  
function fillCustomerDetailInputs(CustoerArr){
    if(CustoerArr!=null){
        $("#CustomerMobileInput").val(CustoerArr.Mobile)
        $("#CustomerNameInput").val(CustoerArr.FirstName +" "+ CustoerArr.LastName)
        $("#AddressInput").val(CustoerArr.Address[0].AddressLine1)
        $("#ColonySelectBox").val(CustoerArr.Address[0].AreaID);
    }
}

function resetCustomerInputs(){
    $("#CustomerNameInput").val('')
    $("#AddressInput").val('')
    $("#ColonySelectBox").val('');
}

$(document).on("click","#backToChatList",function(){
    getAllConversations()
    $(".chatlistscreen").removeClass("d-none")
    $(".conversation_screen").addClass("d-none")
})

$(document).on("click",".chatrow",function(){
    $(".chatlistscreen").addClass("d-none")
    $(".conversation_screen").removeClass("d-none")
    localStorage.setItem("oclientName",$(this).attr("profile_name"))
    localStorage.setItem("c_wa_id",$(this).attr("wa_id"))
    ShowConversation($(this).attr("profile_name"),$(this).attr("wa_id"),"START")

    searchCustomer($(this).attr("wa_id"))
    // console.log("ok")
})

function ShowConversation(profile_Name, wa_id, getTypes){
    let waid = wa_id;
    if(profile_Name == "null"){
        profile_Name = wa_id;
        wa_id = "";
    }
    $("#activeChatScreen").html("");
    $("#activeChatScreen").append(`
        <div class="conversation_screen" style="height:100%">
        <div class="chat">
            <div class="chat-container chatb">
                <div class="user-bar">
                    <div class="back" id="backToChatList">
                        <i class="bi bi-arrow-left-short"></i>
                    </div>
                    <div class="avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin-top:-5px;" viewBox="0 0 212 212" width="33" height="33">
                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                            <g fill="#FFF"><path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                            </path>
                            </g>
                        </svg>
                    </div>
                    <div class="name">
                        <span>${profile_Name}</span>
                        <span class="status">${wa_id}</span>
                    </div>
                </div>
                <div class="conversation">
                    <div class="conversation-container" id="personConversation"></div>
                </div>
            </div>
        </div>
        </div>
    `)
    getmessagesFromDB(waid, getTypes)
}

function getmessagesFromDB(waid, getTypes){
    let data = new FormData();
    data.append("WANumber",waid)
    data.append("getType",getTypes)
    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/WhatsApp/getMessages',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            setConversation(responseData, getTypes)
        },
        error : function(err){

        }
    });
}

function setConversation(jsonData, mtype){
    // if(jsonData.MessagesList!=null){
    //     $("#personConversation").html("");
    // }
    $.each(jsonData.MessagesList, function(i,Message){
        let type = (Message.Type == "RECEIVED")? "received" : "sent";
        //for text message
        if(Message.MessageType == "text"){
            $("#personConversation").append(`
                    <div class="message ${type}"><pre class="d-inline mb-0">${(Message.text == null ? "<i style='color:#999'><i class='bi bi-stopwatch-fill me-2'></i>This Message Unavailable</i>" : Message.text)}</pre>
                        <span class="metadata float-end">
                            <span class="time">${formateLastMessageTime(Message.M_TimeStamp)}</span>
                        </span>
                    </div>
            `)
        }
        if(Message.MessageType == "image"){
            let src;
            let btndisplay;
            if(Message.image == null){
                $("#personConversation").append(`
                    <div class="message ${type}"><pre class="d-inline mb-0"><i style='color:#999'><i class='bi bi-stopwatch-fill me-2'></i>This Message Unavailable</i></pre>
                        <span class="metadata">
                            <span class="time">${formateLastMessageTime(Message.M_TimeStamp)}</span>
                        </span>
                    </div>
            `   )
            return;
            }
            if(Message.image.image_path == null){
                src = "custom/img/blurimg.jpg";
                btndisplay = "";

            }else{
                src = Message.image.image_path;
                btndisplay ="d-none"
            }
            $("#personConversation").append(`
                    <div class="message ${type}">
                    <div class="imgcnt">
                        <img class="d-block chatimg" style="cursor:pointer" src="${src}"/>
                        <div class="dbtncnt ${btndisplay}">
                            <a href="DownloadMedia?MediaID=${Message.ID}&iid=${Message.image.iid}" target="_blank"><button type="button" messageid="${Message.ID}" class="dbutton" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Downloading">Download</button></a>
                        </div>
                    </div>
                    <pre class="d-inline mb-0">${(Message.image.Caption == null ? "" : Message.image.Caption)}</pre>
                        <span class="metadata float-end">
                            <span class="time">${formateLastMessageTime(Message.M_TimeStamp)}</span>
                        </span>
                    </div>
            `)
        }
    })
    var $conversationElement = $('.conversation');
    $conversationElement.scrollTop($conversationElement.prop("scrollHeight"));
}







//Search Product For Order
$(document).on("blur","#searchProductID",function(){
    $this = $(this);
    if($this.val()==""){
        reSetOrderinInputs($this)
        return;
    }
    let data = new FormData();
    data.append("ProductID",$this.val())
    $.ajax({
        type: "POST",
        data: data,
        url: ApiURL + '/Product/gerProductForOrder',
        headers: {
            'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            reSetOrderinInputs($this)
            if(responseData.Product.length>1){
                //open Modal
                $("#ChooseProductModal").modal('show')
                openProductVariantSuggestions(responseData.Product,$this.closest('tr'))
            }else{
                setOrderinInputs($this,responseData.Product);
            }
            $this.closest('tbody').append(newRow)
            
            
        },
        error : function(err){
            $this.val('')
            reSetOrderinInputs($this)
            $this.focus();
        }
    })
})

function openProductVariantSuggestions(variantArr, row){
    resetCustomerInputs()
    let tr = document.getElementById("ProductVariantChoose");
    tr.innerHTML="";
    var currentFocus;
    var a, b, i;

    $("#VariantID").val("")

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    

    for (i = 0; i < variantArr.length; i++) {
        a = document.createElement("tr");
        a.setAttribute("id", "plistautocomplete-list");
        // a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        tr.appendChild(a);

        var first_td = document.createElement('td');
        var second_td = document.createElement('td');
        var third_td = document.createElement('td');

        // Populate cells with sample data, replace with actual data
        first_td.textContent = variantArr[i].ID;
        second_td.textContent = variantArr[i].VariantTitle;
        third_td.textContent = "Rs." + variantArr[i].Price + "/" + variantArr[i].UnitText;

        // Append cells to the row
        a.appendChild(first_td);
        a.appendChild(second_td);
        a.appendChild(third_td);

        a.addEventListener("click", function(e) {
            let selectedProductObj = variantArr.find(item => item.ID === $("#VariantID").val());
            $("#VariantID").val("")
            let arr = [];
            arr.push(selectedProductObj)
            setOrderinInputs(row,arr)
            $('#ChooseProductModal').modal('hide');
            row.find('#qtyinput').focus()
            row.find('#qtyinput').select()
        });
    }

    //   console.log(b)
    /*execute a function presses a key on the keyboard:*/
    document.addEventListener("keydown", function(e) {
        if($('#ChooseProductModal').hasClass('show')){
            var x = document.querySelectorAll("#plistautocomplete-list");
            
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
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        
        removeActive();
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        
        /*add class "autocomplete-active":*/
        // x[currentFocus].classList.add("autocomplete-active");
        var parentElement = x[currentFocus];
        var children = parentElement.children;
        $("#VariantID").val(children[0].innerHTML)
        for (var i = 0; i < children.length; i++) {
            children[i].classList.add("suggestion-active");
        }
    }
    function removeActive() {
        let all = document.querySelectorAll(".suggestion-active")
        for (var i = 0; i < all.length; i++) {
            all[i].classList.remove("suggestion-active");
        }
    }
}

function setOrderinInputs(row,ProductData){
    var parentRow = row.closest('tr');
    parentRow.find('#pdescription').val(ProductData[0].VariantTitle);
    parentRow.find('#qtyinput').val(1);
    parentRow.find('#UOMinput').val(ProductData[0].UnitText);
    parentRow.find('#RateInput').val(ProductData[0].Price);
    parentRow.find('#totalInput').val(ProductData[0].Price);
    parentRow.find('#qtyinput').focus()
    parentRow.find('#qtyinput').select()
}

function reSetOrderinInputs(row){
    var parentRow = row.closest('tr');
    parentRow.find('#pdescription').val('');
    parentRow.find('#qtyinput').val('');
    parentRow.find('#UOMinput').val('');
    parentRow.find('#RateInput').val('');
    parentRow.find('#totalInput').val('');
}

function CustomerSuggestions(arr,val,e){
    resetCustomerInputs()
    let inputc = document.getElementById("CustomerMobileInput");
    var currentFocus;
    var a, b, i, inval = val;
    closeAllList();
    $("#CustomerID").val("")
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
        let productName = arr[i].Mobile +"-"+arr[i].FirstName+arr[i].LastName;
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
            b.innerHTML += "<input type='hidden' value='" + arr[i].Mobile + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                let selectedProductObj = arr.find(item => item.Mobile === this.getElementsByTagName("input")[0].value);
                inputc.value = `${selectedProductObj.Mobile}`;
                fillCustomerDetailInputs(selectedProductObj)
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