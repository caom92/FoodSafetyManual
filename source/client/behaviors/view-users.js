function addHeader(){
    var header = $("<thead>");
    var headerRow = $("<tr>");
    headerRow.append($('<th data-field="user_id" class="employee_id"></th>'));
    headerRow.append($('<th data-field="username" class="username"></th>'));
    headerRow.append($('<th data-field="fullname" class="real_name"></th>'));
    header.append(headerRow);
    return header;
}

function addListElement(element){
    var row = $("<tr>");
    row.addClass("user_row");
    row.append(
        $("<td class='user_id' style='display:none;'>").text(element.id)
    );
    row.append($("<td>").text(element.employee_num));
    row.append($("<td>").text(element.login_name));
    row.append($("<td>").text(element.first_name + ' ' + element.last_name));
    return row;
}

function addList(userList){
    //var userList = getUserList().users;
    var list = $("<tbody>");
    for (element of userList) {
        list.append(addListElement(element));
    }
    /*for(element in userList){
        list.append(addListElement(userList[element]));
    }*/
    return list;
}

function createTable(userList){
    var table = $("<table>");
    table.append(addHeader());
    table.append(addList(userList));
    return table;
}

//This should get the list from the server
/*function getUserList(){
    var userList={
        "users":[
            {
                "id":327943,
                "username":"vmiracle",
                "fullname":"Victor Miracle"
            },
            {
                "id":1110027,
                "username":"coliva",
                "fullname":"Carlos Oliva"
            },
            {
                "id":111111,
                "username":"jballesteros",
                "fullname":"Julio Ballesteros"
            }
        ]
    };
    return userList;
}*/

$app.behaviors['view-users'] = function (){
    $server.request({
        service: 'list-users',
        success: function(response) {
            if (response.meta.return_code == 0) {
                $("#user_list").append(createTable(response.data));
                $('.user_row').on('click', function() {
                    var userID = parseInt($(this).find('td.user_id').text());
                    console.log(userID);
                });
            } else {
                throw response.meta.message;
            }
        }
    });
    
    /*$(".user_row").click(function(e){
        console.log(this);
        testToast();
    });*/
    changeLanguage(localStorage.defaultLanguage);
}

function testToast(){
    Materialize.toast("Coming soon", 3500, "rounded");
}