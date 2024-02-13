let ApiURL = $("#ApiURL").val();



function confirmsw(msg){
    Swal.fire({
        title: msg,
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
            window.location = "logout"
        }
      });
}

function HideLoader(){
    $(".backdrop").hide()
}

function ShowLoader(){
    $(".backdrop").show()
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

  activateMenu()
function activateMenu() {
    var menuItems = document.getElementsByClassName("sidebar-link");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('actived');
            // var immediateParent = getClosest(matchingMenuItem, 'li');
            // if (immediateParent) {
            //     immediateParent.classList.add('actived');
            // }

            // var parent = getClosest(matchingMenuItem, '.parent-menu-item');
            // if (parent) {
            //     parent.classList.add('actived');
            //     var parentMenuitem = parent.querySelector('.menu-item');
            //     if (parentMenuitem) {
            //         parentMenuitem.classList.add('actived');
            //     }
            //     var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
            //     if (parentOfParent) {
            //         parentOfParent.classList.add('actived');
            //     }
            // } else {
            //     var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
            //     if (parentOfParent) {
            //         parentOfParent.classList.add('actived');
            //     }
            // }
        }
    }
}

function hideModal(id){
    $(id).hide();
    $(".modal-backdrop").hide();
}