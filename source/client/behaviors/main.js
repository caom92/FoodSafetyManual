// Entry point for the program that controls the main page layout
$(function() {
    // When the user clicks the logout button, close the session in both
    // the client and the server
    $("#logout").on("click", function(event) {
        // prevent default behavior of redirecting to another page
        event.preventDefault();
        
        // tell the server to close the session as well
        $server.request('logout', {}, 
            function(response, message, xhr) {
                // clear the session variables in the client
                localStorage.clear();
                
                // finally redirect to the login page
                window.location.href = '/espresso/';
                console.log("server says: " + response.meta.message);
            }
        );
    });
        
    // check if the user is logged in
    $server.request('check-session', {}, 
        function(response, message, xhr) {
            // check if the reponse was an error
            if (response.meta.return_code == 0) {
                // Initialize the SideNav
                $("#page-content").addClass("with-side-menu");
                $("#slide-out").show();
                $(".button-collapse").sideNav();

                // display the name of the user
                $("#account-name").text(localStorage.first_name);
                
                // Load the layout of the queried page into the page 
                // container this will preserve backward and forward 
                // buttons' functionality
                var layout = 
                    window.location.pathname.replace("/espresso/", "");
                
                if (layout != '') {
                    $app.load(layout);
                } else {
                    $app.load('home');
                }
            } else {
                // if it was, display the login page
                $app.load('login');
                console.log("server says: " + response.meta.message);
            }
        }
    );

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});
