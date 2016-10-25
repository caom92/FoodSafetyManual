function addZoneSelect(){
    $server.request({
        service: 'list-zones',
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                var select = $("<select>");
                select.attr("id", "zone-select");
                select.append('<option value="" disabled selected class="select_zone"></option>');
                for(var zone in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[zone].id);
                    option.html(response.data[zone].name);
                    select.append(option);
                }
                $("#content_wrapper").append(select);
                $("#zone-select").change(function (e) {
                    $("#program-select").material_select('destroy');
                    $("#program-select").remove();
                    $("#module-select").material_select('destroy');
                    $("#module-select").remove();
                    $("table").remove();
                    addProgramSelect($(this).val());
                });
                changeLanguage(localStorage.defaultLanguage);
                $('select').material_select();
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addProgramSelect(zoneID){
    $server.request({
        service: 'list-programs',
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                var select = $("<select>");
                select.attr("id", "program-select");
                select.append('<option value="" disabled selected class="select_program"></option>');
                for(var zone in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[zone].id);
                    option.html(response.data[zone].name);
                    select.append(option);
                }
                $("#content_wrapper").append(select);
                $("#program-select").change(function (e) {
                    $("#module-select").material_select('destroy');
                    $("#module-select").remove();
                    $("table").remove();
                    addModuleSelect($(this).val());
                });
                changeLanguage(localStorage.defaultLanguage);
                $('select').material_select();
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addModuleSelect(programID){
    var data = new Object();
    data.program_id = programID;

    $server.request({
        service: 'get-modules-of-program',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                var select = $("<select>");
                select.attr("id", "module-select");
                select.append('<option value="" disabled selected class="select_module"></option>');
                for(var zone in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[zone].id);
                    option.html(response.data[zone].name);
                    select.append(option);
                }
                $("#content_wrapper").append(select);
                $("#module-select").change(function (e) {
                    $("table").remove();
                    loadInventory($(this).val(), $("#zone-select").val());
                });
                changeLanguage(localStorage.defaultLanguage);
                $('select').material_select();
            } else {
                console.log("ERROR");
                throw response.meta.message;
            }
        }
    });
}

function inventorySearchRow(){
    var row = $("<tr>");
    row.append($("<td class='dynamic-search'>").html(textInput("id-search", "id_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("name-search", "name_search")));
    row.append($("<td>"));
    return row;
}

function textInput(id, classes){
    return '<input id="' + id + '" type="text" class="validate ' + classes + '">';
}

function dynamicSearchBind(input, column){
    function isBound(input){
        return input.is('[class*="bound-by-"');
    }
    
    $("#" + input).keyup(function (e) {
        $("." + column).each(function (e) {
            if($(this).text().search($("#" + input).val()) != -1){
                if(isBound($(this).parent())){
                    $(this).parent().removeClass("bound-by-" + input);
                    if(!isBound($(this).parent())){
                        $(this).parent().attr("style", "");
                    }
                }
            } else {
                $(this).parent().attr("style", "display:none;");
                $(this).parent().addClass("bound-by-" + input);
            }
        });
    });
}

function loadInventory(moduleID, zoneID){
    var data = new Object();
    data.zone_id = zoneID;
    data.module_id = moduleID;
    console.log(data);

    $server.request({
        service: 'get-modules-of-program',
        data: data,
        success: function(response){
            console.log(response);
            $("#content_wrapper").append(inventoryTable(response));

            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");

            changeLanguage(localStorage.defaultLanguage);
            loadSearchSuggestions(localStorage.defaultLanguage);
        }
    });
}

function inventoryTable(inventory){
    var table = $("<table>");
    var tableBody = $("<tbody>");
    table.addClass("striped");
    table.append(inventoryHeader());
    tableBody.append(inventorySearchRow());
    for(var element in inventory.inventory){
        console.log(inventory.inventory[element]);
        tableBody.append(inventoryRow(inventory.inventory[element]));
    }
    tableBody.append(inventoryAddRow());
    table.append(tableBody);
    return table;
}

function inventoryHeader(){
    var header = $("<thead>");
    var headerRow = $("<tr>");
    headerRow.append($('<th data-field="id" class="inventory_id"></th>'));
    headerRow.append($('<th data-field="name" class="inventory_name"></th>'));
    headerRow.append($('<th data-field="edit" class="inventory_dismiss"></th>'));
    header.append(headerRow);
    return header;
}

function inventoryRow(element){
    console.log(element);
    var row = $("<tr>");
    var activeButton = $('<a class="green btn waves-effect waves-light dismiss-button"></a>');
    var inactiveButton = $('<a class="grey btn accept-button"></a>');
    var buttonColumn = $("<td>");

    activeButton.click(function(e){
        e.preventDefault();
        var userID = $(this).parent().parent().children(".id-column").text();
        $(this).parent().parent().addClass("grey-text");
        $(this).parent().children('.accept-button').show();
        $(this).parent().children('.dismiss-button').hide();
        console.log(userID);
    });

    inactiveButton.click(function(e){
        e.preventDefault();
        var userID = $(this).parent().parent().children(".id-column").text();
        $(this).parent().parent().removeClass("grey-text");
        $(this).parent().children('.accept-button').hide();
        $(this).parent().children('.dismiss-button').show();
        console.log(userID);
    });

    row.addClass("");
    row.append($("<td class='id-column search-column'>").text(element.id));
    row.append($("<td class='name-column search-column'>").text(element.name));
    if(element.status){
        inactiveButton.hide();
    } else {
        row.addClass("grey-text");
        activeButton.hide();
    }
    buttonColumn.append(activeButton);
    buttonColumn.append(inactiveButton);
    row.append(buttonColumn);
    return row;
}

function inventoryAddRow(){
    var row = $("<tr class='add-row'>");
    var idInput = $("<td>");
    var nameInput = $("<td>");
    var addButton = $("<td>");

    nameInput.append(textInput("name_add", ""));
    addButton.append(addInventoryButton());

    addButton.click(function(){
        // First we must send the new element name, we get back both the name and ID
        // This part should be covered on a server service
        // We must append it to the current view; future views will load it on 
        // server request
        /* Old function
        if($("#name_add").val() != ""){
            var element = new Object();
            element.id = 4;
            element.name = $("#name_add").val();
            element.status = true;
            $(".add-row").remove();
            $("tbody").append(inventoryRow(element));
            $("tbody").append(inventoryAddRow());
            changeLanguage(localStorage.defaultLanguage);
        }
        */

        if($("#name_add").val() == "" || isWhitespace($("#name_add").val())){
            loadToast("is-item-empty", 3500, "rounded");
        } else {
            console.log("Zone: " + $("#zone-select").val());
            console.log("Module: " + $("#module-select").val());
            console.log("Name: " + $("#name_add").val());

            var data = new Object();
            data.zone_id = $("#zone-select").val();
            data.module_id = $("#module-select").val();
            data.name = $("#name_add").val();

            $server.request({
                service: 'add-inventory-item',
                data: data,
                success: function(response){
                    // Here we must append the recently added item to the list,
                    // with the id assigned by the server
                    console.log(response);
                }
            });
        }
    });

    row.append(idInput);
    row.append(nameInput);
    row.append(addButton);

    return row;
}

function addInventoryButton(){
    return $('<a id="add_inventory" class="green btn-floating btn-small waves-effect waves-light"><i class="mdi mdi-plus mdi-24"></i></a>');
}

$(function (){
    addZoneSelect();

    changeLanguage(localStorage.defaultLanguage);
});
