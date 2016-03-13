//Userek lekérése
//jQuery.getJSON('users', function(users){
//    console.log('users', users);
//});
//
////Check user.
//function checkUser(user){
//    //
//    if(user.roll > 4 ){
//        return true;
//    } else {
//        return false;
//    }
//}

//Fő modul definiálása.
/*global angular */
var superhero = angular.module("superhero", [ 'currencyModule' ]);

//Module futásának kezdete.
superhero.run([ "$http",function($http){
   $http.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
}]);


