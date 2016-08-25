// This function makes a call to the server, validating credentials
// before changing the old password to a new one

function checkCurrentPassword(){
    return false;
}

// Function that sends the http request to the PHP script that
// updates the user's password

function updatePassword(){
    if(checkCurrentPassword()){
        // Send HTTP request
    } else {
        loadToast("invalid_password", 3500, "rounded");
    }
}

// This function checks the new password entered in both fields
// to ensure the user knows its password

function passwordMatch(){
    if($("#new-password").val() == $("#check-password").val()){
        return true;
    } else {
        $("#check-password").addClass("invalid");
        return false;
    }
}

function isRequiredTextAreaValid(id) {
    if ($(id).val().length == 0) {
        $(id).addClass("invalid");
        return false;
    }
    return true;
}

// The main function which starts execution of this controller, call only
// when its corresponding view is ready
$(function() {
    $('#form-wrappers').collapsible();

    //Link localStorage value to the required fields
    $("#user-name").val(localStorage.login_name);
    $("#user-id").val(localStorage.employee_num);
    $("#user-email").val(localStorage.email);
    $("#real-name").val(localStorage.first_name + " " + localStorage.last_name);

    if (localStorage.recieve_email_notifications == '1') {
        $('#enable-notifications').prop("checked", true);
    }

    //Hide the form fields that belong to changing account information
    $("#change_password_wrapper").hide();
    $("#change_email_wrapper").hide();
    $("#change_username_wrapper").hide();


    // Validate the password fields before changing it on the database
    $("#update_password").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        oldPasswordIsValid = isRequiredTextAreaValid("#old-password") 
        newPasswordIsValid = isRequiredTextAreaValid("#new-password");
        checkPasswordIsValid = isRequiredTextAreaValid("#check-password");

        // First check; filled fields
        if(oldPasswordIsValid && newPasswordIsValid && checkPasswordIsValid){
            //Second check; both the new password and the check match
            if(passwordMatch()){
                //Third check; validate the user with its old password before
                //changing it on the database
                $server.request({
                    service: 'change-password',
                    data: {
                        password: $("#old-password").val(),
                        new_password: $("#new-password").val()
                    },
                    success: function(response, message, xhr) {
                        if (response.meta.return_code == 0) {
                            loadToast("password_changed", 3500, "rounded");
                        } else {
                            console.log(
                                "server says: " + response.meta.message);
                        }
                    }
                });
            } else {
                Materialize.toast("La contraseña y la verificación no coinciden",
                    3500, "rounded");
            }
        } else {
            Materialize.toast("Por favor llene todos los campos",
                3500, "rounded");
        }
    });

    $("#update_email").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        $server.request({
            service: 'change-email',
            data: {
                password: $("#email-password").val(),
                new_email: $("#new-email").val()
            },
            success: function(response, message, xhr) {
                if (response.meta.return_code == 0) {
                    localStorage.email = $("#new-email").val();
                    $("#user-email").val(localStorage.email);
                    loadToast("email_changed", 3500, "rounded");
                } else {
                    console.log("server says: " + response.meta.message);
                }
            }
        });
    });

    $("#update_username").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        $server.request({
            service: 'change-username',
            data: {
                password: $("#username-password").val(),
                new_username: $("#new-username").val()
            },
            success: function(response, message, xhr) {
                if (response.meta.return_code == 0) {
                    localStorage.login_name = $("#new-username").val();
                    $("#user-name").val(localStorage.login_name);
                    loadToast("username_changed", 3500, "rounded");
                } else {
                    console.log("server says: " + response.meta.message);
                }
            }
        });
    });

    $('#update_notifications').on('click', function(event) {
        // prevent automatic submission, we'll do it manually
        event.preventDefault();

        $server.request({
            service: 'toggle-email-notifications',
            data: {
                enable_notifications: $('#enable-notifications').is(':checked')
            },
            success: function(response, message, xhr) {
                if (response.meta.return_code == 0) {
                    localStorage.recieve_email_notifications =
                        $('#enable-notifications').is(':checked');
                    Materialize.toast(
                        "Email notifications updated", 
                        3500, 
                        'rounded'
                    );
                } else {
                    console.log('server says: ' + response.meta.message);
                }
            }
        })
    });

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});