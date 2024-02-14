// document.write('<script type="text/javascript" src="custom/js/functions.js"></script>');


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
        url: ApiURL + '/userlogin',
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            HideLoader()
            document.cookie=  `Token=${responseData.Token}`; 
            $("#message").html(`<span class="text-success fw-bold">${responseData.Message}</span>`)
            window.location = "index";
        },
        error : function(err){
            HideLoader()
            if(err.responseJSON.Message != undefined){
                $("#message").html(`<span class="text-danger fw-bold">${err.responseJSON.Message}</span>`) 
            }else{
                $("#message").html(`<span class="text-danger fw-bold">Error</span>`) 
            }
        }
    });
})