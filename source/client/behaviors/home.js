$app.behaviors['home'] = function()
{
    $("#page-content").addClass("with-side-menu");
    changeLanguage(localStorage.defaultLanguage);
}