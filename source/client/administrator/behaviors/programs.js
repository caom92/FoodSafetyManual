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
                $server.request({
                    service: 'list-report-footers',
                    data: {"zone_id":parseInt($("#zone_select").val())},
                    success: function(response){
                        $("#programs_wrapper").html("");
                        $("#programs_wrapper").hide();
                        programTable("#programs_wrapper", response.data);
                        $("#programs_wrapper").show(500);
                        bindEditButtonFunctionality();
                        changeLanguage();
                    }
                });
                $("#zone_select").change(function(index){
                    $server.request({
                        service: 'list-report-footers',
                        data: {"zone_id":parseInt($("#zone_select").val())},
                        success: function(response){
                            $("#programs_wrapper").html("");
                            $("#programs_wrapper").hide();
                            programTable("#programs_wrapper", response.data);
                            $("#programs_wrapper").show(500);
                            bindEditButtonFunctionality();
                            changeLanguage();
                        }
                    });
                });
                changeLanguage();
            } else {
                throw response.meta.message;
            }
        }
    });
}

function programTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"program_name"},{"type":"th","classes":"pdf_footer"},{"type":"th","classes":"html_footer"}]}/*,{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type-search","classes":"type_search","options":[{"classes":"any_type","value":""}]}}},{"type":"td","contents":""}]}*/]};

    //tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type_add","classes":"type_search","options":[{"classes":"select_option","value":"","disabled":true,"selected":true}]}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody.rows = [];

    //data = [{"id":1,"zone_name":"LAW","log_name":"Preop","pdf_footer":"Preop PDF Footer","html_footer":"Preop HTML Footer"},{"id":2,"zone_name":"LAW","log_name":"Scale Calibration","pdf_footer":"Scale PDF Footer","html_footer":"Scale HTML Footer"},{"id":3,"zone_name":"LAW","log_name":"Glass","pdf_footer":"Glass PDF Footer","html_footer":"Glass HTML Footer"},{"id":4,"zone_name":"LAW","log_name":"Thermo Calibration","pdf_footer":"Thermo PDF Footer","html_footer":"Thermo HTML Footer"}];

    for(var program of data){
        tableJSON.tbody.rows.push(programRow(program));
    }

    $(htmlElement).append(table(tableJSON));
}

function programRow(program){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"program_" + program.id,"classes":"","columns":[]};

    // Add information columns.
    inventoryRow.columns.push({"type":"td","contents":program.log_name,"classes":"program-column"});
    inventoryRow.columns.push({"type":"td","contents":escapeHtml(program.pdf_footer),"classes":"pdf-column"});
    inventoryRow.columns.push({"type":"td","contents":escapeHtml(program.html_footer),"classes":"html-column"});

    // Edit Button
    inventoryRow.columns.push({"type":"td","contents":programEditButton(program)});

    return inventoryRow;
}

function programEditableRow(program){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"edit_program_" + program.id,"classes":"","columns":[]};

    // Add information columns.
    inventoryRow.columns.push({"type":"td","contents":program.log_name,"classes":"program-column"});
    inventoryRow.columns.push({"type":"td","contents":{"field":{"type":"input","id":"pdf_footer_" + program.id,"classes":"validate","value":program.pdf_footer,"fieldType":"text"}},"classes":"pdf-column"});
    inventoryRow.columns.push({"type":"td","contents":{"field":{"type":"input","id":"html_footer_" + program.id,"classes":"validate","value":program.html_footer,"fieldType":"text"}},"classes":"html-column"});

    // Edit Button
    inventoryRow.columns.push({"type":"td","contents":programSaveButton(program)});

    return inventoryRow;
}

function programEditButton(item){
    var buttonField = {"type":"button","classes":"edit_button","id":"edit_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function programSaveButton(item){
    var buttonField = {"type":"button","classes":"save_button","id":"save_" + item.id,"data":{"id":item.id,"item":item},"icon":{"type": "icon", "icon": "mdi-send", "size": "mdi-32px", "color": "white-text"}};

    var buttonInput = {"field":buttonField};

    return buttonInput;
}

function bindEditButtonFunctionality(){
    $("a[id^='edit_']").on("click", function(){
        console.log("Presionado");
        console.log($(this).data());
        $("#program_" + $(this).data("id")).after(tableRow(programEditableRow($(this).data("item"))));
        $("#program_" + $(this).data("id")).remove();
        bindSaveButtonFunctionality()
        changeLanguage();
    });
}

function bindSaveButtonFunctionality(){
    $("a[id^='save_']").on("click", function(){
        var footerID = $(this).data("id");
        var program = $(this).data("item");
        console.log("Presionado");
        console.log($(this).data());
        $server.request({
            service: 'edit-report-footer',
            data: {
                "footer_id":footerID,
                "capture_form_footer":$("#html_footer_" + footerID).val(),
                "report_document_footer":$("#pdf_footer_" + footerID).val(),
            },
            success: function(response){
                loadToast("program_updated", 3500, "rounded");
                var updatedProgram = program;
                updatedProgram.pdf_footer = $("#pdf_footer_" + footerID).val();
                updatedProgram.html_footer = $("#html_footer_" + footerID).val();
                $("#edit_program_" + footerID).after(tableRow(programRow(program)));
                $("#edit_program_" + footerID).remove();
                bindEditButtonFunctionality();
                changeLanguage();
            }
        });
    });
}

function escapeHtml (string) {
        var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

$(function (){
    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/table-creator.js", function( data, textStatus, jqxhr ) {
            addZoneSelect();
        });
    });
});