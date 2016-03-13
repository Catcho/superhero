superhero.controller("priceController",
    [
        "$scope",
        "$http",
        function ($scope, $http) {

    //Figyelt változó
    $scope.yourPrice = 1200;

    $scope.$watch('yourPrice', function( newValue, oldValue ){
        console.log(newValue, oldValue);
    });

    //Új érték kalkulása.
    $scope.calcOwnPrice = function( price ){
        price = price.toString().replace( /[^0-9]/g, '');
        newPrice = Math.round( parseInt( price ) * 0.7 );
        return isNaN( newPrice ) ? 0 : newPrice;
    };

    $scope.calcOtherPrice = function( price ){
        price = price.toString().replace( /[^0-9]/g, '');
        newPrice = Math.round( parseInt( price ) * 0.85 );
        return isNaN( newPrice ) ? 0 : newPrice;
    };

    $http.get('/users')
        .then(function(data){
            console.log(data);
    });

}]);
