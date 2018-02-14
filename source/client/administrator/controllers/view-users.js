function addHeader(){
    var header = $("<thead>");
    var headerRow = $("<tr>");
    headerRow.append($('<th data-field="user_id" class="employee_id"></th>'));
    headerRow.append($('<th data-field="username" class="username"></th>'));
    headerRow.append($('<th data-field="fullname" class="real_name"></th>'));
    headerRow.append($('<th data-field="role_name" class="role_name"></th>'));
    headerRow.append($('<th data-field="edit" class="edit_user_header"></th>'));
    headerRow.append($('<th data-field="toggle-activation"></th>'));
    header.append(headerRow);
    return header;
}

function addDynamicSearchRow(){
    var row = $("<tr>");
    row.append($("<td class='dynamic-search'>").html(textInput("id-search", "id_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("login-search", "user_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("name-search", "name_search")));
    row.append($("<td class='dynamic-search'>").html(textInput("role-search", "name_search")));
    row.append($("<td>"));
    console.log("Dynamic added");
    return row;
}

function textInput(id, classes){
    return '<input id="' + id + '" type="text" class="validate ' + classes + '">';
}

function createActivationSwitch(userID, isActive) {
    var column = $('<td>');
    var div = $('<div class="switch">');
    div.html(`
        <label>
            Off
            <input type="checkbox" ${ (isActive) ? 'checked' : '' }>
            <span class="lever"></span>
            On
        </label>
    `);
    var checkbox = div.find('input');
    checkbox.on('click', function(event) {
        var tempCheckbox = $(this);
        event.preventDefault();
        $server.request({
            service: 'toggle-account-activation',
            data: {
                user_id: userID
            },
            success: function(response) {
                if (response.meta.return_code == 0) {
                    var row = column.closest('tr');
                    var button = row.find('a.btn-floating');
                    if (button.hasClass('disabled')) {
                        button.removeClass('disabled');
                        tempCheckbox.prop("checked", true);
                    } else {
                        button.addClass('disabled');
                        tempCheckbox.prop("checked", false);
                    }
                } else {
                    loadToast("supervisor_has_employees", 3500, "rounded");
                    console.log(`server says: ${ response.meta.message }`);
                }
            }
        });
    });
    column.append(div);
    return column;
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
    row.append($("<td class='role-column search-column'>").text(element.role_name));
    var button;
    if (parseInt(element.is_active) == 1) {
        var column = $("<td>").html('<a class="nav-link green btn-floating waves-effect waves-light edit-user-button" href="edit-user?user_id=' + element.id + '"><i class="mdi mdi-settings md-24 field-icon"></i></a>');
        button = column.find('a');
    } else {
        var column = $("<td>").html('<a class="nav-link green btn-floating waves-effect waves-light disabled edit-user-button" href="#"><i class="mdi mdi-settings md-24 field-icon"></i></a>');
        button = column.find('a');
    }
    row.append(createActivationSwitch(element.id, parseInt(element.is_active)));
    button.on('click', function(event) {
        // prevent normal navigation
        event.preventDefault();

        var isDisabled = $(this).hasClass('disabled');
        if (!isDisabled) {
            // get the layout that is being requested 
            var targetLayout = $(this).attr('href');

            // push the state to the history stack
            window.history.pushState({ layout: targetLayout }, '', targetLayout);

            // load the requested layout
            $app.load(targetLayout); 
        } else {
            return false;
        }
    });
    row.append(button);
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
            bindDynamicSearchToColumn("role-search", "role-column");

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
