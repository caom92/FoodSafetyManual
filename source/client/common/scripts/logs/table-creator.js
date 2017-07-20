/*
    function table(tableData)

    Input:

    {
        "type":"table",
        "id":"id",
        "classes":"class",
        "style":,
        "thead":{},
        "tfoot":{},
        "tbody":{}
    }

    Output:
    
    <table id="id" class="class">
        Output of tableHeader(thead);
        Output of tableFooter(tfoot);
        Output of tableBody(tbody);
    </table>
*/

function table(tableData){
    var table = $("<table>");

    if(tableData.id)
        table.attr("id", tableData.id);

    if(tableData.classes)
        table.addClass(tableData.classes);

    if(tableData.style)
        table.attr("style", tableData.style);

    if($.type(tableData.thead) == "object")
        table.append(tableHeader(tableData.thead));
    else if($.type(tableData.thead) == "array"){
        for(var header of tableData.thead)
            table.append(tableHeader(header));
    }

    if($.type(tableData.tfoot) == "object")
        table.append(tableFooter(tableData.tfoot));
    else if($.type(tableData.tfoot) == "array"){
        for(var footer of tableData.tfoot)
            table.append(tableFooter(footer));
    }

    if($.type(tableData.tbody) == "object")
        table.append(tableBody(tableData.tbody));
    else if($.type(tableData.tbody) == "array"){
        for(var body of tableData.tbody)
            table.append(tableBody(body));
    }

    return table;
}

/*
    function tableHeader(headerData)

    Input:

    {
        "type":"thead",
        "id":"id",
        "classes":"class",
        "rows":[]
    }

    Output:

    <thead id="id" class="class">
        Output of tableRow(row) for each row in rows
    </thead>
*/

function tableHeader(headerData){
    var header = $("<thead>");

    if(headerData.id)
        header.attr("id", headerData.id);

    if(headerData.classes)
        header.addClass(headerData.classes);

    if($.isArray(headerData.rows)){
        for(var row of headerData.rows){
            header.append(tableRow(row));
        }
    }        

    return header;
}

/*
    function tableBody(bodyData)

    Input:

    {
        "type":"tbody",
        "id":"id",
        "classes":"class",
        "rows":[]
    }

    Output:

    <tbody id="id" class="class">
        Output of tableRow(row) for each row in rows
    </tbody>
*/

function tableBody(bodyData){
    var body = $("<tbody>");

    if(bodyData.id)
        body.attr("id", bodyData.id);

    if(bodyData.classes)
        body.addClass(bodyData.classes);

    if($.isArray(bodyData.rows)){
        for(var row of bodyData.rows){
            body.append(tableRow(row));
        }
    }    

    return body;
}

/*
    function tableFooter(footerData)

    Input:

    {
        "type":"tfoot",
        "id":"id",
        "classes":"class",
        "rows":[]
    }

    Output:
    
    <tfoot id="id" class="class">
        Output of tableRow(row) for each row in rows
    </tfoot>
*/

function tableFooter(footerData){
    var footer = $("<tfoot>");

    if(footerData.id)
        footer.attr("id", footerData.id);

    if(footerData.classes)
        footer.addClass(footerData.classes);

    if($.isArray(footerData.rows)){
        for(var row of footerData.rows){
            footer.append(tableRow(row));
        }
    }    

    return footer;
}

/*
    function tableRow(rowData)

    Input:

    {
        "type":"tr",
        "id":"id",
        "classes":"class",
        "colspan":1,
        "rowspan":1,
        "columns":[]
    }

    Output:

    <tr id="id" class="class" colspan="1" rowspan="1">
        Output of tableColumn(column) for each column in columns OR Output of headerColumn(column) for each column in columns
    </tr>
*/

function tableRow(rowData){
    var row = $("<tr>");

    if(rowData.id)
        row.attr("id", rowData.id);

    if(rowData.classes)
        row.addClass(rowData.classes);

    if(rowData.colspan)
        row.attr("colspan", rowData.colspan);

    if(rowData.rowspan)
        row.attr("rowspan", rowData.rowspan);

    if($.isArray(rowData.columns)){
        for(var column of rowData.columns){
            if(column.type == "th")
                row.append(headerColumn(column));
            else
                row.append(tableColumn(column));
        }
    }

    return row;
}

/*
    function tableColumn(columnData)

    Input:

    {
        "type":"td",
        "id":"idName",
        "classes":"classes",
        "colspan":1,
        "rowspan":1,
        "contents":"text"
    }

    Output:
    
    <td id="id" class="class" colspan="1" rowspan="1">
        text
    </td>
*/

function tableColumn(columnData){
    var column = $("<td>");

    if(columnData.id)
        column.attr("id", columnData.id);

    if(columnData.classes)
        column.addClass(columnData.classes);

    if(columnData.colspan)
        column.attr("colspan", columnData.colspan);

    if(columnData.rowspan)
        column.attr("rowspan", columnData.rowspan);

    if(columnData.style)
        column.attr("style", columnData.style);

    if($.type(columnData.contents) == "object")
        column.append(createInput(columnData.contents));
    else //if($.type(columnData.contents) == "string")
        column.append(columnData.contents)

    return column;
}

/*
    function headerColumn(columnData)

    Input:

    {
        "type":"th",
        "id":"idName",
        "classes":"classes",
        "colspan":1,
        "rowspan":1,
        "contents":"text"
    }

    Output:
    
    <th id="id" class="class" colspan="1" rowspan="1">
        text
    </th>
*/

function headerColumn(columnData){
    var column = $("<th>");

    if(columnData.id)
        column.attr("id", columnData.id);

    if(columnData.classes)
        column.addClass(columnData.classes);

    if(columnData.colspan)
        column.attr("colspan", columnData.colspan);

    if(columnData.rowspan)
        column.attr("rowspan", columnData.rowspan);

    if(columnData.contents)
        column.append(columnData.contents);

    return column;
}