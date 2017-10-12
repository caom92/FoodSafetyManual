var agedProductCountryCodes = null;

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-aged-product',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var item = new Object();
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                item.id = 1;
                item.quality_types = report.log_info.quality_types;
                item.actions = report.log_info.actions;
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
        service: 'authorization-report-gmp-packing-aged-product',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                changesFlag = false;
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                var itemID = 1;
                for(var item of report.items.entries){
                    item.id = itemID;
                    item.quality_types = report.items.quality_types;
                    item.actions = report.items.actions;
                    gmpPackingFinishedProductLog(item, htmlElement, true, (itemID == report.items.entries.length));
                    itemID++;
                }
                bindChangeListener();
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPackingFinishedProductReport(parseInt(data.report_id), report.creation_date);
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                loadFunctionality({"isPrefilled":true});
                changeLanguage();
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
                window.scrollTo(0, 0);
                $("#preloader_wrapper").hide();
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

function additionalLoadReportControls(htmlDocument, data){
    return;
}

function logHasEmail(){
    return false;
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
        if(!$(this).hasClass("date_active")){
            console.log("activates date")
            $(this).addClass("date_active");
            var itemID = $(this).data("item_id");
            var dateObj = datePicker("expiresHidden_" + itemID, null, null);
            var datePickerObj = $(this).pickadate(dateObj);
            datePickerObj = datePickerObj.pickadate('picker');
            datePickerObj.set('select', $(this).val(), { format: 'yyyy-mm-dd' });
        }
    });
}

function autocompleteActivator(){
    function autocompleteInit(){
        $("input.autocomplete").each(function(index, element){
            var autocomplete = $(this);
            if(!autocomplete.hasClass("autocomplete_active")){
                if(agedProductCountryCodes == null){
                    agedProductCountryCodes = JSON.parse(localStorage.country_codes)
                }
                autocomplete.autocomplete({
                    data: agedProductCountryCodes
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
            agedProductCountryCodes = data;
            autocompleteInit();
        });
    }
}

function pdfReportOrientation(){
    return "L";
}

function pdfReportFontsize(){
    return "8";
}

function loadImageArray(data){
    return null;
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
            item.warehouse = $("#productionArea_" + itemID).val();
            item.vendor = $("#supplier_" + itemID).val();
            item.item = $("#product_" + itemID).val();
            item.age = (new Date(report.date) - new Date($("input[name='expiresHidden_" + itemID + "']").val())) / (1000 * 60 * 60 * 24);
            item.quality_id = parseInt($("#quality_" + itemID).val());
            if($("#origin_" + itemID).val() != ""){
                item.origin = $("#origin_" + itemID).val();
            }
            if($("input[name='expiresHidden_" + itemID + "']").val() != ""){
                item.packed_date = $("input[name='expiresHidden_" + itemID + "']").val();
            }
            item.quantity = parseInt($("#water_" + itemID).val());
            item.location = $("#packing_" + itemID).val();
            item.action_id = parseInt($("#action_" + itemID).val());
            if($("#comment_" + itemID).val().length != 0){
                item.notes = $("#comment_" + itemID).val();
            }
            if($("#report_url_" + itemID).val().length != 0){
                item.album_url = $("#report_url_" + itemID).val();
            }
            report.entries.push(item);
        });

        console.log(report);
        console.log(JSON.stringify(report));

        $server.request({
            service: 'capture-gmp-packing-aged-product',
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

function updateGmpPackingFinishedProductReport(reportID, creationDate){
    var report = new Object();

    report.report_id = reportID;
    report.entries = [];

    console.log(creationDate);

    if(validateLog()){
        $(".item-card").each(function(){
            var item = new Object();
            var itemID = $(this).data("id");
            console.log("ID: " + itemID);
            item.batch = $("#batch_" + itemID).val();
            item.warehouse = $("#productionArea_" + itemID).val();
            item.vendor = $("#supplier_" + itemID).val();
            item.item = $("#product_" + itemID).val();
            item.age = (new Date(creationDate) - new Date($("input[name='expiresHidden_" + itemID + "']").val())) / (1000 * 60 * 60 * 24);
            item.quality_id = parseInt($("#quality_" + itemID).val());
            if($("#origin_" + itemID).val() != ""){
                item.origin = $("#origin_" + itemID).val();
            }
            if($("input[name='expiresHidden_" + itemID + "']").val() != ""){
                item.packed_date = $("input[name='expiresHidden_" + itemID + "']").val();
            }
            item.quantity = parseInt($("#water_" + itemID).val());
            item.location = $("#packing_" + itemID).val();
            item.action_id = parseInt($("#action_" + itemID).val());
            if($("#comment_" + itemID).val().length != 0){
                item.notes = $("#comment_" + itemID).val();
            }
            if($("#report_url_" + itemID).val().length != 0){
                item.album_url = $("#report_url_" + itemID).val();
            }
            report.entries.push(item);
        });

        console.log(report);
        console.log(JSON.stringify(report));

        $server.request({
            service: 'update-gmp-packing-aged-product',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
                    changesFlag = false;
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

    console.log(data);
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

    batchRow.columns = [gmpPackingFinishedProductItemBatch(item), gmpPackingFinishedProductItemProductionArea(item), gmpPackingFinishedProductItemSupplier(item), gmpPackingFinishedProductItemProduct(item), /*gmpPackingFinishedProductItemClient(item),*/ gmpPackingFinishedProductItemOrigin(item)];
    qualityRow.columns = [gmpPackingFinishedProductItemQuality(item), gmpPackingFinishedProductItemExpires(item), gmpPackingFinishedProductItemWater(item), gmpPackingFinishedProductItemPacking(item), gmpPackingFinishedProductActions(item)];
    //temperatureRow.columns = [gmpPackingFinishedProductItemWater(item), gmpPackingFinishedProductItemPacking(item)];
    //infoRow.columns = [gmpPackingFinishedProductItemWeight(item), gmpPackingFinishedProductItemLabel(item), gmpPackingFinishedProductItemTrazable(item)];
    //infoRow.columns = [gmpPackingFinishedProductActions(item)];
    notesRow.columns = [gmpPackingFinishedProductItemNotes(item), gmpPackingFinishedProductItemAlbumURL(item)];
    //urlRow.columns = [gmpPackingFinishedProductItemAlbumURL(item)];

    itemCard.append(createInputRow(batchRow));
    //itemCard.append(createInputRow(codesRow));
    itemCard.append(createInputRow(qualityRow));
    //itemCard.append(createInputRow(temperatureRow));
    //itemCard.append(createInputRow(infoRow));
    itemCard.append(createInputRow(notesRow));
    //itemCard.append(createInputRow(urlRow));

    itemCard.addClass("card-panel white item-card");
    itemCard.attr("id", "item_" + item.id);
    itemCard.data("id", item.id);

    return itemCard;
}

function gmpPackingFinishedProductItemBatch(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"batch_title"}};
    var batchInput = {"type":"input","id": "batch_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var batchFullInput = {"id":"batchWrapper","classes":"input-field col s3 m3 l3","field":batchInput,"label":batchLabel};

    if(item.batch){
        batchInput.value = item.batch;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

// Temporary open fields

function gmpPackingFinishedProductItemProductionArea(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"warehouse_title"}};
    var batchInput = {"type":"input","id": "productionArea_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var batchFullInput = {"id":"productionAreaWrapper_" + item.id,"classes":"input-field col s3 m3 l3","field":batchInput,"label":batchLabel};

    if(item.warehouse){
        batchInput.value = item.warehouse;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

function gmpPackingFinishedProductItemSupplier(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"zone_provider"}};
    var batchInput = {"type":"input","id": "supplier_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var batchFullInput = {"id":"supplierWrapper_" + item.id,"classes":"input-field col s2 m2 l2","field":batchInput,"label":batchLabel};

    if(item.vendor){
        batchInput.value = item.vendor;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

function gmpPackingFinishedProductItemProduct(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"item_title"}};
    var batchInput = {"type":"input","id": "product_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255},"min":{"value":1,"toast":"gmp-packing-finished-product-product"}}};
    var batchFullInput = {"id":"productWrapper_" + item.id,"classes":"input-field col s2 m2 l2","field":batchInput,"label":batchLabel};

    if(item.item){
        batchInput.value = item.item;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}

/*function gmpPackingFinishedProductItemClient(item){
    var batchLabel = {"type":"label","contents":{"type":"text","classes":"days_old"}};
    var batchInput = {"type":"input","id": "client_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"number"}};
    var batchFullInput = {"id":"clientWrapper_" + item.id,"classes":"input-field col s2 m2 l2","field":batchInput,"label":batchLabel};

    if(item.age){
        batchInput.value = item.age;
        batchLabel.classes = "active";
    }

    return batchFullInput;
}*/

function gmpPackingFinishedProductItemQuality(item){
    var qualitys = new Array();

    console.log(item)

    for(var quality of item.quality_types){
        var tempOption = {"value":quality.id,"text":quality.name,"data":{"quality_code":quality.id}};
        if(item.quality_id == quality.id){
            tempOption.selected = true;
        }
        qualitys.push(tempOption);
    }

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"quality_title"}};
    var actionSelect =  {"type": "select", "id": "quality_" + item.id, "options": qualitys,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true},"wrapper":"qualityWrapper_" + item.id}};
    var actionSelectInput = {"id":"qualityWrapper_" + item.id,"classes":"input-field col s3 m3 l3","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingFinishedProductItemOrigin(item){
    var origingLabel = {"type":"label","contents":{"type":"text","classes":"origin_title"}};
    var originInput = {"type":"input","id": "origin_" + item.id, "classes": "validate autocomplete", "fieldType":"text","validations":{"type":"text","max":{"value":3}}};
    var originFullInput = {"id":"originWrapper","classes":"input-field col s2 m2 l2","field":originInput,"label":origingLabel};

    if(item.origin){
        originInput.value = item.origin;
        origingLabel.classes = "active";
    }

    return originFullInput;
}

function gmpPackingFinishedProductItemExpires(item){
    var expiresLabel = {"type":"label","contents":{"type":"text","classes":"date_name"},"for":"expires_" + item.id,"classes":"active"};
    var expiresInput = {"type":"date","id": "expires_" + item.id, "classes":"expires_datepicker validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}},"data":{"item_id":item.id}};
    var expiresFullInput = {"id":"expiresWrapper_" + item.id,"classes":"input-field col s2 m2 l2","field":expiresInput,"label":expiresLabel};

    if(item.packed_date){
        expiresInput.value = item.packed_date;
        expiresLabel.classes = "active";
    }

    return expiresFullInput;
}

function gmpPackingFinishedProductItemWater(item){
    var waterLabel = {"type":"label","contents":{"type":"text","classes":"quantity_long_title"}};
    var waterInput = {"type":"input","id": "water_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"number","required":{"value":true,"toast":"gmp-packing-finished-product-water"}}};
    var waterFullInput = {"id":"waterWrapper","classes":"input-field col s2 m2 l2","field":waterInput,"label":waterLabel};

    if(item.quantity){
        waterInput.value = item.quantity;
        waterLabel.classes = "active";
    }

    return waterFullInput;
}

function gmpPackingFinishedProductItemPacking(item){
    var packingLabel = {"type":"label","contents":{"type":"text","classes":"location"}};
    var packingInput = {"type":"input","id": "packing_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":255}}};
    var packingFullInput = {"id":"packingWrapper","classes":"input-field col s2 m2 l2","field":packingInput,"label":packingLabel};

    if(item.location){
        packingInput.value = item.location;
        packingLabel.classes = "active";
    }

    return packingFullInput;
}

function gmpPackingFinishedProductActions(item, selectedValue){
    var actions = new Array();
    console.log("ITEM");
    console.log(item);

    for(let action of item.actions){
        var tempOption = {"value":action.id,"text":action.name,"data":{"action_code":action.id}};
        if(parseInt(item.action_id) == parseInt(action.id)){
            tempOption.selected = true;
        }
        actions.push(tempOption);
    }

    var selectLabel = {"type": "label","contents": {"type":"text","classes":"aged_product_action"}};
    var actionSelect =  {"type": "select", "id": "action_" + item.id, "options": actions,"data":{"item_id":item.id},"validations":{"type":"select","required":{"value":true},"wrapper":"actionWrapper_" + item.id}};
    var actionSelectInput = {"id":"actionWrapper_" + item.id,"classes":"input-field col s3 m3 l3","field":actionSelect,"label":selectLabel,"data":{"item_id":item.id}};

    return actionSelectInput;

    /*var actions = new Array();

    var statusLabel = {"type": "label","contents": {"type":"text","classes":"aged_product_action"},"for":"action_radioGroup_"  + item.id};

    var isFirst = true;

    for(var action of item.actions){
        var tempLabel = {"type":"text","classes":"big","text":action.name};
        var tempRadio = {"type":"radio","id":"action_" + item.id + "_" + action.id,"classes":"timeChanger","value":action.id,"label":{"type":"label","classes":"black-text","for":"action_" + item.id + "_" + action.id,"contents": tempLabel},"data":{"item_id":item.id}};;
        if(isFirst){
            tempRadio.checked = true;
            isFirst = false;
        }
        if(item.action_id == action.id){
            tempRadio.checked = true;
        }
        actions.push(tempRadio);
    }

    var itemRadioGroup = {"type": "radioGroup", "id":"action_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"action_radio_" + item.id,"radioArray":actions,"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-finished-product-weight"},"groupName":"action_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"weight_radioWrapper_" + item.id,"classes":"col s12 m12 l12","field":itemRadioGroup};

    // TODO: Assign value for auth report

    return groupInput;*/
}

function gmpPackingFinishedProductItemNotes(item){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"},"for":"comment_" + item.id};
    var commentInput = {"type":"textarea","id": "comment_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"id":item.id},"validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-item-comment"}}};
    var commentFullInput = {"id":"commentWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":commentInput,"label":commentLabel};

    if(item.notes){
        commentInput.value = item.notes;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingFinishedProductItemAlbumURL(item){
    var urlLabel = {"type":"label","contents":{"type":"text","classes":"url_title"}};
    var urlInput = {"type":"textarea","id": "report_url_" + item.id, "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-report-url"}}};
    var urlFullInput = {"id":"reportUrlWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":urlInput,"label":urlLabel};

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
    report.style = "display: block; overflow: scroll;";

    report.tbody = [];

    report.thead = gmpPackingFinishedProductHeader();
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
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"batch_title batchColumn"},{"type":"th","classes":"warehouse_title areaColumn"},{"type":"th","classes":"zone_provider suppliersColumn"},{"type":"th","classes":"item_title productsColumn"},{"type":"th","classes":"days_old clientsColumn"},{"type":"th","classes":"quality_title qualityColumn"},{"type":"th","classes":"origin_title originColumn"},{"type":"th","classes":"date_name expiresColumn"},{"type":"th","classes":"quantity_long_title waterColumn"},{"type":"th","classes":"location packingColumn"},{"type":"th","classes":"aged_product_action actionColumn"},{"type":"th","classes":"url_title urlColumn"},{"type":"th","classes":"notes_title notesColumn"}]}]};

    return header;
}

// Body containing all the information

function gmpPackingFinishedProductBody(data){
    var body = {"type":"tbody"};

    body.rows = gmpPackingFinishedProductReportItem(data);

    return body;
}

function gmpPackingFinishedProductReportItem(itemData){
    var item = new Array();

    var firstRowContent  = {"type":"tr","columns":[]};

    firstRowContent.columns.push({"type":"td","classes":"batchColumn","contents":itemData.batch});
    firstRowContent.columns.push({"type":"td","classes":"areaColumn","contents":itemData.warehouse});
    firstRowContent.columns.push({"type":"td","classes":"suppliersColumn","contents":itemData.vendor});
    firstRowContent.columns.push({"type":"td","classes":"productsColumn","contents":itemData.item});
    firstRowContent.columns.push({"type":"td","classes":"clientsColumn","contents":itemData.age});
    firstRowContent.columns.push({"type":"td","classes":"qualityColumn","contents":itemData.quality});

    firstRowContent.columns.push({"type":"td","classes":"originColumn","contents":itemData.origin});
    firstRowContent.columns.push({"type":"td","classes":"expiresColumn","contents":itemData.packed_date});
    firstRowContent.columns.push({"type":"td","classes":"waterColumn","contents":itemData.quantity});
    firstRowContent.columns.push({"type":"td","classes":"packingColumn","contents":itemData.location});
    firstRowContent.columns.push({"type":"td","classes":"actionColumn","contents":itemData.action_name});
    firstRowContent.columns.push({"type":"td","classes":"urlColumn","contents":"<a href='" + itemData.album_url + "' >" + "View Report" + "</a>"});
    firstRowContent.columns.push({"type":"td","classes":"notesColumn","contents":itemData.notes});

    item.push(firstRowContent);

    return item;
}

// Footer

function gmpPackingFinishedProductFooter(data){

}

function getCSS(){
    return `<style>
        table { 
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td {
            border: 1px solid #000000;
            text-align: left;
        }

        th { 
            border: 1px solid #000000;
            text-align: left;
            font-weight: bold;
            background-color: #4CAF50;
        }

        .batchColumn {
            width: 60px;
        }

        .areaColumn {
            width: 65px;
        }

        .suppliersColumn {
            width: 60px;
        }

        .productsColumn {
            width: 60px;
        }

        .clientsColumn {
            width: 60px;
        }

        .qualityColumn {
            width: 65px;
        }

        .originColumn{
            width: 50px;
        }

        .expiresColumn {
            width: 60px;
        }

        .waterColumn {
            width: 50px;
        }

        .packingColumn {
            width: 52px;
        }

        .actionColumn {
            width: 60px;
        }

        .urlColumn {
            width: 67px;
        }

        .notesColumn {
            width: 231px;
        }

        </style>`;
}
