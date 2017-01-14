function isRequiredTextAreaValid(id, length) {
    if(Math.floor(length) == length && $.isNumeric(length) && Number(length) > 0){
        if ($(id).val().length < Number(length)) {
            $(id).addClass("invalid");
            loadToast("min_length", 3500, "rounded", null, length);
            return false;
        }
    } else {
        if ($(id).val().length == 0) {
            $(id).addClass("invalid");
            loadToast("min_length", 3500, "rounded", null , 1);
            return false;
        }
    }
    return true;
}

function passwordMatch(password, passwordCheck){
    if($(password).val() === $(passwordCheck).val()){
        return true;
    } else {
        $(passwordCheck).addClass("invalid");
        return false;
    }
}

function hidePermissionForms(){
    $("#privilege_header").hide();
    $("#zone_select_wrapper").html("");
    $("#zone_select_wrapper").parent().hide();
    $("#program_select_wrapper").html("");
    $("#program_select_wrapper").parent().hide();
    $("#program_collapsible").html("");
    $("#program_collapsible").parent().hide();
    $("#log_select_wrapper").parent().hide();
}

function addZoneSelect() {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "zone_select");
    label.addClass("select_zone");
    label.attr("for", "zone_select");

    $server.request({
        service: 'list-zones',
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var zone of response.data) {
                    var option = $("<option>");
                    option.attr("value", zone.id);
                    option.append(zone.name);
                    select.append(option);
                }
                $("#zone_select_wrapper").append(select);
                $("#zone_select_wrapper").append(label);
                $("#zone_select_wrapper").parent().show();
                $("#privilege_header").show();
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addProgramSelect(maxPrivilege, employeeNum) {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "program_select");
    label.addClass("select_program");
    label.attr("for", "program_select");

    var data = new Object();
    data.employee_num = employeeNum;

    $server.request({
        service: 'get-privileges-of-employee',
        data: data,
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var program of response.data) {
                    var option = $("<option>");
                    option.attr("value", program.id);
                    option.append(program.name);
                    select.append(option);
                }
                addModulesCollapsible(response.data, maxPrivilege);
                $("#program_select_wrapper").append(select);
                $("#program_select_wrapper").append(label);
                $("#program_select_wrapper").parent().show();
                $("#privilege_header").show();
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

// This functions add a collapsible for a collection of 

function addModulesCollapsible(programs, maxPrivilege){
    for(var program of programs){
        for(var module of program.modules){
            var logsArray = [];
            for(var log of module.logs){
                logsArray.push(log);
            }
            $("#program_collapsible").append(addModuleWrapper(null, null, addModuleHeader(null, null, module.name),
             addModuleBody(null, null, logsArray, maxPrivilege)));
        }
    }
    $("#log_select_wrapper").parent().show();
    $("#program_collapsible").parent().show();
    /*var wrapper = $("<ul>");

    wrapper.addClass("collapsible");
    wrapper.attr("data-collapsible", "accordion");*/
}

function addModuleWrapper(id, classes, header, body){
    var wrapper = $("<li>");

    if(id)
        wrapper.attr("id", id);

    wrapper.addClass(classes);

    var cHeader = $("<div>");
    var cBody = $("<div>");

    cHeader.addClass("collapsible-header");
    cBody.addClass("collapsible-body");

    cHeader.append(header);
    cBody.append(body);

    wrapper.append(cHeader);
    wrapper.append(cBody);

    return wrapper;

    //$("#program_collapsible").append(wrapper);
}

function addModuleHeader(id, classes, programName){
    var header = $("<div>");
    var icon = $('<i class="mdi mdi-wrench md-18"></i>');
    var title = programName;

    if(id)
        header.attr("id", id);

    header.addClass(classes);

    header.append(icon);
    header.append(programName);

    return header;
}

// Logs is a collection of log

function addModuleBody(id, classes, logs, maxPrivilege){
    var moduleTable = $("<table>");

    if(id)
        moduleTable.attr("id", id);

    moduleTable.addClass("centered striped");
    moduleTable.addClass(classes);

    moduleTableHeader = $("<thead>");

    header = $("<tr>");

    headName = $("<th>");
    headName.addClass("name");
    headNone = $("<th>");
    headNone.addClass("none");
    headRead = $("<th>");
    headRead.addClass("read");
    header.append(headName, headNone, headRead);
    if(maxPrivilege != 2){
        headWrite = $("<th>");
        headWrite.addClass("write");
        header.append(headWrite);
    }

    moduleTableHeader.append(header);

    moduleTableBody = $("<tbody>");

    for (var log of logs) {
        moduleTableBody.append(addLogEntry(log.id, log.name, log.privilege_id, maxPrivilege));
    }

    moduleTable.append(moduleTableHeader);
    moduleTable.append(moduleTableBody);

    return moduleTable;
}

function addLogEntry(logID, logName, valueChecked, maxPrivilege){
    var row;

    row = $("<tr>");
    log = $("<td>");

    log.text(logName);
    log.addClass("privilege");
    log.data("log", logID);

    privilegeNone = addPrivilege(logID, 1, valueChecked);
    privilegeRead = addPrivilege(logID, 2, valueChecked);
    privilegeWrite = addPrivilege(logID, 3, valueChecked);

    row.append(log);

    row.append(privilegeNone);
    row.append(privilegeRead);

    if(maxPrivilege != 2){
        row.append(privilegeWrite);
    }

    row.data("original_privilege", valueChecked);
    
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

// This function creates a table containing all the modules from all the
// procedures for all the zones

/*function addPermissionTable(){
    //First we request the information from the server
    $server.request({
        service: 'list-zones-programs-modules-privileges',
        success: function(response) {
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
}*/

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
                        case "Employee": 
                            option.text("Empleado"); 
                        break;

                        case "Administrator": 
                            option.text("Administrador"); 
                        break;

                        case "Supervisor": option.text("Supervisor"); break;
                        case "Manager": option.text("Gerente"); break;
                        case "Director": option.text("Director"); break;

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
            $('select.readonly option:not(:selected)').attr('disabled',true);
            $('select').material_select();
            var role = parseInt($("#user-role").val());
            hidePermissionForms();
            if(role == 3){
                addZoneSelect();
                addProgramSelect(2, parseInt($("#user-id").val()));
            }
            if(role == 4){
                addZoneSelect();
            }
            if(role == 5){
                addZoneSelect();
                addProgramSelect(3, parseInt($("#user-id").val()));
            }
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
        service: 'get-privileges-of-employee',
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
                $("#user-id").data("user_id", user.id);
                $("#first-name").val(user.first_name);
                $("#last-name").val(user.last_name);
                $("label").addClass("active");
                $(".password").removeClass("active");
                $(".user_role_label").removeClass("active");
                roleSelect(user.role_name);
            } else {
                // Considering a non valid userID was entered, we go back to
                // view users
                window.location.href = $root + 'view-users';
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
    changeLanguage(localStorage.defaultLanguage);

    $('ul.tabs').tabs();
    $('.collapsible').collapsible();

    //To change the permissions related to user's role
    $("#user-role").change(function(e) {
        var data = new Object();
        data.user_id = get.user_id;
        data.role_id = parseInt($("#user-role").val());
        $server.request({
            service: 'edit-user-role',
            data: data,
            success: function(response){
                if (response.meta.return_code == 0){
                    Materialize.toast("El rol del usuario ha sido modificado", 3500, "rounded");
                }
            }
        });
        hidePermissionForms();
        if($(this).val() == 3){
            addZoneSelect();
            addProgramSelect(2, parseInt($("#user-id").val()));
        }
        if($(this).val() == 4){
            addZoneSelect();
        }
        if($(this).val() == 5){
            addZoneSelect();
            addProgramSelect(3, parseInt($("#user-id").val()));
        }
    });

    $("#update_password").on('click', function(e) {
        e.preventDefault();
        var adminPasswordIsValid = isRequiredTextAreaValid("#admin-password") 
        var newPasswordIsValid = isRequiredTextAreaValid("#new-password");
        var checkPasswordIsValid = isRequiredTextAreaValid("#check-password");

        if(adminPasswordIsValid && newPasswordIsValid && checkPasswordIsValid){
            if(passwordMatch("#new-password", "#check-password")){
                var data = new Object();
                data.password = $("#admin-password").val();
                data.new_password = $("#new-password").val();
                data.user_id = $("#user-id").data("user_id");
                console.log(data);
                $server.request({
                    service: 'change-password',
                    data: data,
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
                loadToast("check_password", 3500, "rounded");
            }
        } else {
            loadToast("fill_fields", 3500, "rounded");
        }
    });

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
                userObject.privileges = new Array();

                // Read the privilege list
                $(".privilege").each(function(e){
                    var log = $(this).data("log");
                    var privilege = $('input[name=' + log + ']:checked').val();
                    if($(this).parent().data("original_privilege") != parseInt(privilege)){
                        var privilegeObject = new Object();
                        privilegeObject.privilege_id = privilege;
                        privilegeObject.log_id = log;
                        userObject.privileges.push(privilegeObject);
                    }
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