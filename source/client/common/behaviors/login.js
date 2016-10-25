// Entry point for the program that controls the login form view
$(function() {
    // hide the server status noticies
    $("#server-offline").hide();
    $("#server-online").hide();
    $(".progress").hide();

    $('form#login-form').validate({
        debug: true,
        errorClass: 'invalid',
        validClass: 'valid',
        focusInvalid: false,
        rules: {
            username: {
                required: true,
                minlength: 6
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: {
                    english: 'User name cannot be empty',
                    spanish: 'El nombre de usuario no puede estar vacío'
                },
                minlength: {
                    english: 'User name must be at least 6 characters long',
                    spanish: 'El nombre de usuario debe tener al menos 6 caracteres'
                }
            },
            password: {
                required: {
                    english: 'Password cannot be empty',
                    spanish: 'La contraseña no puede estar vacía'
                },
                minlength: {
                    english: 'Password must be at least 6 characters long',
                    spanish: 'La contraseña debe tener al menos 6 caracteres'
                }
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).parent()
                .find('i.mdi.prefix')
                .addClass(errorClass)
                .removeClass(validClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).addClass(validClass).removeClass(errorClass);
            $(element).parent()
                .find('i.mdi.prefix')
                .addClass(validClass)
                .removeClass(errorClass);
        },
        showErrors: function(errorMap, errorList) {
            for (error of errorList) {
                switch (localStorage.defaultLanguage) {
                    case 'en':
                        Materialize.toast(error.message.english, 3500, 'rounded');
                    break;

                    case 'es':
                        Materialize.toast(error.message.spanish, 3500, 'rounded');
                    break;
                }
            }
            this.defaultShowErrors();
        },
        submitHandler: function(form) {
            // when the user inputs her credentials, we must authenticate them
            // with the server
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
                        $('.prefix').addClass('invalid');
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
});