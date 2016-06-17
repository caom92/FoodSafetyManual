// Entry point for the program that controls the login form view
$(function() {
    // hide the server status noticies
    $("#server-offline").hide();
    $("#server-online").hide();
    $(".progress").hide();

    // Tell the input fields to turn back to valid when they were focused by
    // the user when invalid
    $("input").click(function() {
        if ($(this).hasClass("invalid")) {
            $(this).removeClass("invalid")
        }
    });

    // when the user inputs her credentials, we must authenticate them
    // with the server
    $("#form-submit").click(function(event) {
        // prevent default behavior so that the page is not navigated to 
        // another site
        event.preventDefault();

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
                password: sha256($("#password").val())
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

    // when the user clicks the option to recover his password, we must 
    // authenticate his user name first and if it is valid, send an email
    // to her with a password recovery link
    $(".password_forgotten").click(function(event) {
        // prevent default navigation of the hyperlink
        event.preventDefault();

        // show the preloader
        $(".progress").show();

        // check if the user left the username empty
        if ($("#username").val().length != 0) {
            // if not, then send the petition to the data base server
            $.ajax({
                // the url of the server service we are requesting
                url: "/espresso/users/request-password-recovery",

                // the HTTP method that we'll use to send data to the data base
                method: "POST",

                // indicate that we expect a JSON response from the server
                dataType: "json",

                // the data that we want to send to the server
                data: {
                    username: $("#username").val(),
                    lang: localStorage.defaultLanguage
                },

                // indicate that we do not wish to store the server response in 
                // cache
                cache: false,

                // the callback to invoke when server communication succeeded
                success: function(response, message, xhr) {
                    // check if the user validation succeeded
                    if (response.meta.return_code == 0) {
                        // if so, let the user know that an email has been sent 
                        // to her account
                        Materialize.toast("Se envi&oacute; un mensaje a su correo electr&oacute;nico", 
                            3500, "rounded");
                    } else {
                        // if the validation failed, then let the user know 
                        // that the user name is invalid 
                        Materialize.toast("El nombre de usuario no es v&aacute;lido", 
                            3500, "rounded");
                        $("#username").addClass("invalid");
                        $("#username.prefix").addClass("invalid");
                        console.log("server says: " + response.meta.message);
                    }

                    // hide the preloader
                    $(".progress").hide();
                },

                // the callback to invoke when server communication failed
                error: function(xhr, status, message) {
                    console.log("server says: " + status + ", " + message);
                    Materialize.toast("El servidor no est&aacute; disponible", 
                        3500, "rounded");
                    $(".progress").hide();
                }
            });
        } else {
            // if the username is empty, then tell the user that the field is 
            // required
            Materialize.toast("Por favor ingrese el campo indicado.", 
                3500, "rounded");
            $("#username").addClass("invalid");
            $("#username.prefix").addClass("invalid");
        }
    });
    
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

    // change the language
    changeLanguage(localStorage.defaultLanguage);
});