// Entry point for the program that controls the login form view
$(function() {
    // hide the server status noticies
    $("#server-offline").hide();
    $("#server-online").hide();
    
    // as soon as the page is loaded, query the server to check it's status
    $.ajax({
        // the service we are requesting
        url: "/espresso/server-status",

        // the HTTP method to use
        method: "GET",

        // the type of data expected to be returned from the server
        dataType: "json",

        // indicate that we do not want to store the response in cache
        cache: false,
        
        // on success callback
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
        
        // on error callback
        error: function(xhr, status, message) {
            // display the server result and the proper status icon
            console.log("server says: " + status + ", " + message);
            $("#server-offline").show();
        }
    });
    
    // Tell the input fields to turn back to valid when they were focused by
    // the user when invalid
    $("input").click(function() {
        if ($(".prefix").hasClass("invalid")) {
            $(".prefix").removeClass("invalid")
        }
    });
    
    // when the user inputs her credentials, we must authenticate them
    // with the server
    $("#form-submit").click(function(e) {
        // prevent default behavior so that the page is not navigated to 
        // another site
        e.preventDefault();

        // send the credentials to the server
        $.ajax({
            // server service that we are requesting
            url: "/espresso/users/authenticate",

            // HTTP method to send data
            method: "POST",

            // the type of data expected to be returned from the server
            dataType: "json",

            // user credentials
            data: {
                username: $("#username").val(),
                password: $.md5($("#password").val())
            },

            // indicate that we do not want to store the response in cache
            cache: false,
            
            // on success callback
            success: function(response, message, xhr) {
                // check if the authentication succeeded
                if (response.meta.return_code == 0) {
                    // store the user profile data in a session storage
                    sessionStorage.id = response.data.id;
                    sessionStorage.employee_id_num =  
                        response.data.employee_id_num;
                    sessionStorage.full_name = response.data.full_name;
                    sessionStorage.email = response.data.email;
                    sessionStorage.login_name = response.data.login_name;
                    sessionStorage.login_password = 
                        response.data.login_password;
                    sessionStorage.key = response.data.key;
                    
                    // redirect to the home page
                    
                    window.location.href = "/espresso/home";
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
                    console.log("server says: " + response.meta.message);
                    loadToast(
                        "server_offline",
                        3500, "rounded"
                    );
                }
            },
            
            // on error callback
            error: function(xhr, status, message) {
                // display the server result and the proper status icon
                console.log("server says: " + status + ", " + message);
                $("#server-online").hide();
                $("#server-offline").show();
            }
        })
    });
    
    // change the language
    changeLanguage(localStorage.defaultLanguage);
});