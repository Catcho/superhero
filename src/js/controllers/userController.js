superhero.controller("userController",[
    "$scope",
    "userService",
    function($scope, userService){
        //
        //Felhasználók.
        $scope.users = [];

        //Felhasználók lekérése.
        userService.getAll()
            .then(function(userData){
                $scope.users = userData;
        }, function(err){
           console.error("Error while gettinguser data: ", err);
        });
    }
]);
//00:27:04
