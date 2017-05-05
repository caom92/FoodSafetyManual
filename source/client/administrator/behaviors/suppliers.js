function suppliersTable(htmlElement, data){
    var tableJSON = {"type":"table","id":"sort","classes":"highlight","thead":{},"tbody":{},"tfoot":{}};

    tableJSON.thead = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"supplier_id"},{"type":"th","classes":"supplier_company"},{"type":"th","classes":"supplier_contact"},{"type":"th","classes":"supplier_phone_number"},{"type":"th","classes":"supplier_email"},{"type":"th","classes":"supplier_code"},{"type":"th","contents":""}]},{"type":"tr","columns":[{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"id-search","classes":"validate id_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"company-search","classes":"validate company_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"contact-search","classes":"validate contact_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"phone-search","classes":"validate phone_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"email-search","classes":"validate email_search","fieldType":"text"}}},{"type":"td","classes":"dynamic-search","contents":{"field":{"type":"input","id":"code-search","classes":"validate code_search","fieldType":"text"}}}]}]};

    tableJSON.tfoot = {"type":"tfoot","rows":[{"type":"tr","columns":[{"type":"td","contents":""},{"type":"td","contents":{"field":{"type":"input","id":"company_add","classes":"validate add_item add-supplier-element","fieldType":"text","validations":{"type":"text","max":{"value":128},"required":{"value":true}},"data":{"param":{"name":"company_name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"contact_add","classes":"validate add_item add-supplier-element","fieldType":"text","validations":{"type":"text","max":{"value":64},"required":{"value":true}},"data":{"param":{"name":"contact_name","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"phone_add","classes":"validate add_item add-supplier-element","fieldType":"text","validations":{"type":"text","max":{"value":16},"required":{"value":true}},"data":{"param":{"name":"phone_num","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"email_add","classes":"validate add_item add-supplier-element","fieldType":"text","validations":{"type":"text","max":{"value":64},"required":{"value":true}},"data":{"param":{"name":"email","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"input","id":"code_add","classes":"validate add_item add-supplier-element","fieldType":"text","validations":{"type":"text","max":{"value":4},"required":{"value":true}},"data":{"param":{"name":"code","type":"text"}}}}},{"type":"td","contents":{"field":{"type":"floating","id":"add_inventory","classes":"btn-floating waveseffect waves-light green center","icon":{"type":"icon","icon":"mdi-plus","size":"mdi-24px"}}}}]}]};

    tableJSON.tbody = {"type":"tbody","rows":[]};

    for(var item of data){
        tableJSON.tbody.rows.push(suppliersRow(item));
    }

    $(htmlElement).append(table(tableJSON));

    $("#add_inventory").on("click",function(e){
        addSupplier();
    });
}

function suppliersRow(item){
    // JSON for the inventory row
    var inventoryRow = {"type":"tr","id":"supplier_" + item.id,"classes":"ui-sortable-handle","columns":[]};

    // Add information columns. Remember the class "search-column" for dynamic
    // search binding
    inventoryRow.columns.push({"type":"td","contents":item.id,"classes":"id-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.name,"classes":"company-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.contact_name,"classes":"contact-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.phone_num,"classes":"phone-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.email,"classes":"email-column search-column"});
    inventoryRow.columns.push({"type":"td","contents":item.code,"classes":"code-column search-column"});

    return inventoryRow;
}

function validateSupplier(){
    var returnValue = true;

    $('.add-supplier-element').each(function(){
        if(!$(this).validate()){
            returnValue = false;
        }
    });

    return returnValue;
}

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
        });
    }
}

function addSupplier(){
    // Object that will have the parameters that are meant to be sent
    // to the server
    var data = new Object();
    var item = new Object();

    if(validateSupplier()){
        // If the input is valid, we build the object accordingly
        $(".add-supplier-element").each(function(){
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

        console.log(data);
        console.log(item);

        // Once the object is built, we call for the service to
        // add our item, which is add-item-suffix
        $server.request({
            service: 'add-supplier',
            data: data,
            success: function(response){
                // When the function is succesful, we must create a new item
                // object that must be added at the end 
                item.id = Number(response.data);
                item.name = item.company_name;
                $("tbody").append(tableRow(suppliersRow(item)));
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 400);
                $(".add-supplier-element").each(function() {
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
}

$(function(){
    $server.request({
        service: 'list-suppliers',
        success: function(response, message, xhr) {
            console.log(JSON.stringify(response.data));
            suppliersTable("#content_wrapper", response.data);
            dynamicSearchBind("id-search", "id-column");
            dynamicSearchBind("company-search", "company-column");
            dynamicSearchBind("contact-search", "contact-column");
            dynamicSearchBind("phone-search", "phone-column");
            dynamicSearchBind("email-search", "email-column");
            dynamicSearchBind("code-search", "code-column");
            changeLanguage();
        }
    });
});