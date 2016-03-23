function isLoggedIn(){
    if((sessionStorage.getItem("username") == null) || (sessionStorage.getItem("password") == null)){
        console.log("Username y Password no existen en la sesión");
        location.href = "/Espresso/source/client/";
        return false;
    }
    var src = "/Espresso/source/server/io_tests/ok.php"; //PHP logged in checker script
    var credentials = new Object();
    credentials.username = sessionStorage.getItem("username");
    credentials.password = sessionStorage.getItem("password");
    console.log(credentials);
    $.post(src, credentials, function(data){
        //data = '{"error_code":0,"error_message":"Exito"}';
        data = '{"error_code":1,"error_message":"Contraseña incorrecta"}';
        var result = $.parseJSON(data);
        if(result.error_code == 0){
            console.log("Credenciales validas");
            return true;
        } else {
            console.log("Credenciales no validas o desactualizadas");
            location.href = "/Espresso/source/client/";
            return false;
        }
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log("Error de conexion");
        location.href = "/Espresso/source/client/";
        return false;
    });
}
