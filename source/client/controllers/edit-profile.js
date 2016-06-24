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
function onEditProfileViewReady(){
    //Link sessionStorage value to the required fields
    $("#user-name").val(sessionStorage.login_name);
    $("#user-id").val(sessionStorage.employee_id_num);
    $("#user-email").val(sessionStorage.email);
    $("#real-name").val(sessionStorage.full_name);

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
        oldPasswordIsValid = isRequiredTextAreaValid("#old-password");
        newPasswordIsValid = isRequiredTextAreaValid("#new-password");
        checkPasswordIsValid = isRequiredTextAreaValid("#check-password");

        // First check; filled fields
        if(oldPasswordIsValid && newPasswordIsValid && checkPasswordIsValid){
            //Second check; both the new password and the check match
            if(passwordMatch()){
                //Third check; validate the user with its old password before
                //changing it on the database
                Materialize.toast("Campos validos, pero la implementacion no está terminada",
                    3500, "rounded");
            } else {
                Materialize.toast("La contraseña y la verificación no coinciden",
                    3500, "rounded");
            }
        } else {
            Materialize.toast("Por favor llene todos los campos",
                3500, "rounded");
        }
    });

    $("#update_email").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form

        Materialize.toast("Por implementar: Modificación de correo", 
            3500, "rounded");
    });

    $("#update_username").click(function(e) {
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form

        Materialize.toast("Por implementar: Modificación de nombre de usuario", 
            3500, "rounded");
    });
}