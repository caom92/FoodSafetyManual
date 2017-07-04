function zonesTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"zone_name"},{"type":"th","classes":"company_zone_name"},{"type":"th","classes":"address_zone_name"},{"type":"th"}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":{"field":{"type":"input","id":"new_zone","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":3},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"company_name","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":65535},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"company_address","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":65535},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]},{"type":"tr","columns":[{"type":"td","colspan":4,"contents":{"field":{"type":"file","id":"logo_file","classes":"attach_file"}}}]}]};

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
    inventoryRow.columns.push({"type":"td","contents":"<img src='data/logos/" + zone.logo_path + "' height='42'>","classes":"html-column"});

    // Edit Button
    //inventoryRow.columns.push({"type":"td","contents":programEditButton(zone)});

    return inventoryRow;
}

$(function (){
    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/table-creator.js", function( data, textStatus, jqxhr ) {
            $server.request({
                service: "list-zones",
                success: function(response, message, xhr) {
                    zonesTable("#zones_wrapper", response.data);
                    $("#add_inventory").on("click", function(){
                        var data = new Object();
                        data.new_zone = $("#new_zone").val();
                        data.company_name = $("#company_name").val();
                        data.company_address = $("#company_address").val();
                        data.logo = new FormData($("#logo_file")[0]);
                        $server.request({
                            service: "add-zone",
                            data: data,
                            success: function(response, message, xhr) {
                                console.log(response);
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