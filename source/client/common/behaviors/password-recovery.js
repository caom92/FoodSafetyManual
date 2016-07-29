// Contains the whole procedure for the user to request a password recovery
function requestPasswordRecovery()
{
    // Tell the input fields to turn back to valid when they were 
    // focused by the user when invalid
    $("input").on("click", function() {
        if ($(this).hasClass("invalid")) {
            $(this).removeClass("invalid")
        }
    }); 

    // hide the progress bar
    $('div.progress').hide();

    // then add the proper events
    $('#form-submit').on('click', function(event) {
        // prevent navigation to another page
        event.preventDefault();

        // check if the email is empty
        var isEmailEmpty = $('#email').val().length == 0;
        if (isEmailEmpty) {
            // if it is, notify the user
            $('#email').addClass('invalid');
            $(".prefix").addClass('invalid');
            Materialize.toast(
                'Llene el campo indicado.', 
                3500, 
                'rounded'
            );
        } else {
            // show the preloader
            $(".progress").show();

            // if not, then send the petition to the data base server
            $server.request({
                service: 'request-password-recovery',
                data: {
                    email: $("#email").val(),
                    lang: localStorage.defaultLanguage
                },
                success: function(response, message, xhr) {
                    // check if the user validation succeeded
                    if (response.meta.return_code == 0) {
                        // if so, let the user know that an email has 
                        // been sent to her account
                        Materialize.toast(
                            "Se envió un mensaje a su correo " + 
                            "electrónico", 
                            3500, "rounded"
                        );
                    } else {
                        // if the validation failed, then let the user 
                        // know that the user name is invalid 
                        Materialize.toast(
                            "El correo electrónico no está registrado", 
                            3500, "rounded"
                        );
                        $("#email").addClass("invalid");
                        $(".prefix").addClass("invalid");
                        console.log("server says: " + 
                            response.meta.message
                        );
                    }

                    // hide the preloader
                    $(".progress").hide();
                },
                error: function(xhr, status, message) {
                    $(".progress").hide();
                    Materialize.toast("El servidor no está disponible", 
                        3500, "rounded");
                    console.log("server says: " + 
                        status + ", " + 
                        message
                    );
                }   // error: function(xhr, status, message)
            }); // $server.request()
        } // else [if (isEmailEmpty)]
    }); // $('#form-submit').on()
}


// Contains the whole procedure for the user to reset her password
function resetPassword(query)
{
    // Tell the input fields to turn back to valid when they were focused by
    // the user when invalid
    $("input").on("click", function() {
        if ($(this).hasClass("invalid")) {
            $(this).removeClass("invalid")
        }
    });

    // Validate the form entry when the user clicks on the form submit button
    $("#form-submit").on("click", function(event) {
        // prevent navigation to another page
        event.preventDefault();

        // check if the fields are empty
        if (!$("#new-password").val() || !$("#confirm-password").val()) {
            // if they are, notify the user visually
            $("#new-password").addClass("invalid");
            $("#confirm-password").addClass("invalid");
            $(".prefix").addClass("invalid");
            Materialize.toast(
                "Por favor, llene los campos indicados.", 3500, "rounded"
            );
        } else if ($("#new-password").val() == $("#confirm-password").val()) {
            // now check if both fields have the same password and if they do,
            // we change the password in the server data base
            $server.request({
                service: 'change-password-by-recovery',
                data: {
                    new_password: hash($("#new-password").val()),
                    token: query.token
                },
                success: function(response, message, xhr) {
                    // check if the password change succeeded
                    if (response.meta.return_code == 0) {
                        // store the user profile data in a session storage
                        storeUserDataInLocalStorage(response.data);

                        // redirect to the home page
                        window.location.href = $root + 'edit-profile';
                    } else {
                        // if not, notify the user
                        Materialize.toast(
                            "¡Hubo un problema al cambiar la contraseña!", 
                            3500, "rounded"
                        );
                        console.log("server says: " + response.meta.message);
                    }
                }
            });
        } else {
            // if the password fields differ from one another, notify the user
            // visually
            Materialize.toast("Los campos no coinciden.", 3500, "rounded");
            $("#new-password").addClass("invalid");
            $("#confirm-password").addClass("invalid");
            $(".prefix").addClass("invalid");
        }
    });

    // connect to the server in order to obtain check if the recovery
    // token is still valid
    $server.request({
        service: 'token-validation',
        data: {
            token: query.token
        },
        success: function(response, message, xhr) {
            // check if the response was successful
            if (response.meta.return_code == 0) {
                $("#reset-password-form").show();
            } else {
                // otherwise, the token has expired or is not a valid token
                window.location.href = $root;
                console.log("server says: " + response.meta.message);
            }
        }
    });
}


// Entry point for the behavior of the password recovery page
$(function() {
    // get the token from the query string
    var query = getURLQueryStringAsJSON();

    // check if the token is empty
    var isTokenEmpty = query.length == 0;
    if (isTokenEmpty) {
        // if it is empty, the user wants to request the password recovery
        // so we display the proper page
        $('div.card').load(
            $root + 'common/layouts/request-password-recovery-form', 
            function() {
                requestPasswordRecovery();
            }   
        );
    } else {
        $('div.card').load(
            $root + 'common/layouts/reset-password-form',
            function() {
                resetPassword(query);
            }
        );
    }
});