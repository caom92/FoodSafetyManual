function zonesTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"zone_name"},{"type":"th","classes":"company_zone_name"},{"type":"th","classes":"address_zone_name"},{"type":"th"},{"type":"th"},{"type":"th"}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":{"field":{"type":"input","id":"new_zone","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":3},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"company_name","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":65535},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"company_address","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":65535},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody.rows = [];

    for(var zone of data){
        tableJSON.tbody.rows.push(zoneRow(zone));
    }

    $(htmlElement).append(table(tableJSON));
}

function zoneRow(zone){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"program_" + zone.id,"classes":"","columns":[]};

    // Add information columns.
    inventoryRow.columns.push({"type":"td","contents":zone.name,"classes":"zone-column"});
    inventoryRow.columns.push({"type":"td","contents":zone.company_name,"classes":"pdf-column"});
    inventoryRow.columns.push({"type":"td","contents":zone.address,"classes":"html-column"});
    inventoryRow.columns.push({"type":"td","contents":zoneEditButton(zone)});
    if(zone.logo_path)
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/logos/" + zone.logo_path + "' height='42'>","classes":"html-column"});
    else
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/logos/" + "default.png" + "' height='42'>","classes":"html-column"});

    inventoryRow.columns.push({"type":"td","contents":uploadLogoButton(zone)});

    return inventoryRow;
}

function zoneEditableRow(program){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"edit_program_" + program.id,"classes":"","columns":[]};

    // Add information columns.
    inventoryRow.columns.push({"type":"td","contents":{"field":{"type":"input","id":"zone_name_" + program.id,"classes":"validate","value":program.name,"fieldType":"text"}},"classes":"pdf-column"});
    inventoryRow.columns.push({"type":"td","contents":{"field":{"type":"input","id":"company_name_" + program.id,"classes":"validate","value":program.company_name,"fieldType":"text"}},"classes":"pdf-column"});
    inventoryRow.columns.push({"type":"td","contents":{"field":{"type":"input","id":"company_address_" + program.id,"classes":"validate","value":program.address,"fieldType":"text"}},"classes":"html-column"});

    // Edit Button
    inventoryRow.columns.push({"type":"td","contents":zoneSaveButton(program)});

    if(program.logo_path)
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/logos/" + program.logo_path + "' height='42'>","classes":"html-column"});
    else
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/logos/" + "default.png" + "' height='42'>","classes":"html-column"});

    inventoryRow.columns.push({"type":"td"});

    return inventoryRow;
}


function zoneEditButton(item){
    var buttonField = {"type":"button","classes":"edit_button","id":"edit_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function zoneSaveButton(item){
    var buttonField = {"type":"button","classes":"save_button","id":"save_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function uploadLogoButton(item){
    var buttonField = {"type":"button","classes":"upload_button","id":"upload_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function logoFileInput(zone){
    var logoField = {"type":"file","id":"upload-logo-form","classes":"upload_button","name":"logo","additional_fields":[]};

    var testInput = {"type":"input","id":"zone_id_" + zone.id,"fieldType":"text","name":"zone_id","value":zone.id,"hidden":true};

    logoField.additional_fields.push(testInput);

    var logoInput = {"field":logoField};

    return logoInput;
}

function logoFileRow(zone){
    var uploadRow = {"type":"tr","id":"upload_row_" + zone.id,"classes":"","columns":[]};

    uploadRow.columns.push({"type":"td","contents":logoFileInput(zone),"colspan":6});

    return uploadRow;
}

function bindUploadButtonFunctionality(){
    $("a[id^='upload_']").on("click", function(){
        var zoneID = $(this).data("id");
        var zone = $(this).data("item");
        if($(this).data("waiting") == true){
            var formData = new FormData($('#upload-logo-form')[0]);
            $server.request({
                service:'upload-zone-logo',
                data: formData,
                success: function(response, message, xhr) {
                    if(response.meta.return_code == 0){
                        $("#upload_row_" + zoneID).remove();
                        zone.logo_path = response.data;
                        $("#program_" + zoneID).attr("id", "tempRow");
                        $("#tempRow").after(tableRow(zoneRow(zone)));
                        $("#tempRow").remove();
                        bindUploadButtonFunctionality();
                        bindEditButtonFunctionality();
                        changeLanguage();
                        loadToast("new_logo_uploaded", 3500, "rounded");
                    } else {
                        loadToast("invalid_file_format", 3500, "rounded");
                    }
                    //console.log("success");
                    //$("#upload_row_" + zoneID);
                }
            });
        } else {
            console.log("mames");
            console.log($(this).data());
            $(this).data("waiting", true);
            $("#program_" + $(this).data("id")).after(tableRow(logoFileRow($(this).data("item"))));
            changeLanguage();
        }
    });
}

function bindEditButtonFunctionality(){
    $("a[id^='edit_']").on("click", function(){
        console.log("Presionado");
        console.log($(this).data());
        $("#program_" + $(this).data("id")).after(tableRow(zoneEditableRow($(this).data("item"))));
        $("#program_" + $(this).data("id")).remove();
        bindSaveButtonFunctionality();
        changeLanguage();
    });
}

function bindSaveButtonFunctionality(){
    $("a[id^='save_']").on("click", function(){
        var zoneID = $(this).data("id");
        var zone = $(this).data("item");
        console.log("Presionado");
        console.log($(this).data());
        $server.request({
            service: 'edit-zone',
            data: {
                "zone_id":zoneID,
                "zone_name":$("#zone_name_" + zoneID).val(),
                "company_name":$("#company_name_" + zoneID).val(),
                "company_address":$("#company_address_" + zoneID).val()
            },
            success: function(response){
                if(response.meta.return_code == 0){
                    loadToast("zone_updated", 3500, "rounded");
                    var updatedZone = zone;
                    updatedZone.name = $("#zone_name_" + zoneID).val(),
                    updatedZone.company_name = $("#company_name_" + zoneID).val();
                    updatedZone.address = $("#company_address_" + zoneID).val();
                    $("#edit_program_" + zoneID).after(tableRow(zoneRow(updatedZone)));
                    $("#edit_program_" + zoneID).remove();
                    bindEditButtonFunctionality();
                    changeLanguage();
                }
            }
        });
    });
}

$(function (){
    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/table-creator.js", function( data, textStatus, jqxhr ) {
            $("#zones_wrapper").hide();
            $server.request({
                service: "list-zones",
                success: function(response, message, xhr) {
                    zonesTable("#zones_wrapper", response.data);
                    $("#zones_wrapper").show(500);
                    bindEditButtonFunctionality();
                    bindUploadButtonFunctionality();
                    $("#add_inventory").on("click", function(){
                        var data = new Object();
                        data.new_zone = $("#new_zone").val();
                        data.company_name = $("#company_name").val();
                        data.company_address = $("#company_address").val();
                        //data.logo = new FormData($("#logo_file")[0]);
                        zone = new Object();
                        zone.name = data.new_zone;
                        zone.company_name = data.company_name;
                        zone.address = data.company_address;
                        $server.request({
                            service: "add-zone",
                            data: data,
                            success: function(response, message, xhr) {
                                if(response.meta.return_code == 0){
                                    zone.id = response.data;
                                    $("#new_zone").val("");
                                    $("#company_name").val("");
                                    $("#company_address").val("");
                                    $("tbody").append(tableRow(zoneRow(zone)));
                                    changeLanguage();
                                }
                            }
                        });
                    });
                    changeLanguage();
                }
            });
        });
    });

    changeLanguage();
});