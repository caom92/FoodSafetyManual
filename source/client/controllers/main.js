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
    // When the user clicks the logout button, close the session in both
    // the client and the server
    $("#logout").on("click", function(event) {
        // prevent default behavior of redirecting to another page
        event.preventDefault();
        
        // tell the server to close the session as well
        $.ajax({
            // the URL of the service that we are requesting
            url: "/espresso/users/logout",

            // the HTTP method that we will use for requesting the service
            method: "GET",

            // indicate that we expect the server to return a JSON object
            dataType: "json",

            // indicate that we do not want the response to be stored in cache
            cache: false,

            // the callback to invoque when the communication with the server 
            // succeeded
            success: function(response, message, xhr) {
                // clear the session variables in the client
                sessionStorage.clear();
                
                // finally redirect to the login page
                window.location.href = "/espresso";
                console.log("server says: " + response.meta.message);
            },

            // the callback to invoque when the communication with the server 
            // failed
            error: function(xhr, status, message) {
                console.log("server says: " + status + ", " + message);
            }
        });
    });
    
    // check if the user is logged in
    $.ajax({
        // the URL of the service we are requesting
        url: "/espresso/users/check-session",

        // the HTTP method to use
        method: "POST",

        // the data sent to the server
        data: {
            key: ""
        },

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
                        onViewReady(resource);
                    }
                );
                
                // display the name of the user
                $("#account-name").text(sessionStorage.first_name);
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
});
