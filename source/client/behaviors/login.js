// Entry point for the program that controls the login form view
$app.behaviors['login'] = function() {
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
        var hashedPassword = hash($("#password").val());
        $server.request({
            service: 'login',
            data: {
                username: $("#username").val(),
                password: hashedPassword
            },
            success: function(response, message, xhr) {
                // check if the authentication succeeded
                if (response.meta.return_code == 0) {
                    // store the user profile data in a session storage
                    storeUserDataInLocalStorage(response.data);
                    
                    // get the name of the layout that was requested
                    var layout = 
                        window.location.pathname.replace($root + "/", "");
                    
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
                        window.location.href = $root + '/edit-profile';
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

    // when the user clicks the option to recover his password, we must 
    // authenticate his user name first and if it is valid, send an email
    // to her with a password recovery link
    $(".password_forgotten").on("click", function(event) {
        // prevent default navigation of the hyperlink
        event.preventDefault();

        // check if the user left the username empty
        if ($("#username").val().length != 0) {
            // show the preloader
            $(".progress").show();

            // if not, then send the petition to the data base server
            $server.request({
                service: 'password-recovery',
                data: {
                    username: $("#username").val(),
                    lang: localStorage.defaultLanguage
                },
                success: function(response, message, xhr) {
                    // check if the user validation succeeded
                    if (response.meta.return_code == 0) {
                        // if so, let the user know that an email has been sent 
                        // to her account
                        Materialize.toast(
                            "Se envió un mensaje a su correo electrónico", 
                            3500, "rounded"
                        );
                    } else {
                        // if the validation failed, then let the user know 
                        // that the user name is invalid 
                        Materialize.toast("El nombre de usuario no es válido", 
                            3500, "rounded");
                        $("#username").addClass("invalid");
                        $("#username.prefix").addClass("invalid");
                        console.log("server says: " + response.meta.message);
                    }

                    // hide the preloader
                    $(".progress").hide();
                },
                error: function(xhr, status, message) {
                    $(".progress").hide();
                    Materialize.toast("El servidor no está disponible", 
                        3500, "rounded");
                    console.log("server says: " + status + ", " + message);
                }
            });
        } else {
            // if the username is empty, then tell the user that the field is 
            // required
            $("#username").addClass("invalid");
            $("#username.prefix").addClass("invalid");
            Materialize.toast("Por favor ingrese el campo indicado.", 
                3500, "rounded");
        }
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
}