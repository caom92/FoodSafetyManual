function getUserPrivileges(userID){
    var data = new Object();
    data.user_id = userID;
    $server.request({
        service: 'get-user-privileges',
        data: data,
        success: function(response, message, xhr) {
            console.log(response);
        }
    });
}

function fillUserInformation(userID){
    /*
    var data = new Object();
    data.user_id = userID;
    $server.request({
        service: 'service-name',
        data: data,
        success: function(response, message, xhr) {
            if (response.meta.return_code == 0) {
                var user = response.data;
                $("#login-name").val(user.login_name);
                $("#user-id").val(user.employee_num);
                $("#first-name").val(user.first_name);
                $("#last-name").val(user.last_name);
                $("#email").val(user.email);
                $("label").addClass("active");
                $(".user_role_label").removeClass("active");
                roleSelect(user.role_id);
            } else {
                // Considering a non valid userID was entered, we go back to
                // view users
                window.location.href = '/espresso/view-users';
            }
        }
    });
    */
    console.log("Entered");
    $.ajax({
        url: $root + '/user.json',
        success: function(data) {
            $("#login-name").val(data.login_name);
            $("#user-id").val(data.employee_num);
            $("#first-name").val(data.first_name);
            $("#last-name").val(data.last_name);
            $("#email").val(data.email);
            $("label").addClass("active");
            $(".user_role_label").removeClass("active");
            roleSelect(data.role_id);
        }
    });
}

$app.behaviors['edit-user'] = function (){
    var get = getURLQueryStringAsJSON();

    fillUserInformation(get.user_id);
    addPermissionTable();
    getProcedureNames();

    $('ul.tabs').tabs();
    $('.collapsible').collapsible();

    // Send the new user information, privileges included, to the server
    $("#edit_user").on('click', function(e){
        var userObject = new Object();
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();

        // Check for invalid conditions
        // First, we check that all fields have been selected
        if (!isUserValid || !isIDValid || !isNameValid || !isLastNameValid
            || !isEmailValid || !isPasswordValid || !isPasswordCheckValid) {
            loadToast("incorrect_fields", 
                3500, "rounded");
        } else {
            // We check for any invalid classes in the username, ID and email
            // HTML elements. In such a case, we cannot proceed
            var isNameDuplicate = $("#login-name").hasClass("invalid");
            var isEmailDuplicate = $("#email").hasClass("invalid");
            var isIDDuplicate = $("#user-id").hasClass("invalid");

            if(isNameDuplicate || isEmailDuplicate || isIDDuplicate){
                loadToast("duplicated_fields", 3500, "rounded");
            } else {
                // Proceed to send request

                // Build the user object
                userObject.employee_num = Number($("#user-id").val());
                userObject.first_name = $("#first-name").val();
                userObject.last_name = $("#last-name").val();
                userObject.email = $("#email").val();
                userObject.role_id = $("#user-role").val();
                userObject.login_name = $("#login-name").val();
                userObject.login_password = $("#password").val();
                userObject.privileges = new Array();

                // Read the privilege list
                $(".privilege").each(function(e){
                    var zone = $(this).data("zone");
                    var module = $(this).data("module");
                    var radioGroup = $(this).attr("id");
                    var privilege = $('input[name=' + radioGroup + ']:checked').val();
                    var privilegeObject = new Object();
                    privilegeObject.zone_id = zone;
                    privilegeObject.module_id = module;
                    privilegeObject.privilege_id = privilege;
                    userObject.privileges.push(privilegeObject);
                });

                //var userObjectString = JSON.stringify(userObject);

                console.log(userObject);

                // Send the user object to the server, requesting an user add
                $server.request({
                    service: 'add-user',
                    data: userObject,
                    success: function(response) {
                        if (response.meta.return_code == 0) {
                            Materialize.toast(
                                'User resgistered successfully', 3500, 'rounded'
                            );
                            setTimeout(function() {
                                    window.location.href = '/espresso/view-users'
                                }, 
                            2500);
                        } else {
                            console.log('server says: ' + response.meta.message);
                        }
                    }
                });
            }
        }
    });
}