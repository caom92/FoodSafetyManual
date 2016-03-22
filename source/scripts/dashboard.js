var manualVisibility = false;
var reportVisibility = false;

function loadManual(){
    //Hide everything else
    $("#load_report").hide(500);
    reportVisibility = false;

    //Then Hide/Show manual
    if(manualVisibility){
        $("#pdf_manual_container").hide(500);
        //$("#show_manual").html('<i class="material-icons right">description</i>Manual');
        manualVisibility = !manualVisibility;
    } else {
        $("#pdf_manual_container").show(500);
        //"#show_manual").html('<i class="material-icons right">cancel</i>Ocultar');
        manualVisibility = !manualVisibility;
    }
}

function loadReport(){
    //Hide everything else
    $("#pdf_manual_container").hide(500);
    manualVisibility = false;

    //Then Hide/Show datepicker
    if(reportVisibility){
        $("#load_report").hide(500);
        reportVisibility = !reportVisibility;
    } else {
        $("#load_report").show(500);
        reportVisibility = !reportVisibility;
    }
}

function loadForm(){
    //Function declaration; when calling a form we may have some options to display and/or data to send.
    //In this case we are going to use this function
}

function init(){
    console.log("Document ready");

    $("#pdf_manual_container").hide();
    $("#load_report").hide();

    $("#show_manual").click(function(){
        loadManual();
    });

    $("#show_report").click(function(){
        loadReport();
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $(".button-collapse").sideNav(); 
    $('.collapsible').collapsible();
}
