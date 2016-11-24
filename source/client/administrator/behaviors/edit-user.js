function addPermissionTable(){
    //First we request the information from the server
    var get = getURLQueryStringAsJSON();
    var data = new Object();
    data.employee_num = get.user_id;
    $server.request({
        service: 'get-privileges-of-employee',
        data: data,
        success: function(response) {
            console.log(response);
            if (response.meta.return_code == 0) {
                for (var zone of response.data.zones) {
                    addZone(zone);
                }
                $('ul.tabs').tabs();
                $('.indicator').addClass("green");
                $('.collapsible').collapsible();
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function roleSelect(selected) {
    $server.request({
        service: 'list-user-roles',
        success: function(response, message, xhr) {
            var isSpanish = getLanguage() == 'es';

            if (isSpanish) {
                $(".user_role").text("Seleccione el tipo de cuenta");
                $(".user_role_label").text("Tipo de cuenta");
            } else {
                $(".user_role").text("Choose the account role");
                $(".user_role_label").text("Account role");
            }

            for(var role in response.data) {
                var option = $("<option>");
                option.attr("value", response.data[role].id);
                if (isSpanish) {
                    switch(response.data[role].name) {
                        case "Emplyee": 
                            option.text("Empleado"); 
                        break;

                        case "Administrator": 
                            option.text("Administrador"); 
                        break;

                        default:
                            option.text(response.data[role].name);
                        break;
                    }
                } else {
                    option.text(response.data[role].name);
                }
                if (selected == response.data[role].name) {
                    option.attr('selected', true);
                }
                $("#user-role").append(option);
            }
            // if(getLanguage() == "en") {
            //     $(".user_role").text("Choose the account role");
            //     $(".user_role_label").text("Account role");
            //     for(var role in response.data){
            //         var option = $("<option>");
            //         option.attr("value", response.data[role].id);
            //         option.text(response.data[role].name);
            //         $("#user-role").append(option);
            //     }
            // } else if (getLanguage() == "es") {
            //     $(".user_role").text("Seleccione el tipo de cuenta");
            //     $(".user_role_label").text("Tipo de cuenta");
            //     for(var role in response.data){
            //         var option = $("<option>");
            //         option.attr("value", response.data[role].id);
            //         switch(response.data[role].name){
            //             case "Emplyee": option.text("Empleado"); break;
            //             case "Administrator": option.text("Administrador"); break;
            //         }
            //         $("#user-role").append(option);
            //     }
            // }
            // if(selected != null) {
            //     $("#user-role").val(selected);
            // }
            $('select.readonly option:not(:selected)').attr('disabled',true);
            $('select').material_select();
        }
    });
}

function getProcedureNames(){
    $server.request({
        service: 'list-programs',
        cache: true,
        success: function(response){
            if (response.meta.return_code == 0) {
                for (var program of response.data) {
                    var id = program.id;
                    var text = program.name;
                    $("#" + id).text(text);
                }
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addZone(zone){
    var zoneTab;
    var zoneContainer;

    zoneTab = $("<li>");
    zoneTab.attr("class", "tab col s3");
    zoneTab.append('<a class="green-text" href="#' + zone.name + '">' + zone.name+ '</a></li>');
    $("#tabs_wrapper").append(zoneTab);

    zoneContainer = $("<ul class='collapsible' data-collapsible='expandable'>");
    zoneContainer.attr("id", zone.name);
    zoneContainer.addClass("col s12");

    for(var program in zone.programs){
        zoneContainer.append(addProcedure(zone.programs[program], zone.id, zone.name));
    }

    $("#zones_wrapper").append(zoneContainer);
}

function addProcedure(procedureObject, zoneID, zoneName){
    var procedure = $("<li class='proceduretable'>");

    var headerWrapper;
    var header;
    var title;
    var icon;

    header = $("<div class='collapsible-header'>");
    wrapper = $("<div>");
    icon = $('<i class="mdi mdi-chevron-down md-32 field-icon"></i>');
    wrapper.text(procedureObject.name);
    header.append(icon);
    header.append(wrapper);

    var tableWrapper;
    var table;
    var tableHead;
    var tableHeadRow;
    var tableBody;

    tableWrapper = $("<div class='collapsible-body'>");
    table = $("<table>");
    tableHead = $("<thead>");
    tableBody = $("<tbody>");
    tableHeadRow = $("<tr>");

    table.attr("id", procedureObject.name + "_table");
    table.attr("class", "striped bordered centered");

    tableHead.attr("id", procedureObject.name + "_header");

    tableBody.attr("id", procedureObject.name + "_body");

    tableHeadRow.append($("<th>").attr("class", "name"));
    tableHeadRow.append($("<th>").attr("class", "none"));
    tableHeadRow.append($("<th>").attr("class", "read"));
    tableHeadRow.append($("<th>").attr("class", "write"));

    for(var module in procedureObject.modules){
        tableBody.append(addModule(
            procedureObject.modules[module].id,
            procedureObject.id,
            zoneID,
            zoneName,
            procedureObject.modules[module].name,
            procedureObject.modules[module].privilege.id)
        );
    }

    tableHead.append(tableHeadRow);

    table.append(tableHead);
    table.append(tableBody);
    tableWrapper.append(table);

    procedure.append(header);
    procedure.append(tableWrapper);

    return procedure;
}

function addModule(moduleID, procedureID, zoneID, zoneName, moduleName, valueChecked){
    var row;
    var module;
    var privilegeNone;
    var privilegeRead;
    var privilegeWrite;

    row = $("<tr>");
    module = $("<td>");

    module.attr("id", zoneName + moduleID);
    module.text(moduleName);
    module.addClass("privilege");
    module.data("zone", zoneID);
    module.data("program", procedureID);
    module.data("module", moduleID);

    privilegeNone = addPrivilege(zoneName + moduleID, 1, valueChecked);
    privilegeRead = addPrivilege(zoneName + moduleID, 2, valueChecked);
    privilegeWrite = addPrivilege(zoneName + moduleID, 3, valueChecked);

    row.append(module);
    row.append(privilegeNone);
    row.append(privilegeRead);
    row.append(privilegeWrite);

    return row;
}

function addPrivilege(privilegeID, privilegeType, valueChecked){
    var privilege;

    privilege = $("<td>");
    privilege.append(addPrivilegeInput(privilegeID, privilegeType, valueChecked));
    privilege.append(addPrivilegeLabel(privilegeID, privilegeType));

    return privilege;
}

function addPrivilegeInput(privilegeID, privilegeType, valueChecked){
    var input = $("<input>");

    input.attr("name", privilegeID);
    input.attr("type", "radio");
    input.attr("id", privilegeID + "_" + privilegeType);
    input.attr("value", privilegeType);

    if(privilegeType == valueChecked){
        input.attr("checked", "checked");
    }

    // Result input
    // <input value="0" id="privilegeID_0" name="privilegeID" type="radio">

    return input;
}

function addPrivilegeLabel(privilegeID, privilegeType){
    var label = $("<label>");

    label.attr("for", privilegeID + "_" + privilegeType);

    // Result label
    // <label for="privilegeID"></label>

    return label;
}

function getProcedureNames(){
    $server.request({
        service: 'list-programs',
        cache: true,
        success: function(response){
            if (response.meta.return_code == 0) {
                for (var program of response.data) {
                    var id = program.id;
                    var text = program.name;
                    $("#" + id).text(text);
                }
            } else {
                throw response.meta.message;
            }
        }
    });
}

function showPrivileges(){
    var privilegeObject;
    
    $(".privilege").each(function(e){
        var zone = $(this).data("zone");
        var program = $(this).data("program");
        var module = $(this).data("module");
        var radioGroup = $(this).attr("id");
        var privilege = $('input[name=' + radioGroup + ']:checked').val();
        console.log("Zona: " + zone + "\nPrograma: " + program + "\nModulo: " + module + "\nPrivilegio: " + privilege);
    });
}

/************************************************************* */

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
    var data = new Object();
    data.employee_num = userID;
    $server.request({
        service: 'get-employee-info',
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
                roleSelect(user.role_name);
            } else {
                // Considering a non valid userID was entered, we go back to
                // view users
                window.location.href = '/espresso/view-users';
            }
        }
    });
    console.log("Entered");
    /*$.ajax({
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
    });*/
}

$(function (){
    var get = getURLQueryStringAsJSON();

    fillUserInformation(get.user_id);
    addPermissionTable();
    //getProcedureNames();
    changeLanguage(localStorage.defaultLanguage);

    $('ul.tabs').tabs();
    $('.collapsible').collapsible();

    // Send the new user information, privileges included, to the server
    $("#edit_user").on('click', function(e){
        var userObject = new Object();
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();

        // Check for invalid conditions
        // First, we check that all fields have been selected
        // if (!isUserValid || !isIDValid || !isNameValid || !isLastNameValid
        //     || !isEmailValid || !isPasswordValid || !isPasswordCheckValid) {
        //     loadToast("incorrect_fields", 
        //         3500, "rounded");
        // } else {
            // We check for any invalid classes in the username, ID and email
            // HTML elements. In such a case, we cannot proceed
            // var isNameDuplicate = $("#login-name").hasClass("invalid");
            // var isEmailDuplicate = $("#email").hasClass("invalid");
            // var isIDDuplicate = $("#user-id").hasClass("invalid");

            // if(isNameDuplicate || isEmailDuplicate || isIDDuplicate){
            //     loadToast("duplicated_fields", 3500, "rounded");
            // } else {
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
                Materialize.toast(
                    'Coming Soon', 3500, 'rounded'
                );
                // $server.request({
                //     service: 'add-user',
                //     data: userObject,
                //     success: function(response) {
                //         if (response.meta.return_code == 0) {
                //             Materialize.toast(
                //                 'User resgistered successfully', 3500, 'rounded'
                //             );
                //             setTimeout(function() {
                //                     window.location.href = '/espresso/view-users'
                //                 }, 
                //             2500);
                //         } else {
                //             console.log('server says: ' + response.meta.message);
                //         }
                //     }
                // });
            //}
        //}
    });
});