// Entry point for the program that controls the login form view
$(function() {
    // hide the server status noticies
    $("#server-offline").hide();
    $("#server-online").hide();
    $(".progress").hide();

    // Tell the input fields to turn back to valid when they were focused by
    // the user when invalid
    $("input").on("click", function() {
        if ($(this).hasClass("invalid")) {
            $(this).removeClass("invalid")
        }
    });

    // when the user inputs her credentials, we must authenticate them
    // with the server
    $("#form-submit").on("click", function(event) {
        // prevent default behavior so that the page is not navigated to 
        // another site
        event.preventDefault();

        // send the credentials to the server
        $server.request({
            service: 'login',
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function(response, message, xhr) {
                // check if the authentication succeeded
                if (response.meta.return_code == 0) {
                    // store the user profile data in a session storage
                    storeUserDataInLocalStorage(response.data);
                    
                    // get the name of the layout that was requested
                    var layout = 
                        window.location.pathname.replace($root, "");
                    
                    // if it is not empty...
                    if (layout.length > 0) {
                        // Initialize the SideNav
                        $("#page-content").addClass("with-side-menu");
                        $("#slide-out").show();
                        $('.button-collapse').show();
                        $(".button-collapse").sideNav();

                        // display the name of the user
                        $("#account-name").text(localStorage.first_name);

                        // load the requested layout
                        $app.load(layout);
                    } else {
                        // if it's empty, then redirect to the home page
                        window.location.href = $root + 'edit-profile';
                    }
                } else if ($("#server-online").is(":visible")) {
                    // if authentication failed with the server available,
                    // it means that the credentials are wrong, so notify
                    // the user visually
                    loadToast(
                        "failed_login", 
                        3500, "rounded"
                    );
                    $("#username").addClass("invalid");
                    $("#password").addClass("invalid");
                    $(".prefix").addClass("invalid");
                    console.log("server says: " + response.meta.message);
                } else {
                    // if the authentication failed with the server unavailable,
                    // remind the user visually that the server is unavailable
                    loadToast(
                        "server_offline",
                        3500, "rounded"
                    );
                    console.log("server says: " + response.meta.message);
                }
            },
            error: function(xhr, status, message) {
                // display the server result and the proper status icon
                $("#server-online").hide();
                $("#server-offline").show();
                console.log("server says: " + status + ", " + message);
            } 
        });
    });
    
    // as soon as the page is loaded, query the server to check it's status
    $server.request({
        service: 'status', 
        success: function(response, message, xhr) {
            // depending if the server is available or not, show the proper
            // icon
            if (response.meta.return_code == 0) {
                $("#server-online").show();
            } else {
                $("#server-offline").show();
                console.log("server says: " + response.meta.message);
            }
        },
        error: function(xhr, status, message) {
            // display the server result and the proper status icon
            $("#server-offline").show();
            console.log("server says: " + status + ", " + message);
        }
    });

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});