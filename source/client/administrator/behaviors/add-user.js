function isRequiredTextAreaValid(id) {
    if ($(id).val().length == 0) {
        $(id).addClass("invalid");
        return false;
    }
    return true;
}
/************************************** */

// New permission generator

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

function addProgramSelect(maxPrivilege) {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "program_select");
    label.addClass("select_program");
    label.attr("for", "program_select");

    $server.request({
        service: 'list-programs-modules-logs',
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
        moduleTableBody.append(addLogEntry(log.id, log.name, 1, maxPrivilege));
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

function addPermissionTable(){
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

    /*$.ajax({
        url: '/espresso/privileges.json',
        success: function(xml) {
            for(var zone in xml.data.zones){
                addZone(xml.data.zones[zone]);
            }
            $('ul.tabs').tabs();
            $('.indicator').addClass("green");
            $('.collapsible').collapsible();
            changeLanguage(localStorage.defaultLanguage);
        }
    });*/
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

/*function addPrivilege(privilegeID, privilegeType, valueChecked){
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
}*/

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
    /*$.ajax({
        url: '/espresso/data/files/procedures.xml',
        success: function(xml){
            var name = $(xml).find('procedure').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find('name').text();
                $("#" + id).text(text);
            });
        }
    });*/
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

function checkDuplicate(valueToCheck, id, serv){
    var objectData;
    objectData = valueToCheck;
    console.log(objectData);
    $server.request({
        service: serv,
        data: objectData,
        success: function(response, message, xhr) {
            if (response.meta.return_code == 0) {
                if(response.data){
                    $(id).addClass("invalid");
                    $(id).removeClass("valid");
                    loadToast(
                        serv,
                        3500, "rounded"
                    );
                }
            } else {
                console.log("server says: " + response.meta.message);
            }
        }
    });
}

function roleSelect(selected) {
    $server.request({
        service: 'list-user-roles',
        success: function(response, message, xhr) {
            if(getLanguage() == "en") {
                $(".user_role").text("Choose the account role");
                $(".user_role_label").text("Account role");
                for(var role in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[role].id);
                    option.text(response.data[role].name);
                    $("#user-role").append(option);
                }
            } else if (getLanguage() == "es") {
                $(".user_role").text("Seleccione el tipo de cuenta");
                $(".user_role_label").text("Tipo de cuenta");
                for(var role in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[role].id);
                    switch(response.data[role].name){
                        case "Employee": option.text("Empleado"); break;
                        case "Administrator": option.text("Administrador"); break;
                        case "Supervisor": option.text("Supervisor"); break;
                        case "Manager": option.text("Gerente"); break;
                        case "Director": option.text("Director"); break;
                    }
                    $("#user-role").append(option);
                }
            }
            if(selected != null) {
                $("#user-role").val(selected);
            }
            $('select.readonly option:not(:selected)').attr('disabled',true);
            $('select').material_select();
        }
    });
}

$(function (){
    //addPermissionTable();
    //getProcedureNames();
    roleSelect();
    //addZoneSelect();
    //addProgramSelect();

    $('ul.tabs').tabs();
    $('.collapsible').collapsible();

    $("#login-name").focusout(function(e) {
        console.log("Check Login");
        checkDuplicate({login_name: $("#login-name").val()},
            "#login-name",
            "is-login-name-duplicated");
    });

    $("#email").focusout(function(e) {
        console.log("Check Email");
        checkDuplicate({email: $("#email").val()},
            "#email",
            "is-email-duplicated");
    });

    $("#user-id").focusout(function(e) {
        console.log("Check ID");
        checkDuplicate({employee_num: Number($("#user-id").val())},
            "#user-id",
            "is-employee-num-duplicated");
    });

    $("#login-name").keyup(function(e){
        $("#login-name").focusout();
    });

    $("#email").keyup(function(e){
        $("#email").focusout();
    });

    $("#user-id").keyup(function(e){
        $("#user-id").focusout();
    });

    // In this part we append the form necessary for the admin to add a new user
    // Only displaying the options that the user role needs
    $("#user-role").change(function(e) {
        hidePermissionForms();
        if($(this).val() == 3){
            addZoneSelect();
            addProgramSelect(2);
        }
        if($(this).val() == 4){
            addZoneSelect();
        }
        if($(this).val() == 5){
            addZoneSelect();
            addProgramSelect(3);
        }
    });

    // Send the new user information, privileges included, to the server
    $("#add_user").on('click', function(e){
        var userObject = new Object();
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();

        // Check for all the inputs to have a valid value entry. 
        // Otherwise, notify the user and mark the invalid inputs.

        // Since all fields are mandatory, we check if all of them have been 
        // filled

        var isUserValid = isRequiredTextAreaValid("#login-name");
        var isIDValid = isRequiredTextAreaValid("#user-id");
        var isNameValid = isRequiredTextAreaValid("#first-name");
        var isLastNameValid = isRequiredTextAreaValid("#last-name");
        var isEmailValid = isRequiredTextAreaValid("#email");
        var isPasswordValid = isRequiredTextAreaValid("#password");
        var isPasswordCheckValid = isRequiredTextAreaValid("#check-password");
        var doPasswordsMatch = 
            $('#password').val() == $('#check-password').val(); 

        // Check for invalid conditions
        // First, we check that all fields have been selected
        if (!isUserValid || !isIDValid || !isNameValid || !isLastNameValid
            || !isEmailValid || !isPasswordValid || !isPasswordCheckValid
            || !doPasswordsMatch) {
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
                            loadToast(
                                'user_registered', 3500, 'rounded'
                            );
                            setTimeout(function() {
                                    window.location.href = $root + 'view-users'
                                }, 
                            2500);
                        } else {
                            console.log('server says: ' + response.meta.message);
                        }
                    }
                });
            }
        }

        // With the inputs checked, we proceed to create the JSON user Object,
        // following the structure presented below
        //JSON Object Structure:
        /*
        {
            employee_num: int
            first_name: string
            last_name: string
            email: string [Must be a valid email address]
            login_name: string [must contain only letters a-z,
            A-Z and numbers 0-9]
            login_password: string
            privileges: Array<Privilege>
        }

        Privilege:
        {
            zone_id: int
            module_id: int
            privilege_id: int [Limited to 0 - None, 1 - Read, 2 - Write]
        }

        Example JSON Object
        {
            "employee_num":123456,
            "first_name":"John",
            "last_name":"Doe",
            "email":"john.doe@example.com",
            "login_name":"jdoe",
            "login_password":"pass1234",
            "privileges":[
                {
                    "zone_id":1,
                    "module_id":1,
                    "privilege_id":2
                },
                {
                    "zone_id":1,
                    "module_id":2,
                    "privilege_id":1
                }
            ]
        }
        */
    });

    changeLanguage(localStorage.defaultLanguage);
});
