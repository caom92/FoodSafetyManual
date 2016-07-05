$app.behaviors['admin-menu'] = function()
{
    $('#admin-users').on('click', function(event) {
        event.preventDefault();
    });
}