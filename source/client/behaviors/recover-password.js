// Entry point for the program that controls the password recovery page layout
$(function() {
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
            Materialize.toast("Por favor, llene los campos indicados.", 3500, "rounded");
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
                        window.location.href = $root + '/edit-profile';
                    } else {
                        // if not, notify the user
                        Materialize.toast("¡Hubo un problema al cambiar la contraseña!", 3500, "rounded");
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

    // get the token from the query string
    var query = getURLQueryStringAsJSON();

    // connect to the server in order to obtain check if the recovery
    // token is still valid
    $server.request({
        service: 'token-validation',
        data: {
            token: query.token
        },
        success: function(response, message, xhr) {
            // hide the preloader
	        $("#preloader").hide();

            // check if the response was successful
            if (response.meta.return_code == 0) {
                $("#recovery-accepted").show();
            } else {
                // otherwise, the token has expired or is not a valid token
                window.location.href = $root + '/';
                console.log("server says: " + response.meta.message);
            }
        }
    });
});