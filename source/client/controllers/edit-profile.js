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
function onEditProfileViewReady(){
    //Link sessionStorage value to the required fields
    $("#user-name").val(sessionStorage.account_nickname);
    $("#user-id").val(sessionStorage.employee_num);
    $("#user-email").val(sessionStorage.email);
    $("#real-name").val(sessionStorage.first_name + " " + sessionStorage.last_name);

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
    $("#change_password").click(function(e){
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
    $("#change_email").click(function(e){
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
    $("#change_username").click(function(e){
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
    $("#update_password").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        oldPasswordIsValid = isRequiredTextAreaValid("#old-password") 
            && sha256($("#old-password").val()) == sessionStorage.login_password;
        newPasswordIsValid = isRequiredTextAreaValid("#new-password");
        checkPasswordIsValid = isRequiredTextAreaValid("#check-password");

        // First check; filled fields
        if(oldPasswordIsValid && newPasswordIsValid && checkPasswordIsValid){
            //Second check; both the new password and the check match
            if(passwordMatch()){
                //Third check; validate the user with its old password before
                //changing it on the database
                hashedPassword = sha256($("#new-password").val());
                $.ajax({
                    url: "/espresso/users/change-password",
                    method: "POST",
                    data: {
                        user_id: sessionStorage.id,
                        new_password: hashedPassword
                    },
                    dataType: "json",
                    cache: false,
                    success: function(response, message, xhr) {
                        if (response.meta.return_code == 0) {
                            sessionStorage.login_password = response.data.login_password;
                            loadToast("password_changed", 3500, "rounded");
                        } else {
                            console.log(
                                "server says: " + response.meta.message);
                        }
                    },
                    error: function(xhr, status, message) {
                        console.log("server says: " + status + ", " + message);
                    }
                })
            } else {
                loadToast("check_password",
                    3500, "rounded");
            }
        } else {
            loadToast("fill_fields",
                3500, "rounded");
        }
    });

    $("#update_email").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        hashedPassword = sha256($("#email-password").val());
        if (hashedPassword == sessionStorage.login_password) {
            $.ajax({
                url: "/espresso/users/change-email",
                method: "POST",
                data: {
                    user_id: sessionStorage.id,
                    new_email: $("#new-email").val()
                },
                dataType: "json",
                cache: false,
                success: function(response, message, xhr) {
                    if (response.meta.return_code == 0) {
                        sessionStorage.email = $("#new-email").val();
                        $("#user-email").val(sessionStorage.email);
                        loadToast("email_changed", 3500, "rounded");
                    } else {
                        console.log("server says: " + response.meta.message);
                    }
                },
                error: function(xhr, status, message) {
                    console.log("server says: " + status + ", " + message);
                }
            });
        } else {
            loadToast("invalid_password", 3500, "rounded");
        }
    });

    $("#update_username").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        hashedPassword = sha256($("#username-password").val());
        if (hashedPassword == sessionStorage.login_password) {
            $.ajax({
                url: "/espresso/users/change-username",
                method: "POST",
                data: {
                    user_id: sessionStorage.id,
                    new_username: $("#new-username").val()
                },
                dataType: "json",
                cache: false,
                success: function(response, message, xhr) {
                    if (response.meta.return_code == 0) {
                        sessionStorage.account_nickname = $("#new-username").val();
                        $("#user-name").val(sessionStorage.account_nickname);
                        loadToast("username_changed", 3500, "rounded");
                    } else {
                        console.log("server says: " + response.meta.message);
                    }
                },
                error: function(xhr, status, message) {
                    console.log("server says: " + status + ", " + message);
                }
            });
        } else {
            loadToast("invalid_password", 3500, "rounded");
        }
    });
}