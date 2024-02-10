document.write('<script type="text/javascript" src="functions.js"></script>');
$(document).ready(function() {
getProductCategoryList()


categoryIcon.onchange = evt => {
    const [file] = categoryIcon.files
    if (file) {
        CategoryIconPreview.src = URL.createObjectURL(file)
    }
  }

$("#addProductCategory").on("submit",function(e){
    // $("#AddProductCategoryModal").modal('hide');
    e.preventDefault();
    ShowLoader()
    $("#message").html('')
    let data = new FormData(this);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getCookie('Token')}`);
    const requestOptions = {
        method: 'POST',
        body: data, 
        mode: 'cors',
        headers: myHeaders,
        credentials: 'include',
      };
      
    fetch(ApiURL + '/ProductCategory/addProductCategory', requestOptions)
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResponse => {
                throw { status: response.status, error: errorResponse };
            });
        }
        return response.json();
    })
    .then(responseData => {
        hideModal("#AddProductCategoryModal");
        $("#addProductCategory")[0].reset();
        HideLoader();
        getProductCategoryList()
    })
    .catch(error => {
        console.log(error)
        HideLoader();
        let errorMessage;
        if (error && error.error && error.error.Message) {
            errorMessage = error.error.Message;
        } else {
            errorMessage = "Unknown Error";
        }
        $("#message").html(`<span class="text-danger fw-bold">${errorMessage}</span>`)
    });
  
})


function getProductCategoryList(){
    ShowLoader()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getCookie('Token')}`);
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
        credentials: 'include',
    };
    
    fetch(ApiURL + '/ProductCategory/getProductCategoryList', requestOptions)
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorResponse => {
                throw { status: response.status, error: errorResponse };
            });
        }
        return response.json();
    })
    .then(responseData => {
        $("#productCategoryTableBody").html("");
        //Show Data in table
        $.each(responseData.ProductCategoryList, function(key, Category) {
            let tr = `
                    <tr>
                        <td>${Category.CategoryID}</td>
                        <td> <img src="${Category.SmallImage}" width="50px" height="50px" alt="" srcset=""></td>
                        <td>${Category.CategoryName}</td>
                        <td>${Category.CategoryDesc}</td>
                        <td>${Category.Created_At}</td>
                        <td>${Category.Created_By}</td>
                        <td></td>
                    </tr>`;
            $("#productCategoryTableBody").append(tr);
        });
        HideLoader();
    })
    .catch(error => {
        HideLoader();
        console.log(error)
    });
}

});