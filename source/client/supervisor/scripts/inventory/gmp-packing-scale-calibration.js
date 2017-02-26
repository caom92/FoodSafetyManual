function addInventoryManager(controlsWrapper, contentWrapper){
    $("#log_name").html("Scale Calibration");
    loadInventory(contentWrapper);
}

function loadInventory(htmlElement){
    var data = new Object();

    $server.request({
        service: 'get-scales-of-zone',
        success: function(response){
            $(htmlElement).hide();
            gmpScaleCalibrationInventoryTable(htmlElement, response.data);
            initSortability('change-order-of-scale');
            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            dynamicSearchBind("type-search", "type-column");
            changeLanguage();
            $(htmlElement).show(400);
        }
    });
}

function gmpScaleCalibrationInventoryTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"inventory_position"},{"type":"th","classes":"inventory_id"},{"type":"th","classes":"inventory_name"},{"type":"th","classes":"inventory_type"},{"type":"th","classes":"inventory_dismiss"}]},{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type-search","classes":"type_search","options":[{"classes":"any_type","value":""}]}}},{"type":"td","contents":""}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type_add","classes":"type_search","options":[{"classes":"select_option","value":"","disabled":true,"selected":true}]}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = [];

    for(var type of data){
        var typeBody = {"type":"tbody","id":"type_" + type.id,"classes":"ui-sortable","rows":[]};
        tableJSON.thead.rows[1].columns[3].contents.field.options.push({"value":type.name,"text":type.name});
        tableJSON.tfoot.rows[0].columns[3].contents.field.options.push({"value":type.id,"text":type.name});
        for(var item of type.items){
            typeBody.rows.push(gmpPackingScaleCalibrationInventoryRow(item, type.name));
        }
        tableJSON.tbody.push(typeBody);
    }

    console.log(tableJSON);

    $(htmlElement).append(table(tableJSON));

    $("input:checkbox").on("change",function(){
        var itemID = $(this).data("id");
        $server.request({
            service: 'toggle-scale-activation',
            data: {item_id:itemID},
            success: function(response, message, xhr) {
                console.log(itemID);
                if($("#inventory_" + itemID).hasClass("grey-text")){
                    console.log("item_row");
                    loadToast("toggle_item_on_success", 3500, "rounded");
                    $("#inventory_" + itemID).removeClass("grey-text");
                } else {
                    console.log("item_row");
                    loadToast("toggle_item_off_success", 3500, "rounded");
                    $("#inventory_" + itemID).addClass("grey-text");
                }
            }
        });
    });

    $("#add_inventory").on("click",function(e){
        e.preventDefault();
        if($("#name_add").val() == "" || isWhitespace($("#name_add").val()) || $("#type_add").val() == null){
            loadToast("is-item-empty", 3500, "rounded");
        } else {
            var data = new Object();
            data.name = $("#name_add").val();
            data.area_id = $("#area-select").val();
            data.type_id = $("#type_add").val();
            console.log(data);

            $server.request({
                service: 'add-new-inventory-item',
                data: data,
                success: function(response){
                    // Here we must append the recently added item to the list,
                    // with the id assigned by the server
                    // TODO: Optimize this part, its hideous
                    var item = new Object();
                    item.id = Number(response.data);
                    item.name = $("#name_add").val();
                    item.is_active = 1;
                    item.type = $("#type_add option:selected").text();
                    item.position = Number($($("tbody#type_" + $("#type_add").val() + " tr").last().children()[0]).text()) + 1;
                    console.log(item);
                    console.log(tableRow(gmpPackingScaleCalibrationInventoryRow(item, item.type)));
                    $("tbody#type_" + $("#type_add").val()).append(tableRow(gmpPackingScaleCalibrationInventoryRow(item, item.type)));
                    initSortability('change-order-of-scale');
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, 400);
                    $("#name_add").val("");
                    $("#type_add").val("");
                    $("#type_add").material_select("destroy");
                    $("#type_add").material_select();
                    loadToast("item_add_success", 3500, "rounded");
                    changeLanguage(localStorage.defaultLanguage);
                }
            });
        }
    });
}

function gmpPackingScaleCalibrationInventoryRow(item, type){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"inventory_" + item.id,"classes":"ui-sortable-handle","columns":[]};

    if(item.is_active == 0){
        inventoryRow.classes = inventoryRow.classes + " grey-text";
    }

    // Add information columns. Remember the class "search-column" for dynamic
    // search binding
    inventoryRow.columns.push({"type":"td","contents":item.order,"classes":"position-column"});
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"id-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.name,"classes":"name-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":type,"classes":"type-column search-column"});

    // Add switch to toggle activaction or deactivation of the item
    inventoryRow.columns.push({"type":"td","contents":gmpPackingScaleCalibrationSwitch(item)});

    return inventoryRow;
}

function gmpPackingScaleCalibrationSwitch(item){
    var switchField = {"type":"switch","id":"switch_" + item.id,"data":{"id":item.id}};

    if(item.is_active == 1){
        switchField.checked = true;
    }

    var switchInput = {"field":switchField};

    return switchInput;
}

$(function(){
    Materialize.toast("Cargado script de Scale Calibration", 2500, "rounded");
});