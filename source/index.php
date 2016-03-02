<?php
    require_once "header.php";
?>   

<div class="navbar-fixed">
<nav>
    <div class="nav-wrapper teal">
        <a class="brand-logo">Espresso</a>
    </div>
</nav>
</div>

<div style="margin: auto;">
    <img src="<?=\espresso\IMAGES?>logo.png" 
        style="display: block; margin:auto; width:100%; max-width:15cm;">
</div>

<div style="width:90%; margin: auto;" class="card-panel">
    <div class="row">
        <form class="col s12" method="POST">
            <div class="row">
                <div class="input-field col s12">
                    <input id="user" type="text" class="validate">
                    <label for="user">Número de Empleado</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password" type="password">
                    <label for="password">Contraseña</label>
                </div>
            </div>
            <div class="row">
                <button class="btn waves-effect waves-light" type="submit"
                    name="action" >
                    Iniciar sesión
                </button>
            </div>
        </form>
    </div>
</div>
    
<?php
    require_once "footer.php";
?>