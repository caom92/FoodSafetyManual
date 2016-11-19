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
                    $("#area-select").material_select('destroy');
                    $("#area-select").remove();
                    $("#module-select").material_select('destroy');
                    $("#module-select").remove();
                    $("table").remove();
                    addAreaSelect($(this).val());
                });
                changeLanguage(localStorage.defaultLanguage);
                $('select').material_select();
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addAreaSelect(zoneID){
    var data = new Object();
    data.zone_id = zoneID;

    $server.request({
        service: 'get-areas-of-zone',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                var select = $("<select>");
                select.attr("id", "area-select");
                select.append('<option value="" disabled selected class="select_program"></option>');
                for(var zone in response.data){
                    var option = $("<option>");
                    option.attr("value", response.data[zone].id);
                    option.html(response.data[zone].name);
                    select.append(option);
                }
                $("#content_wrapper").append(select);
                $("#area-select").change(function (e) {
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
                    loadInventory($(this).val());
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
    row.append($("<td class='dynamic-search'>").append(textInput("id-search", "id_search")));
    row.append($("<td class='dynamic-search'>").append(textInput("name-search", "name_search")));
    row.append($("<td class='dynamic-search'>").append(selectInput("type-search", "type_search", "any_type", false, [{"value": "Food Contact - Daily", "text": "Food Contact - Daily"}, {"value": "Non Food Contact - Daily", "text": "Non Food Contact - Daily"}])));
    row.append($("<td>"));
    return row;
}

function textInput(id, classes){
    return '<input id="' + id + '" type="text" class="validate ' + classes + '">';
}

function selectInput(id, classes, defaultOption, defaultDisabled, contents){
    var select = $("<select>");
    var options = "";

    if(id)
        select.attr("id", id);

    select.addClass(classes);

    if(defaultDisabled)
        options = "disabled selected"

    select.append('<option value="" class="' + defaultOption + '" ' + options + '></option>');

    contents.forEach(function(index){
        select.append('<option value="' + index.value + '">' + index.text + '</option>');
    });

    return select;
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

    $("#" + input).change(function (e) {
        $("." + column).each(function (e) {
            if($(this).text().search($("#" + input).val()) == 0){
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

function loadInventory(areaID){
    var data = new Object();
    data.area_id = areaID;
    console.log(data);

    $server.request({
        service: 'get-items-of-area',
        data: data,
        success: function(response){
            console.log(response);
            $("#content_wrapper").append(inventoryTable(response.data));

            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            dynamicSearchBind("type-search", "type-column");

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
    for(var element in inventory){
        tableBody.append(inventoryRow(inventory[element]));
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
    headerRow.append($('<th data-field="edit" class="inventory_type"></th>'));
    headerRow.append($('<th data-field="edit" class="inventory_dismiss"></th>'));
    header.append(headerRow);
    return header;
}

function inventoryRow(element){
    var row = $("<tr>");
    var switchOpening = '<div class="switch"><label>';
    var switchBox = '<input disabled type="checkbox">';
    var switchClosing = '<span class="lever"></span></label></div>';
    var buttonColumn = $("<td>");

    row.addClass("");
    row.append($("<td class='id-column search-column'>").text(element.id));
    row.append($("<td class='name-column search-column'>").text(element.name));
    row.append($("<td class='type-column search-column'>").text(element.type.type_name));
    if(element.is_active){
        switchBox = '<input type="checkbox" checked="">';
    } else {
        row.addClass("grey-text");
    }
    switchInput = $(switchOpening + switchBox + switchClosing);
    switchInput.find("input:checkbox").each(function(index){
        $(this).click(function(e){
            $(this).prop("disabled", true);
            var itemToDischarge = $(this).parent().parent().parent().parent().children(".id-column").text();
            var data = new Object();
            data.item_id = itemToDischarge;
            $server.request({
                service: 'discharge-inventory-item',
                data: data,
                success: function(response, message, xhr) {
                    console.log(response);
                }
            });
            $(this).parent().parent().parent().parent().addClass("grey-text");
        });
    });
    buttonColumn.append(switchInput);
    row.append(buttonColumn);
    return row;
}

function inventoryAddRow(){
    var row = $("<tr class='add-row'>");
    var idInput = $("<td>");
    var nameInput = $("<td>");
    var typeInput = $("<td>");
    var addButton = $("<td>");

    nameInput.append(textInput("name_add", "add_item"));
    typeInput.append(selectInput("type_add", "add_item", "select_option", true, [{"value": "Food Contact - Daily", "text": "Food Contact - Daily"}, {"value": "Non Food Contact - Daily", "text": "Non Food Contact - Daily"}]));
    addButton.append(addInventoryButton());

    addButton.click(function(){
        // First we must send the new element name, we get back both the name and ID
        // This part should be covered on a server service
        // We must append it to the current view; future views will load it on 
        // server request

        if($("#name_add").val() == "" || isWhitespace($("#name_add").val()) || $("#type_add").val() == null){
            loadToast("is-item-empty", 3500, "rounded");
        } else {
            console.log("Zone: " + $("#zone-select").val());
            console.log("Module: " + $("#module-select").val());
            console.log("Name: " + $("#name_add").val());

            var data = new Object();
            data.zone_id = $("#zone-select").val();
            data.module_id = $("#module-select").val();
            data.name = $("#name_add").val();

            Materialize.toast("Objeto añadido valido", 3500, "rounded");

            /*$server.request({
                service: 'add-inventory-item',
                data: data,
                success: function(response){
                    // Here we must append the recently added item to the list,
                    // with the id assigned by the server
                    console.log(response);
                    var element = new Object();
                    element.id = response.data;
                    element.name = $("#name_add").val();
                    element.status = true;
                    $(".add-row").remove();
                    $("tbody").append(inventoryRow(element));
                    $("tbody").append(inventoryAddRow());
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, 400);
                    changeLanguage(localStorage.defaultLanguage);
                }
            });*/
        }
    });

    row.append(idInput);
    row.append(nameInput);
    row.append(typeInput);
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
