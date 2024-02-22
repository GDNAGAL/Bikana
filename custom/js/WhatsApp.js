let ApiURL = $("#ApiURL").val();
$("body").addClass("toggle-sidebar")
HideLoader()
function HideLoader(){
    $(".backdrop").hide()
}

let activeChat;

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


//Call All Function on Start
  getAllConversations()

function getAllConversations(){
    ShowLoader()
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
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function setConversationsInRows(jsonData){
    $.each(jsonData.ConversationList, function(i,Chat){
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
                    <span class="badge rounded-pill text-bg-primary float-end">Info</span>
                    </div>
                </div>
            </div>
        `)
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


if(activeChat == undefined){
    $("#activeChatScreen").append(`
        <div class="nochat"><p>Select a Number to Start Chat.</p></div>
    `)
}

$(document).on("click",".chatrow", function(){
    ShowConversation($(this).attr("profile_name"),$(this).attr("wa_id"))
})

function ShowConversation(profile_Name, wa_id){
    let waid = wa_id;
    if(profile_Name == "null"){
        profile_Name = wa_id;
        wa_id = "";
    }
    $("#activeChatScreen").html("");
    $("#activeChatScreen").append(`
        <div class="col-md-8" id="col9">
        <div class="conversation_screen" style="height:100%">
        <div class="chat">
            <div class="chat-container">
                <div class="user-bar">
                    <div class="avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="33" height="33">
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
                    <div class="dropdown float-end">
                        <a class="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Action
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Mark As Order</a></li>
                            <li><a class="dropdown-item" href="#">Mark As Issue</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <div class="conversation">
                    <div class="conversation-container" id="personConversation"></div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="col-md-4">C</div>
    `)
    let data = new FormData();
    data.append("WANumber",waid)
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
            setConversation(responseData)
            HideLoader()
        },
        error : function(err){
            HideLoader()

        }
    });
}

function setConversation(jsonData){
    $("#personConversation").html("");
    $.each(jsonData.MessagesList, function(i,Message){
        let type = (Message.Type == "RECEIVED")? "received" : "sent";
        //for text message
        if(Message.MessageType == "text"){
            $("#personConversation").append(`
                    <div class="message ${type}">${Message.text}
                        <span class="metadata">
                            <span class="time">${formateLastMessageTime(Message.M_TimeStamp)}</span>
                        </span>
                    </div>
            `)
        }
    })
    var $conversationElement = $('.conversation');
    $conversationElement.scrollTop($conversationElement.prop("scrollHeight"));
}
{/* <div class="message received">
You were drunk.
<span class="metadata"><span class="time"></span></span>
</div>
<div class="message sent">
No I wasn't.
<span class="metadata">
<span class="time"></span><span class="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
</span>
</div>
<div class="message received">
<span id="random">You were hugging an old man with a beard screaming "DUMBLEDORE YOU'RE ALIVE!"</span>
<span class="metadata"><span class="time"></span></span>
</div> */}