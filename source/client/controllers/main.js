// Launch the main function of the controller of the especified view
function onViewReady(view) {
    switch (view) {
        case "report-problem":
            onReportProblemViewReady();
            break;
    }
}


// Entry point for the program that controls the main page layout
$(function() {
    // first, check if the user is logged in
    $.ajax({
        method: "POST",
        url: "/espresso/source/server/services/session/check.php",
        
        // send the key that was given to us by the server when we logged in
        data: {
            key: sessionStorage.getItem("key")
        },
        
        // on success callback
        success: function(data, message, xhr) {
            // parse the response from the server to a json 
            response = JSON.parse(data);
            
            // check if the reponse was an error
            if (response.error_code == 0) {
                // Initialize the SideNav
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
                console.log("server says: " + response.error_message);
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
            url: "/espresso/source/server/services/session/logout.php",
            success: function(data, message, xhr) {
                console.log("server says: " + data);
                
                // clear the session variables in the client
                sessionStorage.clear();
                
                // finally redirect to the login page
                window.location.href = "/espresso";
            },
            error: function(xhr, status, message) {
                console.log("server says: " + status + ", " + message);
            }
        });
    });
});