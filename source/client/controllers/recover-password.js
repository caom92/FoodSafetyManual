// Entry point for the program that controls the password recovery page layout
$(function() {
    // get the token from the query string
    var query = getURLQueryStringAsJSON();

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
            $.ajax({
                // the URL of the service that we are requesting
                url: "/espresso/users/change-password",

                // the HTTP method that we use to send the data to the server
                method: "POST",

                // indicate that we expect the server to return a JSON object
                // in response
                dataType: "json",

                // the data that we are going to send the the server
                data: {
                    user_id: sessionStorage.getItem("id"),
                    new_password: sha256($("#new-password").val())
                },

                // indicate that we do not want to store the response in cache
                cache: false,

                // the callback to invoque when the server reponded successfully
                success: function(response, message, xhr) {
                    // check if the password change succeeded
                    if (response.meta.return_code == 0) {
                        // store the user profile data in a session storage
                        sessionStorage.employee_num =  
                            response.data.employee_num;
                        sessionStorage.first_name = response.data.first_name;
                        sessionStorage.last_name = response.data.last_name;
                        sessionStorage.email = response.data.email;
                        sessionStorage.account_nickname = 
                            response.data.account_nickname;
                        sessionStorage.login_password = 
                            response.data.login_password;

                        // redirect to the home page
                        window.location.href = "/espresso/home";
                    } else {
                        // if not, notify the user
                        Materialize.toast("&iexcl;Hubo un problema al cambiar la contrase&ntilde;a!", 3500, "rounded");
                        console.log("server says: " + response.meta.message);
                    }
                },

                // the callback to invoque when the server could not be 
                // contacted
                error: function(xhr, status, message) {
                    console.log("server says: " + status + ", " + message);
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
    $.ajax({
        // the URL of the service that we are requesting
        url: "/espresso/users/use-recovery-token",

        // the HTTP method to use to send data to the server
        method: "POST",

        // the data to send to the server includes just the token that
        // was sent to him by email
        data: {
            token: query.token
        },

        // indicate that we expect to recieve a JSON object from the server
        // as a response
        dataType: "json",

        // indicate that we do not want to store the reponse in cache
        cache: false,

        // callback to invoke when the server was contacted successfully
        success: function(response, message, xhr) {
            // hide the preloader
	        $("#preloader").hide();

            // check if the response was successful
            if (response.meta.return_code == 0) {
                $("#recovery-accepted").show();
                sessionStorage.id = response.data.user_id;
            } else {
                // otherwise, the token has expired or is not a valid token
                console.log("server says: " + response.meta.message);
                location.href = "/espresso";
            }
        },

        // callback to invoke when the server did not responded
        error: function(xhr, status, message) {
            console.log("server says: " + status + ", " + message);
        }
    });
});