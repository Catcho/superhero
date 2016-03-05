//Userek lekérése
jQuery.getJSON('users', function(users){
    console.log('users', users);
});

//Check user.
function checkUser(user){
    //
    if(user.roll > 4 ){
        return true;
    } else {
        return false;
    }
}
