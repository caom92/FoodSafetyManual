function addInventoryManager(controlsWrapper, contentWrapper){
    $("#log_name").html("Pre-operational Inspection");
    addAreaSelect(controlsWrapper, contentWrapper);
}

// Functions exclusive to gmp-packing-preop

function addAreaSelect(controlsWrapper, contentWrapper){
    $server.request({
        service: 'get-areas-of-zone',
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                var areaSelectRow = {"columns":[]};

                // Select with all areas
                var areaSelectInput = {"id":"areaSelectWrapper","classes":"input-field col s6 m6 l6"};
                var areaSelect = {"type":"select","id":"area-select","options":[]};

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
                            service: 'add-workplace-area',
                            data: {area_name: input.val()},
                            success: function(response) {
                                if (response.meta.return_code == 0) {
                                    var option = createOption({"value":response.data.id,"text":response.data.name});
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

function gmpScaleCalibrationInventoryTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"inventory_position"},{"type":"th","classes":"inventory_id"},{"type":"th","classes":"inventory_name"},{"type":"th","classes":"inventory_type"},{"type":"th","classes":"inventory_dismiss"}]},{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"name-search","classes":"validate name_search","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type-search","classes":"type_search","options":[{"classes":"any_type","value":""}]}}},{"type":"td","contents":""}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"name_add","classes":"validate add_item","fieldType":"text"}}},{"type":"td","contents":{"field":{"type":"select","id":"type_add","classes":"type_search","options":[{"classes":"select_option","value":"","disabled":true,"selected":true}]}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = [];

    for(var type of data){
        var typeBody = {"type":"tbody","id":"type_" + type.id,"classes":"ui-sortable","rows":[]};
        tableJSON.thead.rows[1].columns[3].contents.field.options.push({"value":type.name,"text":type.name});
        tableJSON.tfoot.rows[0].columns[3].contents.field.options.push({"value":type.id,"text":type.name});
        for(var item of type.inventory){
            typeBody.rows.push(gmpPackingScaleCalibrationInventoryRow(item, type.name));
        }
        tableJSON.tbody.push(typeBody);
    }

    console.log(tableJSON);

    $(htmlElement).append(table(tableJSON));

    $("input:checkbox").on("change",function(){
        var itemID = $(this).data("id");
        $server.request({
            service: 'toggle-item-activation',
            data: {item_id:itemID},
            success: function(response, message, xhr) {
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
                    initSortability();
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
    inventoryRow.columns.push({"type":"td","contents":item.position,"classes":"position-column"});
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

function loadInventory(areaID, htmlElement){
    var data = new Object();
    data.area_id = areaID;
    console.log(data);

    $server.request({
        service: 'get-items-of-area',
        data: data,
        success: function(response){
            $(htmlElement).hide();
            gmpScaleCalibrationInventoryTable(htmlElement, response.data);
            changeLanguage();
            initSortability();
            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("name-search", "name-column");
            dynamicSearchBind("type-search", "type-column");
            $(htmlElement).show(400);
        }
    });
}
