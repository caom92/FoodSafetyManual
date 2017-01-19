function addZoneSelect() {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "zone_select");
    label.addClass("select_zone");
    label.attr("for", "zone_select");

    hideSigns();

    $server.request({
        service: 'list-zones',
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var zone of response.data) {
                    var option = $("<option>");
                    option.attr("value", zone.id);
                    option.append(zone.name);
                    select.append(option);
                }
                $("#zone_select_wrapper").append(select);
                $("#zone_select_wrapper").append(label);
                addSupervisorSelect(parseInt($("#zone_select").val()));
                $("#zone_select").change(function(index){
                    $("#supervisor_select_wrapper").html("");
                    addSupervisorSelect(parseInt($("#zone_select").val()));
                });
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSupervisorSelect(zoneID){
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "supervisor_select");
    label.addClass("select_supervisor");
    label.attr("for", "supervisor_select");

    var data = new Object();

    data.zone_id = parseInt(zoneID);

    $server.request({
        service: 'list-supervisors-by-zone',
        data: data,
        success: function (response) {
            if (response.meta.return_code == 0) {
                if(response.data.length != 0){
                    hideSigns();
                    for (var supervisor of response.data) {
                        var option = $("<option>");
                        option.attr("value", supervisor.id);
                        option.append(supervisor.full_name);
                        select.append(option);
                    }
                    $("#supervisor_select_wrapper").append(select);
                    $("#supervisor_select_wrapper").append(label);
                    addSupervisorEmployeeList(parseInt($("#supervisor_select").val()));
                    $("#supervisor_select").change(function(index){
                        addSupervisorEmployeeList(parseInt($("#supervisor_select").val()));
                    });
                } else {
                    showNoSupervisorSign();
                }
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSupervisorChangeForm(){
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "supervisor_change");
    label.addClass("select_supervisor");
    label.attr("for", "supervisor_change");

    var data = new Object();

    data.zone_id = parseInt($("#zone_select").val());

    $("#supervisor_change_wrapper").html("");
    $("#change_button").html("");

    $server.request({
        service: 'list-supervisors-by-zone',
        data: data,
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var supervisor of response.data) {
                    var option = $("<option>");
                    option.attr("value", supervisor.id);
                    option.append(supervisor.full_name);
                    select.append(option);
                }
                $("#supervisor_change_wrapper").append(select);
                $("#supervisor_change_wrapper").append(label);
                $("#change_button").append('<a id="change_supervisor" class="waves-effect waves-light btn change_supervisor" disabled></a>');
                $("#change_supervisor").click(function(index){
                    if($("#supervisor_select").val() == $("#supervisor_change").val()){
                        loadToast("duplicated_supervisor", 2500, "rounded");
                    } else {
                        var employeeArray = new Array();
                        var supervisorID = parseInt($("#supervisor_change").val());
                        console.log("ID de supervisor nuevo");
                        console.log($("#supervisor_change").val());
                        $('input:checkbox:checked').each(function(checkedVal){
                            var employee = new Object();
                            employee.employee_id = parseInt($(this).val());
                            employee.supervisor_id = supervisorID;
                            employeeArray.push(employee);
                        });
                        assignEmployeesToSupervisor(employeeArray);
                        addSupervisorEmployeeList($("#supervisor_select").val());
                    }
                });
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function assignEmployeesToSupervisor(employeeArray){
    var data = new Object();
    data.assignments = employeeArray;
    $server.request({
        service: 'assign-employees-to-supervisors',
        data: data,
        success: function (response) {
            if (response.meta.return_code == 0) {
                loadToast("supervisor_changed", 2500, "rounded");
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSupervisorEmployeeList(supervisorID){
    var data = new Object();

    data.supervisor_id = parseInt(supervisorID);

    $server.request({
        service: 'list-employees-of-supervisor',
        data: data,
        success: function (response) {
            if (response.meta.return_code == 0) {
                $("#employee_table_wrapper").html("");
                if(response.data.length != 0){
                    console.log(response.data);
                    hideSigns();
                    $("#employee_table_wrapper").append(addSupervisedTable(response.data));
                    $("input[type='checkbox']").click(function(index){
                        if($('input:checkbox:checked').length > 0){
                            $("#change_supervisor").removeAttr('disabled');
                        } else {
                            $("#change_supervisor").attr('disabled', true);
                        }
                    });
                    addSupervisorChangeForm();
                } else {
                    showNoEmployeesSign();
                }
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSupervisedTable(data){
    var table = $("<table>");

    table.append(addSupervisedHeader);

    for (var employee of data){
        table.append(addSupervisedRow(employee));
    }

    return table;
}

function addSupervisedHeader(){
    var header = $("<thead>");
    var headerRow = $("<tr>");

    headerRow.append($('<th data-field="box"></th>'));
    headerRow.append($('<th data-field="user_id" class="employee_id"></th>'));
    headerRow.append($('<th data-field="username" class="username"></th>'));
    headerRow.append($('<th data-field="fullname" class="real_name"></th>'));

    header.append(headerRow);

    return header;
}

function addSupervisedRow(employee){
    var row = $("<tr>");

    row.append($("<td class='box-column'>").html('<input type="checkbox" class="filled-in" id="check_' + employee.employee_num + '" value="' + employee.id + '" /> <label for="check_' + employee.employee_num + '"></label>'));
    row.append($("<td class='id-column search-column'>").text(employee.employee_num));
    row.append($("<td class='login-column search-column'>").text(employee.login_name));
    row.append($("<td class='name-column search-column'>").text(employee.first_name + ' ' + employee.last_name));

    row.data("id", employee.id);

    return row;
}

function hideSigns(){
    $(".no_sign").hide();
}

function showNoSupervisorSign(){
    $(".no_sign").hide();
    $("#employee_table_wrapper").html("");
    $("#supervisor_change_wrapper").html("");
    $("#change_button").html("");
    $("#no_supervisors").show();
}

function showNoEmployeesSign(){
    $(".no_sign").hide();
    $("#employee_table_wrapper").html("");
    $("#supervisor_change_wrapper").html("");
    $("#change_button").html("");
    $("#no_employees").show();
}

$(function (){
    addZoneSelect();
    changeLanguage(localStorage.defaultLanguage);
});