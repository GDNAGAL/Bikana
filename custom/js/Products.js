document.write('<script type="text/javascript" src="functions.js"></script>');


window.addEventListener('load', function load() {
    HideLoader();
});

$("#loginForm").on("submit",function(e){
    $("#message").html('')
    e.preventDefault();
    ShowLoader()
    let data = new FormData(this);
    $.ajax({
        type: "POST",
        data: data, 
        contentType: false,       
        cache: false,             
        processData:false,
        url: ApiURL +  '/userlogin',
        headers: {
            // 'Authorization': 'Bearer ' + getCookie("Token")
        },
        success: function(result){
            HideLoader()
            document.cookie=  `Token=${result.Token}`; 
            $("#message").html(`<span class="text-success fw-bold">${result.Message}</span>`)
            window.location = "index";
        },
        error : function(err){
            HideLoader()
            $("#message").html(`<span class="text-danger fw-bold">${err.responseJSON.Message}</span>`)
        }
    })
})