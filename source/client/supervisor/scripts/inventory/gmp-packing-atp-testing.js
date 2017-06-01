function addInventoryManager(controlsWrapper, contentWrapper){
    $("#log_name").html("ATP Testing");
    loadInventory(contentWrapper);
}

function loadInventory(htmlElement){
    var data = new Object();

    $server.request({
        service: 'inventory-gmp-packing-atp-testing',
        success: function(response){
            $(htmlElement).hide();
            gmpPackingAtpTestingInventoryTable(htmlElement, response.data);
            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            $("input").characterCounter();
            changeLanguage();
            $(htmlElement).show(400);
        }
    });
}

function inventoryRowWrapper(item){
    console.log("Wrapper called");
    return gmpPackingAtpTestingInventoryRow(item);
}

function gmpPackingAtpTestingInventoryTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"inventory_id"},{"type":"th","classes":"inventory_name"},{"type":"th","classes":""}]},{"type":"tr","columns":[{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":32},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = {"type":"tbody","rows":[]};

    for(var item of data){
        tableJSON.tbody.rows.push(gmpPackingAtpTestingInventoryRow(item));
    }

    $(htmlElement).append(table(tableJSON));

    $("#add_inventory").on("click",function(e){
        addItemToInventory("gmp-packing-atp-testing", false);
    });

    /*$("input:checkbox").on("change",function(){
        var itemID = $(this).data("id");
        toggleItem("gmp-packing-hand-washing", itemID);
    });*/
}

function gmpPackingAtpTestingInventoryRow(item){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"inventory_" + item.id,"classes":"ui-sortable-handle","columns":[]};

    if(item.is_active == 0){
        inventoryRow.classes = inventoryRow.classes + " grey-text";
    }

    // Add information columns. Remember the class "search-column" for dynamic
    // search binding
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"id-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.name,"classes":"name-column search-column"});

    // Add switch to toggle activaction or deactivation of the item
    //inventoryRow.columns.push({"type":"td","contents":gmpPackingAtpTestingSwitch(item)});

    return inventoryRow;
}

function gmpPackingAtpTestingSwitch(item){
    var switchField = {"type":"switch","id":"switch_" + item.id,"data":{"id":item.id}};

    if(item.is_active == 1){
        switchField.checked = true;
    }

    var switchInput = {"field":switchField};

    return switchInput;
}
