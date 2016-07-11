// This function creates a table containing all the modules from all the
// procedures for all the zones

function addPermissionTable(){
    //First we request the information from the server
    $.ajax({
        url: '/espresso/privileges.json',
        success: function(xml) {
            for(var zone in xml.data.zones){
                addZone(xml.data.zones[zone]);
            }
            $('ul.tabs').tabs();
            $('.indicator').addClass("green");
            $('.collapsible').collapsible();
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
    icon = $('<i class="material-icons md-16 field-icon" id="password_icon">keyboard_arrow_down</i>');

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
            1)
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

// Result

/*
id = Program id number
<tr>
    <td id="id"></td>
    <td>
        <input checked="checked" value="0" id="id_none" name="id" type="radio">
        <label for="id_none"></label>
    </td>
    <td>
        <input value="1" id="id_read" name="id" type="radio">
        <label for="id_read"></label>
    </td>
    <td>
        <input value="2" id="id_write" name="id" type="radio">
        <label for="id_write"></label>
    </td>
</tr>
*/

function getProcedureNames(){
    $.ajax({
        url: '/espresso/data/files/procedures.xml',
        success: function(xml){
            var name = $(xml).find('procedure').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find('name').text();
                $("#" + id).text(text);
            });
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

$app.behaviors['add-user'] = function (){
    addPermissionTable();
    getProcedureNames();

    $('ul.tabs').tabs();
    $('.collapsible').collapsible();

    // Send the new user information, privileges included, to the server
    $("#add_user").on('click', function(e){
        var userObject = new Object();
        // prevent authomatic submission, we'll do it manually
        e.preventDefault();

        // Check for all the inputs to have a valid value entry. 
        // Otherwise, notify the user and mark the invalid inputs.

        // TODO

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

        userObject.employee_num = Number($("#user-id").val());
        userObject.first_name = $("#first-name").val();
        userObject.last_name = $("#last-name").val();
        userObject.email = $("#email").val();
        userObject.login_name = $("#login-name").val();
        userObject.login_password = $("#password").val();
        userObject.privileges = new Array();

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

        // Temporarily, notify with an "lolmao" that this function has been
        // succesfully called
        Materialize.toast(
            "Lolmao", 3500, "rounded"
        );

        console.log(JSON.stringify(userObject));
    });

    changeLanguage(localStorage.defaultLanguage);
}
