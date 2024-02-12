// document.write('<script type="text/javascript" src="custom/js/functions.js"></script>');


window.addEventListener('load', function load() {
    HideLoader();
});

$("#loginForm").on("submit",function(e){
    $("#message").html('')
    e.preventDefault();
    ShowLoader()
    let data = new FormData(this);
    const requestOptions = {
        method: 'POST',
        body: data, 
      };
      
    fetch(ApiURL +  '/userlogin', requestOptions)
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResponse => {
                throw errorResponse;
            });
        }
        return response.json();
    })
    .then(responseData => {
        HideLoader()
        document.cookie=  `Token=${responseData.Token}`; 
        $("#message").html(`<span class="text-success fw-bold">${responseData.Message}</span>`)
        window.location = "index";
    })
    .catch(error => {
        HideLoader()
        $("#message").html(`<span class="text-danger fw-bold">${error.Message}</span>`) 
    });
})