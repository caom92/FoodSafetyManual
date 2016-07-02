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
$app.behaviors['edit-profile'] = function() {
    //Link localStorage value to the required fields
    $("#user-name").val(localStorage.login_name);
    $("#user-id").val(localStorage.employee_num);
    $("#user-email").val(localStorage.email);
    $("#real-name").val(localStorage.first_name + " " + localStorage.last_name);

    //Hide the form fields that belong to changing account information
    $("#change_password_wrapper").hide();
    $("#change_email_wrapper").hide();
    $("#change_username_wrapper").hide();

    //Form show/hide logic
    //Flags for show/hide status
    var password_flag = false;
    var email_flag = false;
    var username_flag = false;

    //For password form
    $("#change_password").on('click', function(e){
        if(password_flag){
            $("#change_password_wrapper").hide(700);
            $("#password_icon").text("keyboard_arrow_down");
            password_flag = !password_flag;
        } else {
            $("#change_password_wrapper").show(700);
            $("#password_icon").text("keyboard_arrow_up");
            password_flag = !password_flag;
            $("#change_email_wrapper").hide(700);
            $("#email_icon").text("keyboard_arrow_down");
            email_flag = false;
            $("#change_username_wrapper").hide(700);
            $("#username_icon").text("keyboard_arrow_down");
            username_flag = false;
        }        
    });

    //For email form
    $("#change_email").on('click', function(e){
        if(email_flag){
            $("#change_email_wrapper").hide(700);
            $("#email_icon").text("keyboard_arrow_down");
            email_flag = !email_flag;
        } else {
            $("#change_email_wrapper").show(700);
            $("#email_icon").text("keyboard_arrow_up");
            email_flag = !email_flag;
            $("#change_password_wrapper").hide(700);
            $("#password_icon").text("keyboard_arrow_down");
            password_flag = false;
            $("#change_username_wrapper").hide(700);
            $("#username_icon").text("keyboard_arrow_down");
            username_flag = false;
        }        
    });

    //For username form
    $("#change_username").on('click', function(e){
        if(username_flag){
            $("#change_username_wrapper").hide(700);
            $("#username_icon").text("keyboard_arrow_down");
            username_flag = !username_flag;
        } else {
            $("#change_username_wrapper").show(700);
            $("#username_icon").text("keyboard_arrow_up");
            username_flag = !username_flag;
            $("#change_email_wrapper").hide(700);
            $("#email_icon").text("keyboard_arrow_down");
            email_flag = false;
            $("#change_password_wrapper").hide(700);
            $("#password_icon").text("keyboard_arrow_down");
            password_flag = false;
        }        
    });


    // Validate the password fields before changing it on the database
    $("#update_password").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        oldPasswordIsValid = isRequiredTextAreaValid("#old-password") 
            && hash($("#old-password").val()) == localStorage.login_password;
        newPasswordIsValid = isRequiredTextAreaValid("#new-password");
        checkPasswordIsValid = isRequiredTextAreaValid("#check-password");

        // First check; filled fields
        if(oldPasswordIsValid && newPasswordIsValid && checkPasswordIsValid){
            //Second check; both the new password and the check match
            if(passwordMatch()){
                //Third check; validate the user with its old password before
                //changing it on the database
                hashedPassword = hash($("#new-password").val());
                $server.request({
                    service: 'change-password',
                    data: {
                        new_password: hashedPassword
                    },
                    success: function(response, message, xhr) {
                        if (response.meta.return_code == 0) {
<<<<<<< HEAD:source/client/behaviors/edit-profile.js
                            localStorage.login_password = hashedPassword;
                            Materialize.toast("La contraseña se cambió exitosamente", 3500, "rounded");
=======
                            sessionStorage.login_password = response.data.login_password;
                            loadToast("password_changed", 3500, "rounded");
>>>>>>> miracle:source/client/controllers/edit-profile.js
                        } else {
                            console.log(
                                "server says: " + response.meta.message);
                        }
                    }
                });
            } else {
                loadToast("check_password",
                    3500, "rounded");
            }
        } else {
            loadToast("fill_fields",
                3500, "rounded");
        }
    });

    $("#update_email").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        hashedPassword = hash($("#email-password").val());
        if (hashedPassword == localStorage.login_password) {
            $server.request({
                service: 'change-email',
                data: {
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
        } else {
            loadToast("invalid_password", 3500, "rounded");
        }
    });

    $("#update_username").on('click', function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        hashedPassword = hash($("#username-password").val());
        if (hashedPassword == localStorage.login_password) {
            $server.request({
                service: 'change-username',
                data: {
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
        } else {
            loadToast("invalid_password", 3500, "rounded");
        }
    });

    // change the language being displayed
    changeLanguage(localStorage.defaultLanguage);
}