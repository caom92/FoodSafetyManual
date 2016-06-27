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
    row.append($("<td>").text(element.id));
    row.append($("<td>").text(element.username));
    row.append($("<td>").text(element.fullname));
    return row;
}

function addList(){
    var userList = getUserList().users;
    var list = $("<tbody>");
    for(element in userList){
        list.append(addListElement(userList[element]));
    }
    return list;
}

function createTable(){
    var table = $("<table>");
    table.append(addHeader());
    table.append(addList());
    return table;
}

//This should get the list from the server
function getUserList(){
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
}

function onViewUsersViewReady(){
    $("#user_list").append(createTable());
    $(".user_row").click(function(e){
        console.log(this);
        testToast();
    });
}

function testToast(){
    Materialize.toast("Que tranza morro", 3500, "rounded");
}