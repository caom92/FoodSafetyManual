function addInventoryManager(controlsWrapper, contentWrapper){
    $("#log_name").html("Self Inspection");
    addAreaSelect(controlsWrapper, contentWrapper);
    //loadInventory(contentWrapper);
}

function addAreaSelect(controlsWrapper, contentWrapper){
    $server.request({
        service: 'rooms-gmp-pest-control-self-inspection',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var areaSelectRow = {"columns":[]};

                // Select with all areas
                var areaSelectInput = {"id":"areaSelectWrapper","classes":"input-field col s6 m6 l6"};
                var areaSelect = {"type":"select","id":"area-select","options":[],"classes":"add-item-element","data":{"param":{"name":"room_id","type":"number"}}};

                areaSelect.options.push({"classes":"select_area","disabled":true,"selected":true});

                for(var area of response.data){
                    areaSelect.options.push({"value":area.id,"text":area.name});
                }

                areaSelectInput.field = areaSelect;

                // Text field for adding an area
                var areaNameInput = {"id":"areaNameWrapper","classes":"input-field col s5 m5 l5"};
                var areaName = {"type":"input","id":"area_name","classes":"validate add_workplace_area","fieldType":"text"};
                areaNameInput.field = areaName;

                // Float button to confirm adding a new area
                var areaAddInput = {"id":"addAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
                var areaAddButton = {"type":"floating","id":"add_workplace_area","classes":"btn-floating waves-effect waves-light green right"};
                var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
                areaAddButton.icon = areaAddIcon;
                areaAddInput.field = areaAddButton;

                areaSelectRow.columns.push(areaSelectInput);
                areaSelectRow.columns.push(areaNameInput);
                areaSelectRow.columns.push(areaAddInput);

                $(controlsWrapper).hide();
                $(controlsWrapper).append(createInputRow(areaSelectRow));

                $("#area-select").change(function (e) {
                    $("table").remove();
                    loadInventory($(this).val(), contentWrapper);
                });

                $('#add_workplace_area').on('click', function(e) {
                    e.preventDefault();
                    var input = $("#area_name");
                    var isNameEmpty = input.val() == "";
                    if (isNameEmpty) {
                        loadToast("is-workplace-area-empty",4000, "rounded");
                        input.addClass("invalid");
                    } else {
                        $server.request({
                            service: 'add-room-gmp-pest-control-self-inspection',
                            data: {name: input.val()},
                            success: function(response) {
                                if (response.meta.return_code == 0) {
                                    var option = createOption({"value":response.data,"text":input.val()});
                                    $("#area-select").append(option);
                                    $("#area-select").material_select();
                                    $("#area_name").val("");
                                    loadToast("workplace_area_registered", 2500, "rounded");
                                } else {
                                    loadToast("generic_area", 2500, "rounded");
                                }
                            }
                        });
                    }
                });

                changeLanguage();
                $(controlsWrapper).show(500);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function loadInventory(id, htmlElement){
    var data = new Object();

    $server.request({
        service: 'inventory-gmp-pest-control-self-inspection',
        data: {"room_id":id},
        success: function(response){
            $(htmlElement).hide();
            gmpPackingHandWashingInventoryTable(htmlElement, response.data);
            /*dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            dynamicSearchBind("type-search", "type-column");*/
            changeLanguage();
            $(htmlElement).show(400);
        }
    });
}

function inventoryRowWrapper(item){
    console.log("Wrapper called");
    return gmpPackingHandWashingInventoryRow(item);
}

function gmpPackingHandWashingInventoryTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"inventory_position"},{"type":"th","classes":"inventory_id"},{"type":"th","classes":"inventory_name"},{"type":"th","classes":"inventory_dismiss"}]},{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}},{"type":"td","contents":""}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item add-item-element","fieldType":"text","validations":{"type":"text","max":{"value":80},"required":{"value":true}},"data":{"param":{"name":"name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = {"type":"tbody","rows":[]};

    for(var item of data){
        tableJSON.tbody.rows.push(gmpPackingHandWashingInventoryRow(item));
    }

    $(htmlElement).append(table(tableJSON));

    $("#add_inventory").on("click",function(e){
        addItemToInventory("gmp-pest-control-self-inspection", false);
    });

    $("input:checkbox").on("change",function(){
        var itemID = $(this).data("id");
        toggleItem("gmp-pest-control-self-inspection", itemID);
    });
}

function gmpPackingHandWashingInventoryRow(item){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"inventory_" + item.id,"classes":"ui-sortable-handle","columns":[]};

    if(item.is_active == 0){
        inventoryRow.classes = inventoryRow.classes + " grey-text";
    }

    // Add information columns. Remember the class "search-column" for dynamic
    // search binding
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"position-column"});
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"id-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.name,"classes":"name-column search-column"});

    // Add switch to toggle activaction or deactivation of the item
    inventoryRow.columns.push({"type":"td","contents":gmpPackingHandWashingSwitch(item)});

    return inventoryRow;
}

function gmpPackingHandWashingSwitch(item){
    var switchField = {"type":"switch","id":"switch_" + item.id,"data":{"id":item.id}};

    if(item.is_active == 1){
        switchField.checked = true;
    }

    var switchInput = {"field":switchField};

    return switchInput;
}
