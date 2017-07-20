function addZoneSelect() {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "zone_select");
    label.addClass("select_zone");
    label.attr("for", "zone_select");

    $server.request({
        service: 'list-zones',
        success: function (response, messages, xhr) {
            if (response.meta.return_code == 0) {
                showNoSupervisorSign();
                for (var zone of response.data) {
                    hideSigns();
                    var option = $("<option>");
                    option.attr("value", zone.id);
                    option.append(zone.name);
                    select.append(option);
                }
                $("#zone_select_wrapper").append(select);
                $("#zone_select_wrapper").append(label);
                $("#zone_select").change(function(index){
                    $("#signatures_wrapper").html("");
                    addSignaturesTable(parseInt($("#zone_select").val()));
                });
                addSignaturesTable(parseInt($("#zone_select").val()));
                changeLanguage();
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSignaturesTable(zoneID){
    $server.request({
        service: 'list-signatures-by-zone',
        data: {"zone_id":zoneID},
        success: function (response, messages, xhr) {
            if (response.meta.return_code == 0) {
                if(response.data.length != 0){
                    hideSigns();
                    signaturesTable("#signatures_wrapper", response.data);
                    bindUploadButtonFunctionality();
                    changeLanguage();
                } else {
                    showNoSupervisorSign();
                }
            } else {
                throw response.meta.message;
            }
        }
    });
}

function signaturesTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"employee_id"},{"type":"th","classes":"real_name"},{"type":"th","classes":"username"},{"type":"th","classes":"signature_title"},{"type":"th"}]}]};

    tableJSON.tbody.rows = [];

    for(var supervisor of data){
        tableJSON.tbody.rows.push(signatureRow(supervisor));
    }

    $(htmlElement).append(table(tableJSON));
}

function signatureRow(supervisor){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"supervisor_" + supervisor.id,"classes":"","columns":[]};

    // Add information columns.
    inventoryRow.columns.push({"type":"td","contents":supervisor.employee_num,"classes":"number-column"});
    inventoryRow.columns.push({"type":"td","contents":supervisor.full_name,"classes":"name-column"});
    inventoryRow.columns.push({"type":"td","contents":supervisor.username,"classes":"username-column"});

    if(supervisor.signature_path)
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/signatures/" + supervisor.signature_path + "' height='42'>","classes":"signature-column"});
    else
        inventoryRow.columns.push({"type":"td","contents":"<img src='data/signatures/" + "default.png" + "' height='42'>","classes":"signature-column"});

    inventoryRow.columns.push({"type":"td","contents":uploadSignatureButton(supervisor)});

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

function uploadSignatureButton(item){
    var buttonField = {"type":"button","classes":"upload_button","id":"upload_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function logoFileInput(zone){
    var logoField = {"type":"file","id":"upload-logo-form","classes":"select_image_button","name":"signature_file","additional_fields":[]};

    var testInput = {"type":"input","id":"zone_id_" + zone.id,"fieldType":"text","name":"supervisor_id","value":zone.id,"hidden":true};

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
            $(this).data("waiting", false);
            var formData = new FormData($('#upload-logo-form')[0]);
            $server.request({
                service:'add-signature',
                data: formData,
                success: function(response, message, xhr) {
                    if(response.meta.return_code == 0){
                        $("#upload_row_" + zoneID).remove();
                        zone.signature_path = response.data;
                        $("#supervisor_" + zoneID).attr("id", "tempRow");
                        $("#tempRow").after(tableRow(signatureRow(zone)));
                        $("#tempRow").remove();
                        bindUploadButtonFunctionality();
                        changeLanguage();
                        loadToast("new_logo_uploaded", 3500, "rounded");
                    } else {
                        $("#upload_row_" + zoneID).remove();
                        loadToast("invalid_file_format", 3500, "rounded");
                    }
                }
            });
        } else {
            console.log("mames");
            console.log($(this).data());
            $(this).data("waiting", true);
            $("#supervisor_" + $(this).data("id")).after(tableRow(logoFileRow($(this).data("item"))));
            changeLanguage();
        }
    });
}

function hideSigns(){
    $(".no_sign").hide();
}

function showNoSupervisorSign(){
    $(".no_sign").hide();
    $("#employee_table_wrapper").html("");
    $("#supervisor_change_wrapper").html("");
    $("#change_button").html("");
    $("#no_supervisors").show();
}

$(function (){
    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/table-creator.js", function( data, textStatus, jqxhr ) {
            addZoneSelect();
            $("#signatures_wrapper").hide();
            $("#signatures_wrapper").fadeIn(500);
        });
    });

    changeLanguage();
});