// Launch the main function of the controller of the especified view
function onViewReady(view) {
    // lanch the controller
    switch (view) {
        case "report-problem":
            onReportProblemViewReady();
        break;
        
        case "edit-profile":
            onEditProfileViewReady();
        break;
    }
    
    // update the view's language
    changeLanguage(localStorage.defaultLanguage);
}


// Entry point for the program that controls the main page layout
$(function() {
    // check if the user is logged in
    $.ajax({
        // the URL of the service we are requesting
        url: "/espresso/users/check-session?key=" 
            + sessionStorage.getItem("key") + "&password=" + sessionStorage.getItem("login_password"),

        // the HTTP method to use
        method: "GET",

        // indicate that we are expecting to recieve a JSON
        dataType: "json",

        // indicate that we don't want the response to be stored in cache
        cache: false,
        
        // on success callback
        success: function(response, message, xhr) {
            // check if the reponse was an error
            if (response.meta.return_code == 0) {
                // Initialize the SideNav
                $("#page-content").addClass("with-side-menu");
                $("#slide-out").show();
                $(".button-collapse").sideNav();
                
                // Load the view of the queried page into the content holder,
                // this will preserve backward and forward buttons' 
                // functionality
                resource = window.location.pathname.replace("/espresso/", "");
                $("#page-content").load("/espresso/views/" + resource,
                    function complete() {
                        // after loading the view, execute the code of its
                        // controller
                        onViewReady(
                            window.location.pathname.replace("/espresso/", "")
                        );
                    }
                );
                
                // display the name of the user
                names = sessionStorage.full_name.split(" ");
                accountName = names[0] + " " + names[1];
                $("#account-name").text(accountName);
            } else {
                // if it was, redirect the user to the login page
                window.location.href = "/espresso";
                console.log("server says: " + response.meta.message);
            }
        }, 
        
        // on error callback
        error: function(xhr, status, message) {
            // redirect the user to the login page
            window.location.href = "/espresso";
            console.log("server says: " + status + ", " + message);
        }
    });
    
    // When the user clicks the logout button, close the session in both
    // the client and the server
    $("#logout").click(function(e) {
        // prevent default behavior of redirecting to another page
        e.preventDefault();
        
        // tell the server to close the session as well
        $.ajax({
            //url: "/espresso/source/server/services/session/logout.php",
            url: "/espresso/users/logout",
            dataType: "json",
            cache: false,
            success: function(response, message, xhr) {
                // clear the session variables in the client
                sessionStorage.clear();
                
                // finally redirect to the login page
                window.location.href = "/espresso";
                console.log("server says: " + response.meta.message);
            },
            error: function(xhr, status, message) {
                console.log("server says: " + status + ", " + message);
            }
        });
    });
});