function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-finished-product',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var item = new Object();
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                item.id = 1;
                item.production_areas = report.log_info.production_areas;
                item.suppliers = report.log_info.suppliers;
                item.product_codes = report.log_info.product_codes;
                item.customers = report.log_info.customers;
                item.quality_types = report.log_info.quality_types;
                gmpPackingFinishedProductLog(item, htmlElement, false, true);
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendgmpPackingFinishedProductReport();
                    }                    
                });
                gmpPackingFinishedProductFunctionality({"isPrefilled":false});
                $("input").characterCounter();
                $("textarea").characterCounter();
                autocompleteActivator();
                dateActivator();
                $(htmlElement).append(report.html_footer);
                changeLanguage();
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    $server.request({
        service: 'authorization-report-gmp-packing-finished-product',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                var itemID = 1;
                for(var item of report.items.entries){
                    item.id = itemID;
                    item.quality_types = report.items.log_info.quality_types;
                    gmpPackingFinishedProductLog(item, htmlElement, true, (itemID == report.items.entries.length));
                    itemID++;
                }
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPackingFinishedProductReport(parseInt(data.report_id));
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                loadFunctionality({"isPrefilled":true});
                changeLanguage();
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
                window.scrollTo(0, 0);
                $(htmlElement).fadeIn(500);
                autocompleteActivator();
                dateActivator();
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadFunctionality(data){
    gmpPackingFinishedProductFunctionality(data);
    return;
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingFinishedProductReport(data);
    //return;
}

function validateLog(){
    var errorCounter = 0;
    var returnValue = false;

    $('.formValidator').each(function(){
        if(!$(this).validate()){
            console.log("Invalid input");
            errorCounter++;
        }
    });

    if(errorCounter == 0){
        returnValue = true;
        Materialize.toast("Bitacora valida", 2500, "rounded");
    } else {
        Materialize.toast("Bitacora no valida", 2500, "rounded");
    }

    return returnValue;
}

function specialClearLog(){
    return;
}

function dateActivator(){
    $('.expires_datepicker').each(function(index, element){
        var itemID = $(this).data("item_id");
        var dateObj = datePicker("expiresHidden_" + itemID, null, new Date());
        $(this).pickadate(dateObj);
    });
}

function autocompleteActivator(){
    function autocompleteInit(){
        $("input.autocomplete").each(function(index, element){
            var autocomplete = $(this);
            if(!autocomplete.hasClass("autocomplete_active")){
                autocomplete.autocomplete({
                    data: JSON.parse(localStorage.country_codes)
                });
                autocomplete.addClass("autocomplete_active");
            }
        });
    }

    if(localStorage.country_codes){
        autocompleteInit();
    } else {
        $.getJSON( "data/files/countries.json", function( data ) {
            localStorage.country_codes = JSON.stringify(data);
            autocompleteInit();
        });
    }
}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendgmpPackingFinishedProductReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.entries = [];

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            console.log("ID: " + itemID);
            item.batch = $("#batch_" + itemID).val();
            item.production_area_id = $("#productionArea_" + itemID).val();
            item.supplier_id = $("#supplier_" + itemID).val();
            item.product_id = $("#product_" + itemID).val();
            item.customer_id = $("#client_" + itemID).val();
            item.quality_type_id = parseInt($("#quality_" + itemID).val());
            if($("#origin_" + itemID).val() != ""){
                item.origin = $("#origin_" + itemID).val();
            }
            if($("input[name='expiresHidden_" + itemID + "']").val() != ""){
                item.expiration_date = $("input[name='expiresHidden_" + itemID + "']").val();
            }
            item.water_temperature = parseFloat($("#water_" + itemID).val());
            item.product_temperature = parseFloat($("#packing_" + itemID).val());
            item.is_weight_correct = getBool($("input:radio[name='weight_radio_" + itemID + "']:checked").val());
            item.is_label_correct = getBool($("input:radio[name='label_radio_" + itemID + "']:checked").val());
            item.is_trackable = getBool($("input:radio[name='traceability_radio_" + itemID + "']:checked").val());
            item.notes = $("#comment_" + itemID).val();
            if($("#report_url_" + itemID).val().length != 0){
                item.album_url = $("#report_url_" + itemID).val();
            }
            report.entries.push(item);
        });

        console.log(report);
        console.log(JSON.stringify(report));

        $server.request({
            service: 'capture-gmp-packing-finished-product',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    clearLog();
                    $('ul.tabs').tabs('select_tab', 'manual_tab');
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#send_report").data("waiting", false);
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#send_report").data("waiting", false);
        $("#sending_log").hide();
    }
}

function updateGmpPackingFinishedProductReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.entries = [];

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            console.log("ID: " + itemID);
            item.batch = $("#batch_" + itemID).val();
            item.production_area_id = $("#productionArea_" + itemID).val();
            item.supplier_id = $("#supplier_" + itemID).val();
            item.product_id = $("#product_" + itemID).val();
            item.customer_id = $("#client_" + itemID).val();
            item.quality_type_id = parseInt($("#quality_" + itemID).val());
            if($("#origin_" + itemID).val() != ""){
                item.origin = $("#origin_" + itemID).val();
            }
            if($("input[name='expiresHidden_" + itemID + "']").val() != ""){
                item.expiration_date = $("input[name='expiresHidden_" + itemID + "']").val();
            }
            item.water_temperature = parseFloat($("#water_" + itemID).val());
            item.product_temperature = parseFloat($("#packing_" + itemID).val());
            item.is_weight_correct = getBool($("input:radio[name='weight_radio_" + itemID + "']:checked").val());
            item.is_label_correct = getBool($("input:radio[name='label_radio_" + itemID + "']:checked").val());
            item.is_trackable = getBool($("input:radio[name='traceability_radio_" + itemID + "']:checked").val());
            item.notes = $("#comment_" + itemID).val();
            if($("#report_url_" + itemID).val().length != 0){
                item.album_url = $("#report_url_" + itemID).val();
            }
            report.entries.push(item);
        });

        console.log(report);
        console.log(JSON.stringify(report));

        $server.request({
            service: 'update-gmp-packing-finished-product',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#sending_log").hide();
    }
}

function gmpPackingFinishedProductLog(data, htmlElement, isPrefilled, isLast){
    var log = $("<div>");
    var itemsCard = $("<div>");
    var addRow = new Object();
    var buttonRow = $("<div>");

    itemsCard.attr("id", "items-wrapper");

    addRow.columns = [gmpPackingFinishedProductItemAddButton(data), gmpPackingFinishedProductItemDelButton(data)];

    itemsCard.append(gmpPackingFinishedProductItem(data));

    log.append(itemsCard);

    log.append(createInputRow(addRow));

    if($("#send_report").length == 1){
        $('#send_report').parent().remove();
    }
    
    if(isLast === true){
        buttonRow.attr("id", "button_row");
        buttonRow.addClass("row");
        buttonRow.append(createButton(sendButton()));
        
        if(isPrefilled === true){
            buttonRow.append(createButton(approveButton()));
            buttonRow.append(createButton(rejectButton()));
            buttonRow.append(createButton(returnButton()));
        }

        log.append(buttonRow);
    }

    $(htmlElement).append(log);
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPackingFinishedProductItemAddButton(item){
    var areaAddInput = {"id":"addTestButtonWrapper_" + item.id,"classes":"input-field col s1 offset-s10 m1 offset-m10 l1 offset-l10"};
    var areaAddButton = {"type":"floating","id":"add_area_test_" + item.id,"classes":"btn-floating waves-effect waves-light green right test_button","data":{"item_id":item.id,"last_test":1,"item_data":item}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

function gmpPackingFinishedProductItemDelButton(item){
    var areaAddInput = {"id":"delTestButtonWrapper_" + item.id,"classes":"input-field col s1 m1 l1"};
    var areaAddButton = {"type":"floating","id":"del_area_test_" + item.id,"classes":"btn-floating waves-effect waves-light grey right delete_button","data":{"item_id":item.id,"last_test":1,"item_data":item}};
    var areaAddIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

function gmpPackingFinishedProductItem(item){
    var itemCard = $("<div>");
    var batchRow = new Object();
    var codesRow = new Object();
    var qualityRow = new Object();
    var temperatureRow = new Object();
    var infoRow = new Object();
    var notesRow = new Object();
    var urlRow = new Object();

    batchRow.columns = [gmpPackingFinishedProductItemBatch(item), gmpPackingFinishedProductItemProductionArea(item)];
    codesRow.columns = [gmpPackingFinishedProductItemSupplier(item), gmpPackingFinishedProductItemProduct(item), gmpPackingFinishedProductItemClient(item)];
    qualityRow.columns = [gmpPackingFinishedProductItemQuality(item), gmpPackingFinishedProductItemOrigin(item), gmpPackingFinishedProductItemExpires(item)];
    temperatureRow.columns = [gmpPackingFinishedProductItemWater(item), gmpPackingFinishedProductItemPacking(item)];
    infoRow.columns = [gmpPackingFinishedProductItemWeight(item), gmpPackingFinishedProductItemLabel(item), gmpPackingFinishedProductItemTrazable(item)];
    notesRow.columns = [gmpPackingFinishedProductItemNotes(item)];
    urlRow.columns = [gmpPackingFinishedProductItemAlbumURL(item)];

    itemCard.append(createInputRow(batchRow));
    itemCard.append(createInputRow(codesRow));
    itemCard.append(createInputRow(qualityRow));
    itemCard.append(createInputRow(temperatureRow));
    itemCard.append(createInputRow(infoRow));
    itemCard.append(createInputRow(notesRow));
    itemCard.append(createInputRow(urlRow));

    itemCard.addClass("card-panel white item-card");
    itemCard.attr("id", "item_" + item.id);
    itemCard.data("id", item.id);

    return itemCard;
}

function gmpPackingFinishedProductItemBatch(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"batch_title"}};
    var batchInput = {"type":"input","id": "batch_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var batchFullInput = {"id":"batchWrapper","classes":"input-field col s6 m6 l6","field":batchInput,"label":batchLabel};

    if(item.batch){
        batchInput.value = item.batch;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

// Temporary open fields

function gmpPackingFinishedProductItemProductionArea(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var batchInput = {"type":"input","id": "productionArea_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var batchFullInput = {"id":"productionAreaWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":batchInput,"label":batchLabel};

    if(item.production_area){
        batchInput.value = item.production_area;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

function gmpPackingFinishedProductItemSupplier(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"suppliers"}};
    var batchInput = {"type":"input","id": "supplier_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"min":{"value":2,"toast":"gmp-packing-finished-product-supplier"}}};
    var batchFullInput = {"id":"supplierWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":batchInput,"label":batchLabel};

    if(item.supplier){
        batchInput.value = item.supplier;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

function gmpPackingFinishedProductItemProduct(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"products"}};
    var batchInput = {"type":"input","id": "product_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"min":{"value":2,"toast":"gmp-packing-finished-product-product"}}};
    var batchFullInput = {"id":"productWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":batchInput,"label":batchLabel};

    if(item.product){
        batchInput.value = item.product;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

function gmpPackingFinishedProductItemClient(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"clients"}};
    var batchInput = {"type":"input","id": "client_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"min":{"value":2,"toast":"gmp-packing-finished-product-client"}}};
    var batchFullInput = {"id":"clientWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":batchInput,"label":batchLabel};

    if(item.customer){
        batchInput.value = item.customer;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

// Uncomment when we start using tables for production areas, suppliers, customers and products

/*function gmpPackingFinishedProductItemProductionArea(item){
    var areas = new Array();

    for(var area of item.production_areas){
        var tempOption = {"value":area.id,"text":area.name,"data":{"item_id":item.id}};
        if(item.area_id == area.id){
            tempOption.selected = true;
        }
        areas.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"area_title"}};
    var actionSelect =  {"type": "select", "id": "productionArea_" + item.id,"options": areas,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"productionAreaWrapper_" + item.id}};
    var actionSelectInput = {"id":"productionAreaWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingFinishedProductItemSupplier(item){
    var suppliers = new Array();

    for(var supplier of item.suppliers){
        var tempOption = {"value":supplier.id,"text":supplier.code,"data":{"item_id":item.id}};
        if(item.supplier_id == supplier.id){
            tempOption.selected = true;
        }
        suppliers.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"suppliers"}};
    var actionSelect =  {"type": "select", "id": "supplier_" + item.id, "options": suppliers,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"supplierWrapper_" + item.id}};
    var actionSelectInput = {"id":"supplierWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingFinishedProductItemProduct(item){
    var products = new Array();

    for(var product of item.product_codes){
        var tempOption = {"value":product.id,"text":product.code,"data":{"item_id":item.id}};
        if(item.product_id == product.id){
            tempOption.selected = true;
        }
        products.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"products"}};
    var actionSelect =  {"type": "select", "id": "product_" + item.id, "options": products,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"productWrapper_" + item.id}};
    var actionSelectInput = {"id":"productWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingFinishedProductItemClient(item){
    var clients = new Array();

    for(var client of item.customers){
        var tempOption = {"value":client.id,"text":client.company_name,"data":{"item_id":item.id}};
        if(item.client_id == client.id){
            tempOption.selected = true;
        }
        clients.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"clients"}};
    var actionSelect =  {"type": "select", "id": "client_" + item.id, "options": clients,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true,"toast":"gmp-packing-preop-item-corrective-action"},"wrapper":"clientWrapper_" + item.id}};
    var actionSelectInput = {"id":"clientWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}*/

function gmpPackingFinishedProductItemQuality(item){
    var qualitys = new Array();

    for(var quality of item.quality_types){
        var tempOption = {"value":quality.id,"text":quality.name,"data":{"quality_code":quality.id}};
        if(item.quality_id == quality.id){
            tempOption.selected = true;
        }
        qualitys.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"quality_title"}};
    var actionSelect =  {"type": "select", "id": "quality_" + item.id, "options": qualitys,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true},"wrapper":"qualityWrapper_" + item.id}};
    var actionSelectInput = {"id":"qualityWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingFinishedProductItemOrigin(item){
    var origingLabel = {"type":"label","contents":{"type":"text","classes":"origin_title"}};
    var originInput = {"type":"input","id": "origin_" + item.id, "classes": "validate autocomplete", "fieldType":"text","validations":{"type":"text","max":{"value":3}}};
    var originFullInput = {"id":"originWrapper","classes":"input-field col s4 m4 l4","field":originInput,"label":origingLabel};

    if(item.origin){
        originInput.value = item.origin;
        origingLabel.classes = "active";
    }

    /*if(!localStorage.country_codes){
        $.getJSON( "data/files/countries.json", function( data ) {
            localStorage.country_codes = JSON.stringify(data);
        });
    }*/

    return originFullInput;
}

function gmpPackingFinishedProductItemExpires(item){
    var expiresLabel = {"type":"label","contents":{"type":"text","classes":"expires_title"}};
    var expiresInput = {"type":"date","id": "expires_" + item.id, "classes":"expires_datepicker validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}},"data":{"item_id":item.id}};
    var expiresFullInput = {"id":"expiresWrapper_" + item.id,"classes":"input-field col s4 m4 l4","field":expiresInput,"label":expiresLabel};

    if(item.expiration_date){
        expiresInput.value = item.expiration_date;
        expiresLabel.classes = "active";
    }

    return expiresFullInput;
}

function gmpPackingFinishedProductItemWater(item){
    var waterLabel = {"type":"label","contents":{"type":"text","classes":"water_temperature"}};
    var waterInput = {"type":"input","id": "water_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"number","required":{"value":true,"toast":"gmp-packing-finished-product-water"}}};
    var waterFullInput = {"id":"waterWrapper","classes":"input-field col s6 m6 l6","field":waterInput,"label":waterLabel};

    if(item.water_temperature){
        waterInput.value = item.water_temperature;
        waterLabel.classes = "active";
    }

    return waterFullInput;
}

function gmpPackingFinishedProductItemPacking(item){
    var packingLabel = {"type":"label","contents":{"type":"text","classes":"packing_temperature"}};
    var packingInput = {"type":"input","id": "packing_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"number","required":{"value":true,"toast":"gmp-packing-finished-product-packing"}}};
    var packingFullInput = {"id":"packingWrapper","classes":"input-field col s6 m6 l6","field":packingInput,"label":packingLabel};

    if(item.product_temperature){
        packingInput.value = item.product_temperature;
        packingLabel.classes = "active";
    }

    return packingFullInput;
}

function gmpPackingFinishedProductItemWeight(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"correct_weight_title"}};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioAcceptable = {"type":"radio","id":"correct_weight_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"correct_weight_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"incorrect_weight" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"incorrect_weight" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"weight_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"weight_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-finished-product-weight"},"groupName":"weight_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"weight_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.is_weight_correct == 1){
        radioAcceptable.checked = true;
    } else if (item.is_weight_correct == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingFinishedProductItemLabel(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"correct_label_title"}};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioAcceptable = {"type":"radio","id":"correct_label_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"correct_label_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"incorrect_label" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"incorrect_label" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"label_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"label_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-finished-product-label"},"groupName":"label_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"label_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.is_label_correct == 1){
        radioAcceptable.checked = true;
    } else if (item.is_label_correct == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingFinishedProductItemTrazable(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"traceability_title"}};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioAcceptable = {"type":"radio","id":"correct_traceability_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"correct_traceability_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"incorrect_traceability" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"incorrect_traceability" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"traceability_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"traceability_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-finished-product-trace"},"groupName":"traceability_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"traceability_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.is_trackable == 1){
        radioAcceptable.checked = true;
    } else if (item.is_trackable == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingFinishedProductItemNotes(item){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"},"for":"comment_" + item.id};
    var commentInput = {"type":"textarea","id": "comment_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"id":item.id},"validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-item-comment"}}};
    var commentFullInput = {"id":"commentWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(item.notes){
        commentInput.value = item.notes;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingFinishedProductItemAlbumURL(item){
    var urlLabel = {"type":"label","contents":{"type":"text","classes":"url_title"}};
    var urlInput = {"type":"textarea","id": "report_url_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-report-url"}}};
    var urlFullInput = {"id":"reportUrlWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":urlInput,"label":urlLabel};

    if(item.album_url){
        urlInput.value = item.album_url;
        urlLabel.classes = "active";
    }

    return urlFullInput;
}

function gmpPackingFinishedProductFunctionality(data){
    console.log("Cargando funcionalidad");

    if(data.isPrefilled){
        $(".test_button").remove();
        $(".delete_button").remove();
    } else {
        $(".test_button").on("click", function(e){
            console.log($(this).data());
            var lastTest = $(this).data("last_test");
            var newItem = $(this).data("item_data");
            newItem.id = lastTest + 1;
            $("#items-wrapper").append(gmpPackingFinishedProductItem(newItem));
            $(this).data("last_test", lastTest + 1);
            $("#del_area_test_1").data("last_test", lastTest + 1);
            if($("#del_area_test_1").hasClass("grey")){
                $("#del_area_test_1").removeClass("grey");
                $("#del_area_test_1").addClass("red");
            }
            autocompleteActivator();
            dateActivator();
            changeLanguage();
        });

        $(".delete_button").on("click", function(e){
            var lastTest = $(this).data("last_test");
            if(lastTest > 1){
                $("#item_" + lastTest).remove();
                $(this).data("last_test", lastTest - 1);
                $("#add_area_test_1").data("last_test", lastTest - 1);
                changeLanguage();
            }
            if(lastTest - 1 == 1){
                $(this).removeClass("red");
                $(this).addClass("grey");
            }
        });
    }
}

// Full report

function gmpPackingFinishedProductReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;
    //report.style = "display: block; overflow: scroll;";

    report.tbody = [];

    //report.thead = gmpPackingFinishedProductHeader();
    for(var item of data.entries){
        report.tbody.push(gmpPackingFinishedProductBody(item));
    }
    
    console.log(JSON.stringify(report));
    console.log(report);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPackingFinishedProductHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"batch_title batchColumn"},{"type":"th","classes":"area_title areaColumn"},{"type":"th","classes":"suppliers suppliersColumn"},{"type":"th","classes":"products productsColumn"},{"type":"th","classes":"clients clientsColumn"},{"type":"th","classes":"quality_title qualityColumn"},{"type":"th","classes":"origin_title originColumn"},{"type":"th","classes":"expires_title expiresColumn"},{"type":"th","classes":"water_temperature_short waterColumn"},{"type":"th","classes":"packing_temperature_short packingColumn"},{"type":"th","classes":"correct_weight_title weightColumn"},{"type":"th","classes":"correct_label_title labelColumn"},{"type":"th","classes":"traceability_title traceabilityColumn"},{"type":"th","classes":"notes_title notesColumn"}]}]};

    return header;
}

// Body containing all the information

function gmpPackingFinishedProductBody(data){
    var body = {"type":"tbody"};

    //body.rows = new Array();

    /*for(var item of data.entries){
        var row = {"type":"tr"};
        row.columns = gmpPackingFinishedProductReportItem(item);
        body.rows.push(row);
    }*/

    body.rows = gmpPackingFinishedProductReportItem(data);

    return body;
}

function gmpPackingFinishedProductReportItem(itemData){
    var item = new Array();

    var batchRow = {"type":"tr","columns":[]};
    var contactRow = {"type":"tr","columns":[]};
    var qualityRow = {"type":"tr","columns":[]};
    var temperatureTopRow = {"type":"tr","columns":[]};
    var temperatureBotRow = {"type":"tr","columns":[]};
    var controlRow = {"type":"tr","columns":[]};
    var notesRow = {"type":"tr","columns":[]};
    var albumRow = {"type":"tr","columns":[]};

    batchRow.columns.push({"type":"td","classes":"batchColumn","contents":"<span class='batch_title'></span>: " + itemData.batch});
    batchRow.columns.push({"type":"td","classes":"areaColumn","contents":"<span class='area_title'></span>: " + itemData.production_area,"colspan":2});
    contactRow.columns.push({"type":"td","classes":"suppliersColumn","contents":"<span class='suppliers'></span>: " + itemData.supplier});
    contactRow.columns.push({"type":"td","classes":"productsColumn","contents":"<span class='products'></span>: " + itemData.product});
    contactRow.columns.push({"type":"td","classes":"clientsColumn","contents":"<span class='clients'></span>: " + itemData.customer});
    qualityRow.columns.push({"type":"td","classes":"qualityColumn","contents":"<span class='quality_title'></span>: " + itemData.quality});
    qualityRow.columns.push({"type":"td","classes":"originColumn","contents":"<span class='origin_title'></span>: " + itemData.origin});
    qualityRow.columns.push({"type":"td","classes":"expiresColumn","contents":"<span class='expires_title'></span>: " + itemData.expiration_date});
    temperatureTopRow.columns.push({"type":"td","classes":"waterColumn","contents":"<span class='water_temperature'></span>: " + itemData.water_temperature,"colspan":3});
    temperatureBotRow.columns.push({"type":"td","classes":"packingColumn","contents":"<span class='packing_temperature'></span>: " + itemData.product_temperature,"colspan":3});
    if(itemData.is_weight_correct == 1){
        controlRow.columns.push({"type":"td","classes":"weightColumn","contents":"<span class='correct_weight_title'></span>: <span class='yes_tag'></span>"});
    } else {
        controlRow.columns.push({"type":"td","classes":"weightColumn","contents":"<span class='correct_weight_title'></span>: <span class='no_tag'></span>"});
    }
    if(itemData.is_label_correct == 1){
        controlRow.columns.push({"type":"td","classes":"labelColumn","contents":"<span class='correct_label_title'></span>: <span class='yes_tag'></span>"});
    } else {
        controlRow.columns.push({"type":"td","classes":"labelColumn","contents":"<span class='correct_label_title'></span>: <span class='no_tag'></span>"});
    }
    if(itemData.is_trackable == 1){
        controlRow.columns.push({"type":"td","classes":"traceabilityColumn","contents":"<span class='traceability_title'></span>: <span class='yes_tag'></span>"});
    } else {
        controlRow.columns.push({"type":"td","classes":"traceabilityColumn","contents":"<span class='traceability_title'></span>: <span class='no_tag'></span>"});
    }
    notesRow.columns.push({"type":"td","classes":"notesColumn","contents":"<span class='notes_title'></span>: " + itemData.notes,"colspan":3});
    albumRow.columns.push({"type":"td","classes":"notesColumn","contents":"<span class='url_title'></span>: <a href='" + itemData.album_url + "' >" + itemData.album_url + "</a>","colspan":3});

    item.push(batchRow);
    item.push(contactRow);
    item.push(qualityRow);
    item.push(temperatureTopRow);
    item.push(temperatureBotRow);
    item.push(controlRow);
    item.push(notesRow);
    item.push(albumRow);

    return item;
}

// Footer

function gmpPackingFinishedProductFooter(data){

}

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.typeTitle{ background-color: yellow; width:588px;}.fullColumn{ background-color: #D3D3D3;width:631px;}.testColumn{ width:147px;}.numberColumn{ width:147px;}.timeColumn{ width:43px;}.statusColumn{ width:147px;}.sanitizedColumn{ width:147px;}</style>';
}
