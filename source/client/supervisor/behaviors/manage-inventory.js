function dynamicSearchBind(input, column){
    function isBound(input){
        return input.is('[class*="bound-by-"');
    }

    if($("#" + input).is("input")){
        $("#" + input).keyup(function (e) {
            $("." + column).each(function (e) {
                if($(this).text().search($("#" + input).val()) != -1){
                    if(isBound($(this).parent())){
                        $(this).parent().removeClass("bound-by-" + input);
                        if(!isBound($(this).parent())){
                            $(this).parent().attr("style", "");
                        }
                    }
                } else {
                    console.log("Hidden by keyup");
                    $(this).parent().attr("style", "display:none;");
                    $(this).parent().addClass("bound-by-" + input);
                }
            });
            checkSortability();
        });
    } else {
        $("#" + input).change(function (e) {
            console.log($(this));
            $("." + column).each(function (e) {
                if($(this).text().search($("#" + input).val()) == 0){
                    if(isBound($(this).parent())){
                        $(this).parent().removeClass("bound-by-" + input);
                        if(!isBound($(this).parent())){
                            $(this).parent().attr("style", "");
                        }
                    }
                } else {
                    console.log($(this));
                    console.log("Hidden by change");
                    $(this).parent().attr("style", "display:none;");
                    $(this).parent().addClass("bound-by-" + input);
                }
            });
            checkSortability();
        });
    }
}

function checkSortability(){
    $("tbody").each(function(index){
        if($(this).children().length != $(this).children().filter(":visible").length) {
            console.log("Sortable disabled");
            $(this).sortable("disable");
        } else {
            console.log("Sortable enabled");
            $(this).sortable("enable");
        }
    });
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
                    data.item_id = parseInt(itemID);
                    data.position = parseInt(order);
                    console.log(data);
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

function logCard(name, suffix){
    var card = $("<div>");

    card.addClass("card-panel white waves-effect waves-green");
    card.attr("style", "display:block;");

    card.append(name);

    card.data("link", "manage-inventory?_="+suffix);

    card.on('click', function(event) {
        // prevent normal navigation
        event.preventDefault();

        // get the layout that is being requested 
        var targetLayout = $(this).data('link');

        // push the state to the history stack
        window.history.pushState({ layout: targetLayout }, '', targetLayout);

        // load the requested layout
        $app.load(targetLayout); 
    });

    return card;
}

function validateNewItem(){
    var returnValue = true;

    $('.add-item-element').each(function(){
        if(!$(this).validate()){
            returnValue = false;
        }
    });

    return returnValue;
}

function addItemToInventory(logSuffix, isSortable){
    // Object that will have the parameters that are meant to be sent
    // to the server
    var data = new Object();
    var item = new Object();

    if(validateNewItem()){
        // If the input is valid, we build the object accordingly
        $(".add-item-element").each(function(){
            if($(this).is("input") || $(this).is("select")){
                var param = $(this).data("param").name;
                if($(this).data("param").type == "text"){
                    data[param] = $(this).val();
                    item[param] = $(this).val();
                } else if($(this).data("param").type == "number") {
                    data[param] = Number($(this).val());
                    item[param] = Number($(this).val());
                }
            }
        });

        // Once the object is built, we call for the service to
        // add our item, which is add-item-suffix
        $server.request({
            service: 'add-' + logSuffix,
            data: data,
            success: function(response){
                // When the function is succesful, we must create a new item
                // object that must be added at the end 
                item.id = Number(response.data);
                item.is_active = 1;
                console.log(item);
                $("tbody").append(tableRow(inventoryRowWrapper(item)));
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 400);
                $(".add-item-element").each(function() {
                    if($(this).is("input")){
                        $(this).val("");
                    }
                });
                loadToast("item_add_success", 3500, "rounded");
                changeLanguage();
            }
        });
    } else {
        Materialize.toast("Entrada no valida", 2500, "rounded");
    }

    console.log(item);
    console.log(data);
}

function toggleItem(logSuffix, itemID){
    $server.request({
        service: 'toggle-' + logSuffix,
        data: {id:itemID},
        success: function(response, message, xhr) {
            console.log(itemID);
            if($("#inventory_" + itemID).hasClass("grey-text")){
                //console.log("item_row");
                loadToast("toggle_item_on_success", 3500, "rounded");
                $("#inventory_" + itemID).removeClass("grey-text");
            } else {
                //console.log("item_row");
                loadToast("toggle_item_off_success", 3500, "rounded");
                $("#inventory_" + itemID).addClass("grey-text");
            }
        }
    });
}

$(function(){
    var getParams = getURLQueryStringAsJSON();

    console.log(getParams);

    if(getParams._){
        $.getScript( "source/client/supervisor/scripts/inventory/" + getParams._ + ".js").done(function( data, textStatus, jqxhr ) {
            addInventoryManager("#controls_wrapper", "#content_wrapper");
        }).fail(function(jqxhr, settings, exception) {
            var privileges = JSON.parse(localStorage.privileges);

            console.log(privileges);

            $("#content_wrapper").html("");

            for(var zone of privileges.zones){
                for(var program of zone.programs){
                    for(var module of program.modules){
                        for(var log of module.logs){
                            $("#content_wrapper").append(logCard(log.name, log.suffix));
                        }
                    }
                }
            }

            initMaterialize();
            $("#content_wrapper").show(1000);
        });
    } else {
        var privileges = JSON.parse(localStorage.privileges);

            console.log(privileges);

            $("#content_wrapper").html("");

            for(var zone of privileges.zones){
                for(var program of zone.programs){
                    for(var module of program.modules){
                        for(var log of module.logs){
                            $("#content_wrapper").append(logCard(log.name, log.suffix));
                        }
                    }
                }
            }

            initMaterialize();
            $("#content_wrapper").show(1000);
    }

    changeLanguage();
});