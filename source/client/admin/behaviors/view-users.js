function addHeader(){
    var header = $("<thead>");
    var headerRow = $("<tr>");
    headerRow.append($('<th data-field="user_id" class="employee_id"></th>'));
    headerRow.append($('<th data-field="username" class="username"></th>'));
    headerRow.append($('<th data-field="fullname" class="real_name"></th>'));
    headerRow.append($('<th data-field="edit" class="edit_user_header"></th>'));
    header.append(headerRow);
    return header;
}

function addDynamicSearchRow(){
    var row = $("<tr>");
    row.append($("<td class='dynamic-search'>").html(textInput("id-search", "id_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("login-search", "user_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("name-search", "name_search")));
    console.log("Dynamic added");
    return row;
}

function textInput(id, classes){
    return '<input id="' + id + '" type="text" class="validate ' + classes + '">';
}

function addListElement(element){
    var row = $("<tr>");
    row.addClass("");
    row.append(
        $("<td class='user_id' style='display:none;'>").text(element.id)
    );
    row.append($("<td class='id-column search-column'>").text(element.employee_num));
    row.append($("<td class='login-column search-column'>").text(element.login_name));
    row.append($("<td class='name-column search-column'>").text(element.first_name + ' ' + element.last_name));
    /*row.append($("<td>").html('<a class="green btn-floating waves-effect waves-light" href="edit-user?' + element.id + '"><i class="mdi mdi-pencil center"></i></a>'));*/
    row.append($("<td>").html('<a class="green btn-floating waves-effect waves-light edit-user-button" href="edit-user?user_id=' + element.employee_num + '"><i class="mdi mdi-settings md-24 field-icon"></i></a>'));
    return row;
}

function addList(userList){
    //var userList = getUserList().users;
    var list = $("<tbody>");
    list.append(addDynamicSearchRow());
    for (element of userList) {
        list.append(addListElement(element));
    }
    /*for(element in userList){
        list.append(addListElement(userList[element]));
    }*/
    return list;
}

function createTable(userList){
    var table = $("<table style='margin-top:40px;'>");
    table.addClass("bordered striped highlight responsive-table");
    table.append(addHeader());
    table.append(addList(userList));
    return table;
}

function bindDynamicSearchToColumn(dynamicSearch, column) {
    $("#" + dynamicSearch).keyup(function (e) {
        $("." + column).each(function (e) {
            if($(this).text().search($("#" + dynamicSearch).val()) != -1){
                if($(this).parent().hasClass("bound-by-" + dynamicSearch)){
                    $(this).parent().removeClass("bound-by-" + dynamicSearch);
                    if($(this).parent().attr("class") == ""){
                        $(this).parent().attr("style", "");
                    }
                }
            } else {
                $(this).parent().attr("style", "display:none;");
                $(this).parent().addClass("bound-by-" + dynamicSearch);
            }
        });
    });
}

$(function (){
    $server.request({
        service: 'list-users',
        success: function(response) {
            if (response.meta.return_code == 0) {
                $("#user_list").append(createTable(response.data));
                /*$('.user_row').on('click', function() {
                    var userID = parseInt($(this).find('td.user_id').text());
                    console.log(userID);
                });*/
            } else {
                throw response.meta.message;
            }

            bindDynamicSearchToColumn("id-search", "id-column");
            bindDynamicSearchToColumn("login-search", "login-column");
            bindDynamicSearchToColumn("name-search", "name-column");

            /*$(".edit-user-button").on("click", function(e){
                e.preventDefault();
                var userID = $(this).parent().parent().children(".id-column").text();
                addEditUserForm(userID);
            });*/

            changeLanguage(localStorage.defaultLanguage);
            loadSearchSuggestions(localStorage.defaultLanguage);
        }
    });
});
