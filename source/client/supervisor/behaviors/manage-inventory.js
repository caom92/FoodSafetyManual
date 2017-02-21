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

function initSortability(){
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
                        service: "change-order-of-item",
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
}

$(function(){
    var getParams = getURLQueryStringAsJSON();

    console.log(getParams);

    $.getScript( "source/client/supervisor/scripts/inventory/" + getParams._ + ".js", function( data, textStatus, jqxhr ) {
        addInventoryManager("#controls_wrapper", "#content_wrapper");
    });

    changeLanguage();
});