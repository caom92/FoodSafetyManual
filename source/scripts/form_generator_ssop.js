function getSSOPForm(){
    var src = "../../scripts/test_ssop_form.json";
    $.getJSON(src, function(data){
        console.log("Peticion de JSON exitosa");
        console.log(data.data.areas);
        log(data.data.areas[0].hardware);
    });
}

function log(data){
    console.log(data);
}

function createAreaCard(){

}

function createHardwareCard(){

}