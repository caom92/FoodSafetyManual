function addInventoryManager(controlsWrapper, contentWrapper){
    //$("#log_name").html("Daily Thermometer Calibration Verification Check");
    loadInventory(contentWrapper);
}

function loadInventory(htmlElement){
    var data = new Object();

    $server.request({
        service: 'inventory-gmp-packing-thermo-calibration',
        success: function(response){
            $(htmlElement).hide();
            gmpPackingThermoCalibrationInventoryTable(htmlElement, response.data);
            initSortability("reorder-gmp-packing-thermo-calibration");
            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            dynamicSearchBind("quantity-search", "quantity-column");
            changeLanguage();
            $(htmlElement).show(400);
        }
    });
}

function gmpPackingThermoCalibrationInventoryTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"inventory_position"},{"type":"th","classes":"inventory_id"},{"type":"th","classes":"number_title"},{"type":"th","classes":"inventory_dismiss"}]},{"type":"tr","columns":[{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}},{"type":"td","contents":""}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item add-item-element","fieldType":"text","data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = {"type":"tbody","rows":[]};

    for(var group of data){
        tableJSON.tbody.rows.push(gmpPackingThermoCalibrationInventoryRow(group));
        console.log(group);
    }

    $(htmlElement).append(table(tableJSON));

    $("input:checkbox").on("change",function(){
        var itemID = $(this).data("id");
        $server.request({
            service: 'toggle-gmp-packing-thermo-calibration',
            data: {id:itemID},
            success: function(response, message, xhr) {
                console.log(itemID);
                if($("#inventory_" + itemID).hasClass("grey-text")){
                    loadToast("toggle_item_on_success", 3500, "rounded");
                    $("#inventory_" + itemID).removeClass("grey-text");
                } else {
                    loadToast("toggle_item_off_success", 3500, "rounded");
                    $("#inventory_" + itemID).addClass("grey-text");
                }
            }
        });
    });

    $("#add_inventory").on("click",function(e){
        e.preventDefault();
        if($("#name_add").val() == "" || isWhitespace($("#name_add").val())){
            loadToast("is-item-empty", 3500, "rounded");
        } else {
            var data = new Object();
            data.name = $("#name_add").val();

            $server.request({
                service: 'add-gmp-packing-thermo-calibration',
                data: data,
                success: function(response){
                    // Here we must append the recently added item to the list,
                    // with the id assigned by the server
                    // TODO: Optimize this part, its hideous
                    var item = new Object();
                    item.id = Number(response.data);
                    item.name = $("#name_add").val();
                    item.is_active = 1;
                    item.position = Number($($("tbody tr").last().children()[0]).text()) + 1;
                    $("tbody").append(tableRow(gmpPackingThermoCalibrationInventoryRow(item)));
                    $("html, body").animate({
                        scrollTop: $(document).height()
                    }, 400);
                    $("#name_add").val("");
                    loadToast("item_add_success", 3500, "rounded");
                    changeLanguage();
                }
            });
        }
    });
}

function gmpPackingThermoCalibrationInventoryRow(item){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"inventory_" + item.id,"classes":"ui-sortable-handle","columns":[]};

    if(item.is_active == 0){
        inventoryRow.classes = inventoryRow.classes + " grey-text";
    }

    // Add information columns. Remember the class "search-column" for dynamic
    // search binding
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"id-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.position,"classes":"position-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.name,"classes":"name-column search-column"});

    // Add switch to toggle activaction or deactivation of the item
    inventoryRow.columns.push({"type":"td","contents":gmpPackingThermoCalibrationSwitch(item)});

    return inventoryRow;
}

function gmpPackingThermoCalibrationSwitch(item){
    var switchField = {"type":"switch","id":"switch_" + item.id,"data":{"id":item.id}};

    if(item.is_active == 1){
        switchField.checked = true;
    }

    var switchInput = {"field":switchField};

    return switchInput;
}

/*function initSortability(sortingService){
    $("#sort tbody").sortable({
        helper: fixHelper,
        cursor: "move",
        update: function(event, ui) {
            $("tbody").each(function(bodyIndex) {
                $(this).children().each(function(rowIndex) {
                    $($(this).children()[0]).text(rowIndex + 1);
                    var order = $($(this).children()[0]).text();
                    var itemID = $($(this).children()[1]).text();
                    var data = new Object();
                    data.scale_id = parseInt(itemID);
                    data.position = parseInt(order);
                    //console.log(data);
                    $server.request({
                        service: sortingService,
                        data: data
                    });
                });
            });
        }
    });

    var fixHelper = function(e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function(index)
        {
          $(this).width($originals.eq(index).width());
        });
        return $helper;
    };
}*/

$(function(){
    
});